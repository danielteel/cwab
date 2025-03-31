import { useEffect, useState } from "react";
import { Header, Segment, Progress, Button } from "semantic-ui-react";

import {flushSaveToStorage} from '@dteel/use-stored-reducer/src/saveToStorage';

import useAircraftReducer from '../reducers/aircraftReducer';
import useCargoReducer from '../reducers/cargoReducer';
import useFuelReducer from "../reducers/fuelReducer";

import { getUsedSpace } from '../getLocalStorageSize'
import ConfirmationModal from './ConfirmationModal';


function getSpaceUsedByWAB(){
    let spaceUsedByWAB = 0;
    try {
        for (let i = 0; i < localStorage.length; i++){
            const key=localStorage.key(i);
            if (key.trim().toLowerCase().startsWith("cwab-")){
                const size=localStorage.getItem(key).length+key.length;
                spaceUsedByWAB+=size;
            }   
        }
    } catch (e) {
    }
    return spaceUsedByWAB;
}

export default function Options(){

    const [aircraft, aircraftDispatch] = useAircraftReducer(0);
    const [cargo, cargoDispatch] = useCargoReducer(0);
    const [fuel, fuelDispatch] = useFuelReducer(0);

    const [spaceUsedByWAB, setSpaceUsedByWAB] = useState(0);
    const [spaceUsed, setSpaceUsed] = useState(0);
    const [deleteLocalModal, setDeleteLocalModal] = useState(false);

    useEffect( ()=>{
        flushSaveToStorage();
        setSpaceUsedByWAB(getSpaceUsedByWAB());
        setSpaceUsed(getUsedSpace());

        const storageChanged = () => {
            setSpaceUsedByWAB(getSpaceUsedByWAB());
            setSpaceUsed(getUsedSpace());
        };

        window.addEventListener('storage', storageChanged);
        return ()=>window.removeEventListener('storage', storageChanged);
    }, [cargo, aircraft, fuel]);

    return (
        <>
                <Segment secondary>
                    <Header as='h4' textAlign="center">Local Storage</Header>

                    <Progress
                        value={spaceUsedByWAB}
                        total={spaceUsed}
                        progress='percent'
                        precision={1}
                        label={'WABs Useage: '+Math.ceil(spaceUsedByWAB/1024)+' Kb / '+Math.ceil(spaceUsed/1024)+' Kb'}
                    />
                    <ConfirmationModal 
                        title="Are you sure?"
                        content="This will erase everything WAB related on your device, are you sure?"
                        onNo={()=>setDeleteLocalModal(false)} 
                        onYes={()=>{
                            fuelDispatch('reset');
                            cargoDispatch('reset');
                            aircraftDispatch('reset');
                            setDeleteLocalModal(false);
                        }}
                        isOpen={deleteLocalModal}
                    />
                    <Button negative onClick={()=>setDeleteLocalModal(true)}>Clear WAB LocalStorage</Button>
                </Segment>
        </>
    );
}