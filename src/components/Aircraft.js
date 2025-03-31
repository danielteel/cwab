import TouchInput from '@dteel/touch-input'
import { Table, Input, Button, Header } from 'semantic-ui-react';

import {useState} from 'react';

import { calcArm, calcMoment } from '../common';

const noPadCell={padding:'1px', border:'none'};
const deleteCell={padding:'0px 4px 0px 0px', border:'none'};
const inputStyle={style:{paddingLeft:'5px', paddingRight:'5px'}};


export default function Aircraft({aircraft, aircraftDispatch}){
  
    return (
        <>
            <Header textAlign='center'>
                Aircraft
            </Header>
            <Table unstackable style={{maxWidth: '650px'}}>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell textAlign='center'>Basic Weight</Table.HeaderCell>
                        <Table.HeaderCell textAlign='center'>Moment</Table.HeaderCell>
                        <Table.HeaderCell textAlign='center'>Arm</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    <Table.Row>
                        <Table.Cell>
                            <TouchInput as={Input} value={aircraft.basicWeight} onChange={(v)=>{
                                aircraftDispatch('set', {...aircraft, basicWeight: v})
                            }} fluid type='number' title='Basic Weight' input={inputStyle}/>
                        </Table.Cell>
                        <Table.Cell>
                            <TouchInput as={Input} value={aircraft.basicMoment} onChange={(v)=>{
                                aircraftDispatch('set', {...aircraft, basicMoment: v})
                            }} fluid type='number' title='Basic Moment' input={inputStyle}/>
                        </Table.Cell>
                        <Table.Cell>
                            <TouchInput as={Input} value={calcArm(aircraft.basicWeight, aircraft.basicMoment)} onChange={(v)=>{
                                aircraftDispatch('set', {...aircraft, basicMoment: calcMoment(aircraft.basicWeight, v)})
                            }} fluid type='number' title='Basic Arm' input={inputStyle}/>
                        </Table.Cell>
                    </Table.Row>
                </Table.Body>
            </Table>
            <Table unstackable style={{maxWidth: '650px'}}>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell textAlign='center'>Crew Weight</Table.HeaderCell>
                        <Table.HeaderCell textAlign='center'>Moment</Table.HeaderCell>
                        <Table.HeaderCell textAlign='center'>Arm</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    <Table.Row>
                        <Table.Cell>
                            <TouchInput as={Input} value={aircraft.crewWeight} onChange={(v)=>{
                                aircraftDispatch('set', {...aircraft, crewWeight: v})
                            }} fluid type='number' title='Crew Weight' input={inputStyle}/>
                        </Table.Cell>
                        <Table.Cell>
                            <TouchInput as={Input} value={aircraft.crewMoment} onChange={(v)=>{
                                aircraftDispatch('set', {...aircraft, crewMoment: v})
                            }} fluid type='number' title='Crew Moment' input={inputStyle}/>
                        </Table.Cell>
                        <Table.Cell>
                            <TouchInput as={Input} value={calcArm(aircraft.crewWeight, aircraft.crewMoment)} onChange={(v)=>{
                                aircraftDispatch('set', {...aircraft, crewMoment: calcMoment(aircraft.crewWeight, v)})
                            }} fluid type='number' title='Crew Arm' input={inputStyle}/>
                        </Table.Cell>
                    </Table.Row>
                </Table.Body>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell textAlign='center'>Crew Bag Weight</Table.HeaderCell>
                        <Table.HeaderCell textAlign='center'>Moment</Table.HeaderCell>
                        <Table.HeaderCell textAlign='center'>Arm</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    <Table.Row>
                        <Table.Cell>
                            <TouchInput as={Input} value={aircraft.baggageWeight} onChange={(v)=>{
                                aircraftDispatch('set', {...aircraft, baggageWeight: v})
                            }} fluid type='number' title='Crew Bags Weight' input={inputStyle}/>
                        </Table.Cell>
                        <Table.Cell>
                            <TouchInput as={Input} value={aircraft.baggageMoment} onChange={(v)=>{
                                aircraftDispatch('set', {...aircraft, baggageMoment: v})
                            }} fluid type='number' title='Crew Bags Moment' input={inputStyle}/>
                        </Table.Cell>
                        <Table.Cell>
                            <TouchInput as={Input} value={calcArm(aircraft.baggageWeight, aircraft.baggageMoment)} onChange={(v)=>{
                                aircraftDispatch('set', {...aircraft, baggageMoment: calcMoment(aircraft.baggageWeight, v)})
                            }} fluid type='number' title='Crew Bags Arm' input={inputStyle}/>
                        </Table.Cell>
                    </Table.Row>
                </Table.Body>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell textAlign='center'>Stewards Weight</Table.HeaderCell>
                        <Table.HeaderCell textAlign='center'>Moment</Table.HeaderCell>
                        <Table.HeaderCell textAlign='center'>Arm</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    <Table.Row>
                        <Table.Cell>
                            <TouchInput as={Input} value={aircraft.stewardsWeight} onChange={(v)=>{
                                aircraftDispatch('set', {...aircraft, stewardsWeight: v})
                            }} fluid type='number' title='Stewards Weight' input={inputStyle}/>
                        </Table.Cell>
                        <Table.Cell>
                            <TouchInput as={Input} value={aircraft.stewardsMoment} onChange={(v)=>{
                                aircraftDispatch('set', {...aircraft, stewardsMoment: v})
                            }} fluid type='number' title='Stewards Moment' input={inputStyle}/>
                        </Table.Cell>
                        <Table.Cell>
                            <TouchInput as={Input} value={calcArm(aircraft.stewardsWeight, aircraft.stewardsMoment)} onChange={(v)=>{
                                aircraftDispatch('set', {...aircraft, stewardsMoment: calcMoment(aircraft.stewardsWeight, v)})
                            }} fluid type='number' title='Stewards Arm' input={inputStyle}/>
                        </Table.Cell>
                    </Table.Row>
                </Table.Body>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell textAlign='center'>Emerg Weight</Table.HeaderCell>
                        <Table.HeaderCell textAlign='center'>Moment</Table.HeaderCell>
                        <Table.HeaderCell textAlign='center'>Arm</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    <Table.Row>
                        <Table.Cell>
                            <TouchInput as={Input} value={aircraft.emergencyWeight} onChange={(v)=>{
                                aircraftDispatch('set', {...aircraft, emergencyWeight: v})
                            }} fluid type='number' title='Emerg Weight' input={inputStyle}/>
                        </Table.Cell>
                        <Table.Cell>
                            <TouchInput as={Input} value={aircraft.emergencyMoment} onChange={(v)=>{
                                aircraftDispatch('set', {...aircraft, emergencyMoment: v})
                            }} fluid type='number' title='Emerg Moment' input={inputStyle}/>
                        </Table.Cell>
                        <Table.Cell>
                            <TouchInput as={Input} value={calcArm(aircraft.emergencyWeight, aircraft.emergencyMoment)} onChange={(v)=>{
                                aircraftDispatch('set', {...aircraft, emergencyMoment: calcMoment(aircraft.emergencyWeight, v)})
                            }} fluid type='number' title='Emerg Arm' input={inputStyle}/>
                        </Table.Cell>
                    </Table.Row>
                </Table.Body>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell textAlign='center'>Extra Weight</Table.HeaderCell>
                        <Table.HeaderCell textAlign='center'>Moment</Table.HeaderCell>
                        <Table.HeaderCell textAlign='center'>Arm</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    <Table.Row>
                        <Table.Cell>
                            <TouchInput as={Input} value={aircraft.extraWeight} onChange={(v)=>{
                                aircraftDispatch('set', {...aircraft, extraWeight: v})
                            }} fluid type='number' title='Extra Weight' input={inputStyle}/>
                        </Table.Cell>
                        <Table.Cell>
                            <TouchInput as={Input} value={aircraft.extraMoment} onChange={(v)=>{
                                aircraftDispatch('set', {...aircraft, extraMoment: v})
                            }} fluid type='number' title='Extra Moment' input={inputStyle}/>
                        </Table.Cell>
                        <Table.Cell>
                            <TouchInput as={Input} value={calcArm(aircraft.extraWeight, aircraft.extraMoment)} onChange={(v)=>{
                                aircraftDispatch('set', {...aircraft, extraMoment: calcMoment(aircraft.extraWeight, v)})
                            }} fluid type='number' title='Extra Arm' input={inputStyle}/>
                        </Table.Cell>
                    </Table.Row>
                </Table.Body>
            </Table>
            
            <Table unstackable style={{maxWidth: '650px'}}>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell textAlign='center'>Op Weight</Table.HeaderCell>
                        <Table.HeaderCell textAlign='center'>Moment</Table.HeaderCell>
                        <Table.HeaderCell textAlign='center'>Arm</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    <Table.Row>
                        <Table.Cell textAlign='center'>
                            {aircraft.readOnly.operatingWeight}
                        </Table.Cell>
                        <Table.Cell textAlign='center'>
                            {aircraft.readOnly.operatingMoment}
                        </Table.Cell>
                        <Table.Cell textAlign='center'>
                            {calcArm(aircraft.readOnly.operatingWeight, aircraft.readOnly.operatingMoment)}
                        </Table.Cell>
                    </Table.Row>
                </Table.Body>
            </Table>
        </>
    );
}