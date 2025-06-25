import { Table, Input, Button, Header, List, ListItem, ListHeader, TableHeader, TableHeaderCell, TableCell, TableRow, TableBody, Dropdown } from 'semantic-ui-react';

import useAircraftReducer from '../reducers/aircraftReducer';
import useCargoReducer from '../reducers/cargoReducer';
import useFuelReducer from "../reducers/fuelReducer";

import ChartProject from '../charts';

import { toMAC, calcArm, displayVal } from '../common';
import { useState } from 'react';

import TouchInput from '@dteel/touch-input'
import useOutputReducer from '../reducers/outputReducer';
const inputStyle={style:{paddingLeft:'5px', paddingRight:'5px'}};


function displayOpArea(val){
    if (val===0) return 'A';
    if (val===1) return 'B';
    if (val===2) return 'C';
    if (val===3) return 'D';
    return 'E';
}

const limitingFuelOptions = [
    {key: 1, text: 'A', value: 'A'},
    {key: 2, text: 'B', value: 'B'},
    {key: 3, text: 'C', value: 'C'},
    {key: 4, text: 'D', value: 'D'}
]

function TableCellFormatted({value, decimalPlaces, pre, post, ...rest}){
    return <TableCell textAlign='right' {...rest}>{pre}{displayVal(value, decimalPlaces)}{post}</TableCell>
}

