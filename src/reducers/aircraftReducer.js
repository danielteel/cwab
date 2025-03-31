import { useStoredReducer } from "@dteel/use-stored-reducer";
import { isGoodObject } from "../common";

const emptyAircraft = {
    basicWeight: 0,
    basicMoment: 0,

    crewWeight: 0,
    crewMoment: 0,

    baggageWeight: 0,
    baggageMoment: 0,

    stewardsWeight: 0,
    stewardsMoment: 0,

    emergencyWeight: 0,
    emergencyMoment: 0,

    extraWeight: 0,
    extraMoment: 0,

    readOnly:{
        operatingWeight: 0,
        operatingMoment: 0,
    }
}

function sanitizeAircraft(s){
    const fields=[
        'basicWeight', 'basicMoment',
        'crewWeight', 'crewMoment',
        'baggageWeight', 'baggageMoment',
        'stewardsWeight', 'stewardsMoment',
        'emergencyWeight', 'emergencyMoment',
        'extraWeight', 'extraMoment',
    ];
    for (const field of fields){
        s[field]=Number(s[field]);
        if (!isFinite(s[field])) s[field]=0;
    }
    return s;
}

function addReadOnly(s){
    s.readOnly={
        operatingWeight: s.basicWeight+s.crewWeight+s.baggageWeight+s.stewardsWeight+s.emergencyWeight+s.extraWeight,
        operatingMoment: s.basicMoment+s.crewMoment+s.baggageMoment+s.stewardsMoment+s.emergencyMoment+s.extraMoment
    };
    return s;
}

function aircraftReducer(state, action, payload){

    if (!isGoodObject(state)){
        state=emptyAircraft;
    }

    switch (action){
        case 'reset':{
            return emptyAircraft;
        }
        case 'set':{
            return addReadOnly(sanitizeAircraft(payload));
        }
        default:
            console.error('unknown aircraftReducer action: ', action);
            return state;
    }
}

function useAircraftReducer(hysterisis=1000){
    const [aircraft, {current: aircraftDispatch}] = useStoredReducer('cwab-aircraft', aircraftReducer, emptyAircraft, localStorage, hysterisis);

    return [aircraft, aircraftDispatch];
}

export {useAircraftReducer as default, aircraftReducer};