import { useStoredReducer } from "@dteel/use-stored-reducer";
import { isGoodObject, isAboutEquals } from "../common";

const maxAux = 5810;
const maxExt = 8900;    
const maxIB = 7660;
const maxOB = 8310;
const momentSimplifier=1000;

const blankSingleFuel={
    lext: 0,
    main1: 0,
    main2: 0,
    laux: 0,
    raux: 0,
    main3: 0,
    main4: 0,
    rext: 0,

    readOnly:{
        totalFuel: 0,
        totalMoment: 0,
        obs: 0,
        ibs: 0,
        auxs: 0,
        exts: 0
    }
};

const blankFuel = {
    takeoff: blankSingleFuel,
    landing: blankSingleFuel
}


function interpolateTable(valueIn, table){
    let below=null;
    let above=null;
    for (const item of table){
        if (isAboutEquals(valueIn, item.in)){
            above=item;
            below=item;
            break;
        }
        if (valueIn>=item.in){
            if (below!==null){
                if (item.in>below.in){
                    below=item;
                }
            }else{
                below=item;
            }
        }
        if (valueIn<=item.in){
            if (above!==null){
                if (item.in<above.in){
                    above=item;
                }
            }else{
                above=item;
            }
        }
    }

    if (above==null || below==null){
        return null;
    }
    
    if (below===above || isAboutEquals(below.in, above.in)){
        return above.out;
    }

    const resultDiff = above.out - below.out;
    const valDiff = above.in - below.in;
    return ((valueIn - below.in) / valDiff) * resultDiff + below.out;
}

function getSingleAuxMoment(auxFuel){
    const table = [
        {in: 0,           out: 560.5},
        {in: maxAux*0.25, out: 559.0},
        {in: maxAux*0.50, out: 557.5},
        {in: maxAux*0.75, out: 556.9},
        {in: maxAux     , out: 556.7},
    ];

    return interpolateTable(auxFuel, table)*auxFuel/momentSimplifier;
}

function getSingleExtMoment(extFuel){
    const table = [
        {in: 0,           out: 552.7},
        {in: maxExt*0.25, out: 552.0},
        {in: maxExt*0.50, out: 551.3},
        {in: maxExt*0.75, out: 551.0},
        {in: maxExt     , out: 551.2},
    ];

    return interpolateTable(extFuel, table)*extFuel/momentSimplifier;
}

function getSingleIBMoment(ibFuel){
    const table = [
        {in: 0,          out: 558.1},
        {in: maxIB*0.25, out: 556.8},
        {in: maxIB*0.50, out: 555.5},
        {in: maxIB*0.75, out: 555.2},
        {in: maxIB     , out: 555.0},
    ];

    return interpolateTable(ibFuel, table)*ibFuel/momentSimplifier;
}

function getSingleOBMoment(obFuel){
    const table = [
        {in: 0,          out: 549.0},
        {in: maxOB*0.25, out: 547.7},
        {in: maxOB*0.50, out: 546.4},
        {in: maxOB*0.75, out: 545.7},
        {in: maxOB     , out: 545.2},
    ];

    return interpolateTable(obFuel, table)*obFuel/momentSimplifier;
}

function getFuelMoment(lext, main1, main2, laux, raux, main3, main4, rext){
    return Math.round(getSingleExtMoment(lext)+getSingleExtMoment(rext)+
        getSingleAuxMoment(laux)+getSingleAuxMoment(raux)+
        getSingleIBMoment(main2)+getSingleIBMoment(main3)+
        getSingleOBMoment(main1)+getSingleOBMoment(main4));
}

function sanitizeFuelState(s){
    const fields=['main1', 'main2', 'main3', 'main4', 'laux', 'raux', 'lext', 'rext'];
    for (const field of fields){
        s[field]=Number(s[field]);
        if (!isFinite(s[field])) s[field]=0;
        if (s[field]<0) s[field]=0;
    }

    if (s.lext>maxExt) s.lext=maxExt;
    if (s.rext>maxExt) s.rext=maxExt;
    if (s.laux>maxAux) s.laux=maxAux;
    if (s.raux>maxAux) s.raux=maxAux;
    if (s.main1>maxOB) s.main1=maxOB;
    if (s.main4>maxOB) s.main4=maxOB;
    if (s.main2>maxIB) s.main2=maxIB;
    if (s.main3>maxIB) s.main3=maxIB;

    return s;
}

function addReadOnly(s){
    s.readOnly={
        totalFuel: s.lext+s.rext+s.laux+s.raux+s.main1+s.main2+s.main3+s.main4,
        totalMoment: getFuelMoment(s.lext, s.main1, s.main2, s.laux, s.raux, s.main3, s.main4, s.rext),
        obs: s.main1+s.main4,
        ibs: s.main2+s.main3,
        auxs: s.laux+s.raux,
        exts: s.lext+s.rext
    };
    return s;
}

function fuelReducer(state, action, payload){

    if (!isGoodObject(state)){
        state=blankFuel;
    }

    switch (action){
        case 'reset':
            return blankFuel;

        case 'set-takeoff':
            payload=addReadOnly(sanitizeFuelState(payload));
            return {...state, takeoff: payload};

        case 'set-landing':
            payload=addReadOnly(sanitizeFuelState(payload));
            return {...state, landing: payload};

        case 'set':
            payload.takeoff=addReadOnly(sanitizeFuelState(payload.takeoff));
            payload.landing=addReadOnly(sanitizeFuelState(payload.landing));
            return payload;

        default:
            console.error('unknown fuelReducer action: ', action);
            return state;
    }
}

function useFuelReducer(hysterisis=1000){
    const [fuel, {current: fuelDispatch}] = useStoredReducer('cwab-fuel', fuelReducer, blankFuel, localStorage, hysterisis);

    return [fuel, fuelDispatch];
}

export {useFuelReducer as default, fuelReducer};