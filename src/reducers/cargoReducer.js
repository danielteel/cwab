import { useStoredReducer } from "@dteel/use-stored-reducer";

import { calcArm, getUniqueId, isAboutEquals, isGoodObject } from "../common";

function blankItem(){
    return {name:'', weight: 0, moment: 0, arm: 0};
}

function sanitizeCargo(cargo){
    for (const item of cargo){
        item.weight=Number(item.weight);
        item.moment=Number(item.moment);
        item.arm=Number(item.arm);
    }
    return cargo;
}

function cargoReducer(state, action, payload, callback){

    if (!Array.isArray(state)) state=[];

    switch (action){
        case 'reset':{
            return [];
        }
        case 'update':{
            const items=state;
            
            payload.weight=Number(payload.weight);
            payload.moment=Number(payload.moment);
            payload.arm=Number(payload.arm);

            const expectedArm = calcArm(payload.weight, payload.moment);
            if (!isAboutEquals(expectedArm, payload.arm, 0.1)){
                payload.arm=expectedArm;
            }

            for (const [index, element] of items.entries()){
                if (element.id===payload.id){
                    items[index]=payload;
                    break;
                }
            }
            
            return sanitizeCargo(items);
        }
        case 'delete':{
            const items=state;
            const id=typeof payload==='object' ? payload.id : payload;
            return items.filter( item => !(item.id === id) );
        }
        case 'create':{
            let newItem = payload;
            if (!isGoodObject(newItem)) newItem=blankItem();

            newItem.id=getUniqueId(state, 'id');
            if (callback) callback(newItem.id);

            return sanitizeCargo([...state, newItem]);
        }
        default:
            return state;
    }
}

function useCargoReducer(hysterisis=1000){
    const [itemGroup, {current: itemGroupDispatch}] = useStoredReducer('cwab-cargo', cargoReducer, [], localStorage, hysterisis);

    return [itemGroup, itemGroupDispatch];
}

export {useCargoReducer as default, cargoReducer};