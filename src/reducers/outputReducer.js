import {useStoredReducer} from '@dteel/use-stored-reducer';
import { isGoodObject } from "../common";

const blankOutputSettings={
    allowableLandingWeight: 164000,
    allowableTakeoffWeight: 164000,
    whichOpArea: 'C'
}

function outputSettingsReducer(state, action, payload){

    if (!isGoodObject(state)){
        state=blankOutputSettings;
    }

    switch (action){
        case 'set-allowable-landing':{
            return {...state, allowableLandingWeight: payload};
        }
        case 'set-allowable-takeoff':{
            return {...state, allowableTakeoffWeight: payload};
        }
        case 'set-op-area':{
            if (payload!=='A' && payload!=='B' && payload!=='C' && payload!=='D'){
                console.error('invalid op oparea in set-op-area in outputSettingsReducer', payload);
                payload='A';
            }
            return {...state, whichOpArea: payload};
        }
        default:
            console.error('unknown outputSettingsReducer action: ', action);
            return state;
    }
}

function useOutputReducer(hysterisis=1000){
    const [outputSettings, {current: outputSettingsDispatch}] = useStoredReducer('cwab-output', outputSettingsReducer, blankOutputSettings, localStorage, hysterisis);

    return [outputSettings, outputSettingsDispatch];
}


export {useOutputReducer as default, outputSettingsReducer};