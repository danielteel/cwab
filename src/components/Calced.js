import { Table, Input, Button, Header } from 'semantic-ui-react';

import useAircraftReducer from '../reducers/aircraftReducer';
import useCargoReducer from '../reducers/cargoReducer';
import useFuelReducer from "../reducers/fuelReducer";

import ChartProject from '../charts';

import { toMAC, calcArm, displayVal } from '../common';
import { useState } from 'react';

const charts = new ChartProject();

function displayOpArea(val){
    if (val===0) return 'A';
    if (val===1) return 'B';
    if (val===2) return 'C';
    if (val===3) return 'D';
    return 'E';
}

export default function Calced(){
    const [aircraft, aircraftDispatch] = useAircraftReducer(1000);
    const [fuel, fuelDispatch] = useFuelReducer(1000);
    const [cargo, cargoDispatch] = useCargoReducer(1000);
    const [whichOpArea, setWhichOpArea] = useState('A');

    let cargoWeight=0;
    let cargoMoment=0;
    for (const item of cargo){
        cargoWeight+=item.weight;
        cargoMoment+=item.moment;
    }

    charts.$operatingWeight.input=aircraft.readOnly.operatingWeight;
    charts.$fuelTakeoffWeight.input=fuel.takeoff.readOnly.totalFuel;
    charts.$fuelLandingWeight.input=fuel.landing.readOnly.totalFuel;
    charts.$cargoWeight.input=cargoWeight;
    charts.calc();

    const takeoffMAC = toMAC(calcArm(aircraft.readOnly.operatingWeight+cargoWeight+fuel.takeoff.readOnly.totalFuel, aircraft.readOnly.operatingMoment+cargoMoment+fuel.takeoff.readOnly.totalMoment));
    const takeoffHasFuelInExternals = fuel.takeoff.lext>0 || fuel.takeoff.rext>0;
    const takeoffForwardCG = takeoffHasFuelInExternals ? charts.$externalFuelforwardCG.value : charts.$noExternalFuelForwardCG.value;
    const takeoffAftCG = takeoffHasFuelInExternals ? charts.$externalFuelAftCG.value : charts.$noExternalFuelAftCG.value;
    const takeoffOpArea = displayOpArea(charts.$operatingArea.value);

    const limitingFuelMaxZFW = {
        A: charts.$areaAMaxZFWOverall.value,
        B: charts.$areaBMaxZFWOverall.value,
        C: charts.$areaCMaxZFWOverall.value,
        D: charts.$areaDMaxZFWOverall.value
    }


    charts.$fuelTakeoffWeight.input=fuel.landing.readOnly.totalFuel;
    charts.calc();

    const landingMAC = toMAC(calcArm(aircraft.readOnly.operatingWeight+cargoWeight+fuel.landing.readOnly.totalFuel, aircraft.readOnly.operatingMoment+cargoMoment+fuel.landing.readOnly.totalMoment));
    const landingHasFuelInExternals = fuel.landing.lext>0 || fuel.landing.rext>0;
    const landingForwardCG = landingHasFuelInExternals ? charts.$externalFuelforwardCG.value : charts.$noExternalFuelForwardCG.value;
    const landingAftCG = landingHasFuelInExternals ? charts.$externalFuelAftCG.value : charts.$noExternalFuelAftCG.value;
    const landingOpArea = displayOpArea(charts.$operatingArea.value);
    return (
        <>
            <Header textAlign='center'>
                Calced
            </Header>
            <Table unstackable style={{maxWidth: '650px'}}>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell textAlign='center'>Op Weight</Table.HeaderCell>
                        <Table.HeaderCell textAlign='center'>Moment</Table.HeaderCell>
                        <Table.HeaderCell textAlign='center'>%MAC</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    <Table.Row>
                        <Table.Cell textAlign='center'>{aircraft.readOnly.operatingWeight}</Table.Cell>
                        <Table.Cell textAlign='center'>{aircraft.readOnly.operatingMoment}</Table.Cell>
                        <Table.Cell textAlign='center'>{toMAC(calcArm(aircraft.readOnly.operatingWeight, aircraft.readOnly.operatingMoment))}%</Table.Cell>
                    </Table.Row>
                </Table.Body>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell textAlign='center'>Zero Fuel Weight</Table.HeaderCell>
                        <Table.HeaderCell textAlign='center'>Moment</Table.HeaderCell>
                        <Table.HeaderCell textAlign='center'>%MAC</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    <Table.Row>
                        <Table.Cell textAlign='center'>{aircraft.readOnly.operatingWeight+cargoWeight}</Table.Cell>
                        <Table.Cell textAlign='center'>{aircraft.readOnly.operatingMoment+cargoMoment}</Table.Cell>
                        <Table.Cell textAlign='center'>{toMAC(calcArm(aircraft.readOnly.operatingWeight+cargoWeight, aircraft.readOnly.operatingMoment+cargoMoment))}%</Table.Cell>
                    </Table.Row>
                </Table.Body>
            </Table>
            <Table unstackable style={{maxWidth: '650px'}}>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell textAlign='center'>Takeoff Weight</Table.HeaderCell>
                        <Table.HeaderCell textAlign='center'>Moment</Table.HeaderCell>
                        <Table.HeaderCell textAlign='center'>%MAC</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    <Table.Row>
                        <Table.Cell textAlign='center'>{aircraft.readOnly.operatingWeight+cargoWeight+fuel.takeoff.readOnly.totalFuel}</Table.Cell>
                        <Table.Cell textAlign='center'>{aircraft.readOnly.operatingMoment+cargoMoment+fuel.takeoff.readOnly.totalMoment}</Table.Cell>
                        <Table.Cell textAlign='center'>
                            {takeoffMAC}%
                        </Table.Cell>
                    </Table.Row>
                </Table.Body>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell textAlign='center'>Op Area</Table.HeaderCell>
                        <Table.HeaderCell textAlign='center'>For CG Limit {takeoffHasFuelInExternals?'(ext has fuel)':'(no ext fuel)'}</Table.HeaderCell>
                        <Table.HeaderCell textAlign='center'>Aft CG Limit {takeoffHasFuelInExternals?'(ext has fuel)':'(no ext fuel)'}</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    <Table.Row>
                        <Table.Cell textAlign='center'>{takeoffOpArea}</Table.Cell>
                        <Table.Cell textAlign='center'>{displayVal(takeoffForwardCG,1)}%</Table.Cell>
                        <Table.Cell textAlign='center'>{displayVal(takeoffAftCG,1)}%</Table.Cell>
                    </Table.Row>
                </Table.Body>
            </Table>
            <Table unstackable style={{maxWidth: '650px'}}>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell textAlign='center'>Landing Weight</Table.HeaderCell>
                        <Table.HeaderCell textAlign='center'>Moment</Table.HeaderCell>
                        <Table.HeaderCell textAlign='center'>%MAC</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    <Table.Row>
                        <Table.Cell textAlign='center'>{aircraft.readOnly.operatingWeight+cargoWeight+fuel.landing.readOnly.totalFuel}</Table.Cell>
                        <Table.Cell textAlign='center'>{aircraft.readOnly.operatingMoment+cargoMoment+fuel.landing.readOnly.totalMoment}</Table.Cell>
                        <Table.Cell textAlign='center'>
                            {landingMAC}%
                        </Table.Cell>
                    </Table.Row>
                </Table.Body>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell textAlign='center'>Op Area</Table.HeaderCell>
                        <Table.HeaderCell textAlign='center'>For CG Limit {landingHasFuelInExternals?'(ext has fuel)':'(no ext fuel)'}</Table.HeaderCell>
                        <Table.HeaderCell textAlign='center'>Aft CG Limit {landingHasFuelInExternals?'(ext has fuel)':'(no ext fuel)'}</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    <Table.Row>
                        <Table.Cell textAlign='center'>{landingOpArea}</Table.Cell>
                        <Table.Cell textAlign='center'>{displayVal(landingForwardCG,1)}%</Table.Cell>
                        <Table.Cell textAlign='center'>{displayVal(landingAftCG,1)}%</Table.Cell>
                    </Table.Row>
                </Table.Body>
            </Table>
            
            <Table unstackable style={{maxWidth: '650px'}}>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell textAlign='center'>A Max ZFW/Cargo</Table.HeaderCell>
                        <Table.HeaderCell textAlign='center'>B Max ZFW/Cargo</Table.HeaderCell>
                        <Table.HeaderCell textAlign='center'>C Max ZFW/Cargo</Table.HeaderCell>
                        <Table.HeaderCell textAlign='center'>D Max ZFW/Cargo</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    <Table.Row>
                        <Table.Cell textAlign='center'>{displayVal(limitingFuelMaxZFW.A)}</Table.Cell>
                        <Table.Cell textAlign='center'>{displayVal(limitingFuelMaxZFW.B)}</Table.Cell>
                        <Table.Cell textAlign='center'>{displayVal(limitingFuelMaxZFW.C)}</Table.Cell>
                        <Table.Cell textAlign='center'>{displayVal(limitingFuelMaxZFW.D)}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell textAlign='center'>{displayVal(limitingFuelMaxZFW.A-aircraft.readOnly.operatingWeight)}</Table.Cell>
                        <Table.Cell textAlign='center'>{displayVal(limitingFuelMaxZFW.B-aircraft.readOnly.operatingWeight)}</Table.Cell>
                        <Table.Cell textAlign='center'>{displayVal(limitingFuelMaxZFW.C-aircraft.readOnly.operatingWeight)}</Table.Cell>
                        <Table.Cell textAlign='center'>{displayVal(limitingFuelMaxZFW.D-aircraft.readOnly.operatingWeight)}</Table.Cell>
                    </Table.Row>
                </Table.Body>
            </Table>
        </>
    );
}