export default function Output({chartProject}){
    const [aircraft, aircraftDispatch] = useAircraftReducer(1000);
    const [fuel, fuelDispatch] = useFuelReducer(1000);
    const [cargo, cargoDispatch] = useCargoReducer(1000);

    const [outputSettings, outputSettingsDispatch] = useOutputReducer(1000);

    // const [whichOpArea, setWhichOpArea] = useState('A');
    // const [allowableTakeoffWeight, setAllowableTakeoffWeight] = useState(164000);
    // const [allowableLandingWeight, setAllowableLandingWeight] = useState(164000);

    let cargoWeightTakeoff=0;
    let cargoMomentTakeoff=0;
    let cargoWeightLanding=0;
    let cargoMomentLanding=0;
    for (const item of cargo){
        cargoWeightTakeoff+=item.weight;
        cargoMomentTakeoff+=item.moment;
        if (!item.expended){
            cargoWeightLanding+=item.weight;
            cargoMomentLanding+=item.moment;
        }
    }

    const charts=chartProject;
    charts.$operatingWeight.input=aircraft.readOnly.operatingWeight;
    charts.$fuelWeightTakeoff.input=fuel.takeoff.readOnly.totalFuel;
    charts.$fuelWeightLanding.input=fuel.landing.readOnly.totalFuel;
    charts.$cargoWeightTakeoff.input=cargoWeightTakeoff;
    charts.$cargoWeightLanding.input=cargoWeightLanding;
    charts.calc();

    const totalAicraftWeight = aircraft.readOnly.operatingWeight+fuel.takeoff.readOnly.totalFuel;
    const totalAircraftMoment = aircraft.readOnly.operatingMoment+fuel.takeoff.readOnly.totalMoment;

    const takeoffZeroFuelWeight = aircraft.readOnly.operatingWeight+cargoWeightTakeoff;
    const takeoffZeroFuelMoment = aircraft.readOnly.operatingMoment+cargoMomentTakeoff;

    const landingZeroFuelWeight = aircraft.readOnly.operatingWeight+cargoWeightLanding;
    const landingZeroFuelMoment = aircraft.readOnly.operatingMoment+cargoMomentLanding;
    
    const takeoffWeight = aircraft.readOnly.operatingWeight+fuel.takeoff.readOnly.totalFuel+cargoWeightTakeoff;
    const takeoffMoment = aircraft.readOnly.operatingMoment+fuel.takeoff.readOnly.totalMoment+cargoMomentTakeoff;
    const takeoffMAC = toMAC(calcArm(takeoffWeight, takeoffMoment));
    const takeoffHasFuelInExternals = fuel.takeoff.lext>0 || fuel.takeoff.rext>0;
    const takeoffForwardCG = takeoffHasFuelInExternals ? charts.$extForwardCGTakeoff.value : charts.$noExtForwardCGTakeoff.value;
    const takeoffAftCG = takeoffHasFuelInExternals ? charts.$extAftCGTakeoff.value : charts.$noExtAftCGTakeoff.value;
    const takeoffOpArea = displayOpArea(charts.$operatingAreaTakeoff.value);

    const landingWeight = aircraft.readOnly.operatingWeight+fuel.landing.readOnly.totalFuel+cargoWeightLanding;
    const landingMoment = aircraft.readOnly.operatingMoment+fuel.landing.readOnly.totalMoment+cargoMomentLanding;
    const landingMAC = toMAC(calcArm(landingWeight, landingMoment));
    const landingHasFuelInExternals = fuel.landing.lext>0 || fuel.landing.rext>0;
    const landingForwardCG = takeoffHasFuelInExternals ? charts.$extForwardCGLanding.value : charts.$noExtForwardCGLanding.value;
    const landingAftCG = takeoffHasFuelInExternals ? charts.$extAftCGLanding.value : charts.$noExtAftCGLanding.value;
    const landingOpArea = displayOpArea(charts.$operatingAreaLanding.value);

    const limitingFuelMaxZFW = {
        A: charts.$areaAMaxZFWOverall.value,
        B: charts.$areaBMaxZFWOverall.value,
        C: charts.$areaCMaxZFWOverall.value,
        D: charts.$areaDMaxZFWOverall.value
    }

    return (
        <>
            <Header textAlign='center'>
                Output
            </Header>
            <Table compact size="small" unstackable celled columns='5' style={{maxWidth:'600px'}}>
                <TableHeader>
                    <TableRow>
                        <TableHeaderCell colSpan="3" textAlign='center'>ITEM</TableHeaderCell>
                        <TableHeaderCell textAlign='center'>WEIGHT</TableHeaderCell>
                        <TableHeaderCell textAlign='center'>MOMENT/1000</TableHeaderCell>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
                        <TableCell colSpan="3">BASIC AIRCRAFT</TableCell>
                        <TableCellFormatted value={aircraft.basicWeight} decimalPlaces={0}/>
                        <TableCellFormatted value={aircraft.basicMoment} decimalPlaces={0}/>
                    </TableRow>
                    <TableRow>
                        <TableCell colSpan="3">CREW</TableCell>
                        <TableCellFormatted value={aircraft.crewWeight} decimalPlaces={0}/>
                        <TableCellFormatted value={aircraft.crewMoment} decimalPlaces={0}/>
                    </TableRow>
                    <TableRow>
                        <TableCell colSpan="3">CREW'S BAGGAGE</TableCell>
                        <TableCellFormatted value={aircraft.baggageWeight} decimalPlaces={0}/>
                        <TableCellFormatted value={aircraft.baggageMoment} decimalPlaces={0}/>
                    </TableRow>
                    <TableRow>
                        <TableCell colSpan="3">STEWARD'S EQUIPMENT</TableCell>
                        <TableCellFormatted value={aircraft.stewardsWeight} decimalPlaces={0}/>
                        <TableCellFormatted value={aircraft.stewardsMoment} decimalPlaces={0}/>
                    </TableRow>
                    <TableRow>
                        <TableCell colSpan="3">EMERGENCY EQUIPMENT</TableCell>
                        <TableCellFormatted value={aircraft.emergencyWeight} decimalPlaces={0}/>
                        <TableCellFormatted value={aircraft.emergencyMoment} decimalPlaces={0}/>
                    </TableRow>
                    <TableRow>
                        <TableCell colSpan="3">EXTRA EQUIPMENT</TableCell>
                        <TableCellFormatted value={aircraft.extraWeight} decimalPlaces={0}/>
                        <TableCellFormatted value={aircraft.extraMoment} decimalPlaces={0}/>
                    </TableRow>
                    <TableRow>
                        <TableCell colSpan="3">OPERATING WEIGHT</TableCell>
                        <TableCellFormatted value={aircraft.readOnly.operatingWeight} decimalPlaces={0}/>
                        <TableCellFormatted value={aircraft.readOnly.operatingMoment} decimalPlaces={0}/>
                    </TableRow>
                    <TableRow>
                        <TableCell colSpan="3">TAKEOFF FUEL ({displayVal(fuel.takeoff.readOnly.totalFuel/6.7)} Gal) 6.7</TableCell>
                        <TableCellFormatted value={fuel.takeoff.readOnly.totalFuel} decimalPlaces={0}/>
                        <TableCellFormatted value={fuel.takeoff.readOnly.totalMoment} decimalPlaces={0}/>
                    </TableRow>
                    <TableRow>
                        <TableCell colSpan="3">TOTAL AIRCRAFT WEIGHT</TableCell>
                        <TableCellFormatted value={totalAicraftWeight} decimalPlaces={0}/>
                        <TableCellFormatted value={totalAircraftMoment} decimalPlaces={0}/>
                    </TableRow>                
                    <TableRow>
                        <TableCell colSpan="3">CARGO SUB TOTAL</TableCell>
                        <TableCellFormatted value={cargoWeightTakeoff} decimalPlaces={0}/>
                        <TableCellFormatted value={cargoMomentTakeoff} decimalPlaces={0}/>
                    </TableRow>  
                    <TableRow>
                        <TableCell colSpan="3">TAKEOFF CONDITION</TableCell>
                        <TableCellFormatted value={takeoffWeight} decimalPlaces={0}/>
                        <TableCellFormatted value={takeoffMoment} decimalPlaces={0}/>
                    </TableRow>   
                    <TableRow>
                        <TableCell colSpan="3">TAKEOFF CG % MAC</TableCell>
                        <TableCellFormatted colSpan='2' value={takeoffMAC} post="%" decimalPlaces={1}/>
                    </TableRow> 
                    <TableRow>
                        <TableCell colSpan="3">ZERO FUEL WEIGHT</TableCell>
                        <TableCellFormatted value={takeoffZeroFuelWeight} decimalPlaces={0}/>
                        <TableCellFormatted value={takeoffZeroFuelMoment} decimalPlaces={0}/>
                    </TableRow>  
                    <TableRow>
                        <TableCell colSpan="3">LESS AIR DROP LOAD</TableCell>
                        <TableCellFormatted value={cargoWeightTakeoff-cargoWeightLanding} decimalPlaces={0}/>
                        <TableCellFormatted value={cargoMomentTakeoff-cargoMomentLanding} decimalPlaces={0}/>
                    </TableRow>    
                    <TableRow>
                        <TableCell colSpan="3">ADJ ZFW/M</TableCell>
                        <TableCellFormatted value={landingZeroFuelWeight} decimalPlaces={0}/>
                        <TableCellFormatted value={landingZeroFuelMoment} decimalPlaces={0}/>
                    </TableRow>  
                    <TableRow>
                        <TableCell colSpan="3">EST. LANDING FUEL</TableCell>
                        <TableCellFormatted value={fuel.landing.readOnly.totalFuel} decimalPlaces={0}/>
                        <TableCellFormatted value={fuel.landing.readOnly.totalMoment} decimalPlaces={0}/>
                    </TableRow>  
                    <TableRow>
                        <TableCell colSpan="3">EST. LANDING CONDITION</TableCell>
                        <TableCellFormatted value={landingWeight} decimalPlaces={0}/>
                        <TableCellFormatted value={landingMoment} decimalPlaces={0}/>
                    </TableRow>     
                    <TableRow>
                        <TableCell colSpan="3">EST. LANDING CG % MAC</TableCell>
                        <TableCellFormatted colSpan='2' value={landingMAC} post="%" decimalPlaces={1}/>
                    </TableRow>  
                </TableBody>
            </Table>

            <Table compact size="small" unstackable celled columns='4' style={{maxWidth:'600px'}} attached="top">
                <TableHeader>
                    <TableRow>
                        <TableHeaderCell textAlign='center'>CARGO</TableHeaderCell>
                        <TableHeaderCell textAlign='center'>ARM</TableHeaderCell>
                        <TableHeaderCell textAlign='center'>WEIGHT</TableHeaderCell>
                        <TableHeaderCell textAlign='center'>MOMENT/1000</TableHeaderCell>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        cargo.map( (item) => {
                            return  <TableRow>
                                        <TableCell>{item.expended?'✓ ':null}{item.name}</TableCell>
                                        <TableCellFormatted value={item.arm} decimalPlaces={0}/>
                                        <TableCellFormatted value={item.weight} decimalPlaces={0}/>
                                        <TableCellFormatted value={item.moment} decimalPlaces={0}/>
                                    </TableRow>
                        })
                    }                   
                    <TableRow>
                        <TableCell colSpan="2">CARGO SUB TOTAL</TableCell>
                        <TableCellFormatted value={cargoWeightTakeoff} decimalPlaces={0}/>
                        <TableCellFormatted value={cargoMomentTakeoff} decimalPlaces={0}/>
                    </TableRow>  
                </TableBody>
            </Table>
            
            <Table compact size="small" unstackable celled columns='4' style={{maxWidth:'600px'}} attached="top">
                <TableHeader>
                    <TableRow>
                        <TableHeaderCell textAlign='center'>CONDITION</TableHeaderCell>
                        <TableHeaderCell textAlign='center'>TAKEOFF</TableHeaderCell>
                        <TableHeaderCell textAlign='center'>LANDING</TableHeaderCell>
                        <TableHeaderCell textAlign='center'>OP AREA <Dropdown onChange={(e, v)=>outputSettingsDispatch('set-op-area', v.value)} options={limitingFuelOptions} value={outputSettings.whichOpArea}/></TableHeaderCell>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
                        <TableCell>ALLOWABLE GW</TableCell>
                        <TableCell>
                            <TouchInput as={Input} value={outputSettings.allowableTakeoffWeight} onChange={(v)=>{
                                v=Number(v);
                                outputSettingsDispatch('set-allowable-takeoff', v);
                            }} fluid  type='number' title='Allowable Takeoff Weight' input={inputStyle}/>
                        </TableCell>
                        <TableCell>
                            <TouchInput as={Input} value={outputSettings.allowableLandingWeight} onChange={(v)=>{
                                v=Number(v);
                                outputSettingsDispatch('set-allowable-landing', v);
                            }} fluid  type='number' title='Allowable Landing Weight' input={inputStyle}/>
                        </TableCell>
                        <TableCellFormatted value={limitingFuelMaxZFW[outputSettings.whichOpArea]} decimalPlaces={0}/>
                    </TableRow>
                    <TableRow>
                        <TableCell>TOTAL AIRCRAFT WT</TableCell>
                        <TableCellFormatted value={totalAicraftWeight} decimalPlaces={0}/>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>OP WT+LNDG FUEL</TableCell>
                        <TableCell></TableCell>
                        <TableCellFormatted value={aircraft.readOnly.operatingWeight+fuel.landing.readOnly.totalFuel} decimalPlaces={0}/>
                        <TableCell></TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>OP WT</TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCellFormatted value={aircraft.readOnly.operatingWeight} decimalPlaces={0}/>
                    </TableRow>
                    <TableRow>
                        <TableCell>ALLOWABLE LOAD</TableCell>
                        <TableCellFormatted value={outputSettings.allowableTakeoffWeight-totalAicraftWeight} decimalPlaces={0}/>
                        <TableCellFormatted value={outputSettings.allowableLandingWeight-aircraft.readOnly.operatingWeight-fuel.landing.readOnly.totalFuel} decimalPlaces={0}/>
                        <TableCellFormatted value={limitingFuelMaxZFW[outputSettings.whichOpArea]-aircraft.readOnly.operatingWeight} decimalPlaces={0}/>
                    </TableRow>
                </TableBody>
            </Table>
            
            <Table compact size="small" unstackable celled style={{maxWidth:'600px'}} attached="bottom">
                <TableBody>
                    <TableRow>
                        <TableHeaderCell>TAKEOFF CG LIMITS {takeoffHasFuelInExternals?'(ext has fuel)':'(no ext fuel)'}</TableHeaderCell>
                        <TableCellFormatted value={takeoffForwardCG} pre={"FORWARD "} post="%" decimalPlaces={1}/>
                        <TableCellFormatted value={takeoffAftCG} pre={"AFT "} post="%" decimalPlaces={1}/>
                    </TableRow>
                    <TableRow>
                        <TableHeaderCell>LANDING CG LIMITS {landingHasFuelInExternals?'(ext has fuel)':'(no ext fuel)'}</TableHeaderCell>
                        <TableCellFormatted value={landingForwardCG} pre={"FORWARD "} post="%" decimalPlaces={1}/>
                        <TableCellFormatted value={landingAftCG} pre={"AFT "} post="%" decimalPlaces={1}/>
                    </TableRow>
                </TableBody>
            </Table>
            
            <Table compact size="small" unstackable celled style={{maxWidth:'300px'}} attached="bottom">
                <TableBody>
                    <TableRow>
                        <TableHeaderCell>Operating Area on Takeoff</TableHeaderCell>
                        <TableCell>{takeoffOpArea}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableHeaderCell>Operating Area on Landing</TableHeaderCell>
                        <TableCell>{landingOpArea}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </>
    );
}