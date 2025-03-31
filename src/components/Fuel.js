import { Header } from 'semantic-ui-react';


import IndividualFuel from './IndividualFuel';


export default function Fuel({fuel, fuelDispatch}){
    return (
        <>
            <Header textAlign='center'>
                Takeoff Fuel
            </Header>
            <IndividualFuel fuel={fuel.takeoff} setFuel={(newFuel)=>{
                fuelDispatch('set-takeoff', newFuel);
            }}/>

            <Header textAlign='center'>
                Landing Fuel
            </Header>
            <IndividualFuel fuel={fuel.landing} setFuel={(newFuel)=>{
                fuelDispatch('set-landing', newFuel);
            }}/>
        </>
    );
}