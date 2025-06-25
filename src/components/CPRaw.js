import { Header } from 'semantic-ui-react';

import useAircraftReducer from '../reducers/aircraftReducer';
import useCargoReducer from '../reducers/cargoReducer';
import useFuelReducer from "../reducers/fuelReducer";

import RawOutput from './RawOutput';


export default function CPRaw({chartProject}){
    const [aircraft, ] = useAircraftReducer(1000);
    const [fuel, ] = useFuelReducer(1000);
    const [cargo, ] = useCargoReducer(1000);

    let cargoWeightTakeoff=0;
    let cargoWeightLanding=0;
    for (const item of cargo){
        cargoWeightTakeoff+=item.weight;
        if (!item.expended){
            cargoWeightLanding+=item.weight;
        }
    }

    const charts=chartProject;
    charts.$operatingWeight.input=aircraft.readOnly.operatingWeight;
    charts.$fuelWeightTakeoff.input=fuel.takeoff.readOnly.totalFuel;
    charts.$fuelWeightLanding.input=fuel.landing.readOnly.totalFuel;
    charts.$cargoWeightTakeoff.input=cargoWeightTakeoff;
    charts.$cargoWeightLanding.input=cargoWeightLanding;
    charts.calc();

    return (
        <>
            <Header textAlign='center'>
                ChartProject Raw                
            </Header>
            <RawOutput chartProject={charts} detailed={true}/>
        </>
    );
}