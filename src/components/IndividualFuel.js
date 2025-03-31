import TouchInput from '@dteel/touch-input'
import { Table, Input } from 'semantic-ui-react';

const inputStyle={style:{paddingLeft:'5px', paddingRight:'5px'}};

export default function IndividualFuel({fuel, setFuel}){
    return <>
        <Table compact size="small" unstackable style={{maxWidth:'650px'}}>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Total Fuel</Table.HeaderCell>
                    <Table.HeaderCell>Moment</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                <Table.Row>
                    <Table.Cell>
                        <TouchInput as={Input} 
                        value={fuel.readOnly.totalFuel}
                        onChange={(v)=>{
                            const desiredTotalFuel=v;
                            v=Number(v);
                            const mains = Math.max(0, Math.min(31940, v));
                            v=v-31940;//subtract max main fuel tanks
                            const auxs = Math.max(0, Math.min(11620, v));
                            v=v-11620;//subtract max aux tanks
                            const exts= Math.max(0, Math.min(17800, v));

                            let outboards=Math.max(0, mains/2+650);
                            let inboards=Math.max(0, mains/2-650);
                            if (desiredTotalFuel<6000){
                                outboards=mains/2;
                                inboards=mains/2;
                            }
                            setFuel({
                                main1: outboards/2,
                                main2: inboards/2,
                                main3: inboards/2,
                                main4: outboards/2,
                                laux: auxs/2,
                                raux: auxs/2,
                                lext: exts/2,
                                rext: exts/2
                            });
                        }} fluid  type='number' title='Total Fuel' input={inputStyle}/>
                    </Table.Cell>
                    <Table.Cell>{fuel.readOnly.totalMoment}</Table.Cell>
                </Table.Row>
            </Table.Body>
        </Table>
        <Table compact size="small" unstackable style={{maxWidth: '650px'}}>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell textAlign='center'>OBs</Table.HeaderCell>
                    <Table.HeaderCell textAlign='center'>IBs</Table.HeaderCell>
                    <Table.HeaderCell textAlign='center'>AUXs</Table.HeaderCell>
                    <Table.HeaderCell textAlign='center'>EXTs</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body style={{marginBottom: 0}}>
                <Table.Row>
                    <Table.Cell>
                        <TouchInput as={Input} value={fuel.main1+fuel.main4} onChange={(v)=>{
                            v=Number(v);
                            setFuel({...fuel, main1: v/2, main4: v/2});
                        }} fluid  type='number' title='Outboards' input={inputStyle}/>
                    </Table.Cell>
                    <Table.Cell>
                        <TouchInput as={Input} value={fuel.main2+fuel.main3} onChange={(v)=>{
                            v=Number(v);
                            setFuel({...fuel, main2: v/2, main3: v/2});
                        }} fluid  type='number' title='Inboards' input={inputStyle}/>
                    </Table.Cell>
                    <Table.Cell>
                        <TouchInput as={Input} value={fuel.laux+fuel.raux} onChange={(v)=>{
                            v=Number(v);
                            setFuel({...fuel, laux: v/2, raux: v/2});
                        }} fluid  type='number' title='Auxiliarys' input={inputStyle}/>
                    </Table.Cell>
                    <Table.Cell>
                        <TouchInput as={Input} value={fuel.lext+fuel.rext} onChange={(v)=>{
                            v=Number(v);
                            setFuel({...fuel, lext: v/2, rext: v/2});
                        }} fluid  type='number' title='Externals' input={inputStyle}/>
                    </Table.Cell>
                </Table.Row>
            </Table.Body>
        </Table>
        <Table compact  size="small"  unstackable style={{maxWidth: '650px'}}>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell textAlign='center'>L Ext</Table.HeaderCell>
                    <Table.HeaderCell textAlign='center'>Main 1</Table.HeaderCell>
                    <Table.HeaderCell textAlign='center'>Main 2</Table.HeaderCell>
                    <Table.HeaderCell textAlign='center'>L Aux</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                <Table.Row>
                    <Table.Cell>
                        <TouchInput as={Input} value={fuel.lext} onChange={(v)=>{
                            setFuel({...fuel, lext: v});
                        }} fluid  type='number' title='L Ext' input={inputStyle}/>
                    </Table.Cell>
                    <Table.Cell>
                        <TouchInput as={Input} value={fuel.main1} onChange={(v)=>{
                            setFuel({...fuel, main1: v});
                        }} fluid  type='number' title='Main 1' input={inputStyle}/>
                    </Table.Cell>
                    <Table.Cell>
                        <TouchInput as={Input} value={fuel.main2} onChange={(v)=>{
                            setFuel({...fuel, main2: v});
                        }} fluid  type='number' title='Main 2' input={inputStyle}/>
                    </Table.Cell>
                    <Table.Cell>
                        <TouchInput as={Input} value={fuel.laux} onChange={(v)=>{
                            setFuel({...fuel, laux: v});
                        }} fluid  type='number' title='L Aux' input={inputStyle}/>
                    </Table.Cell>
                </Table.Row>
            </Table.Body>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell textAlign='center'>R Aux</Table.HeaderCell>
                    <Table.HeaderCell textAlign='center'>Main 3</Table.HeaderCell>
                    <Table.HeaderCell textAlign='center'>Main 4</Table.HeaderCell>
                    <Table.HeaderCell textAlign='center'>R Ext</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                <Table.Row>
                    <Table.Cell>
                        <TouchInput as={Input} value={fuel.raux} onChange={(v)=>{
                            setFuel({...fuel, raux: v});
                        }} fluid  type='number' title='R Aux' input={inputStyle}/>
                    </Table.Cell>
                    <Table.Cell>
                        <TouchInput as={Input} value={fuel.main3} onChange={(v)=>{
                            setFuel({...fuel, main3: v});
                        }} fluid  type='number' title='Main 3' input={inputStyle}/>
                    </Table.Cell>
                    <Table.Cell>
                        <TouchInput as={Input} value={fuel.main4} onChange={(v)=>{
                            setFuel({...fuel, main4: v});
                        }} fluid  type='number' title='Main 4' input={inputStyle}/>
                    </Table.Cell>
                    <Table.Cell>
                        <TouchInput as={Input} value={fuel.rext} onChange={(v)=>{
                            setFuel({...fuel, rext: v});
                        }} fluid  type='number' title='R Ext' input={inputStyle}/>
                    </Table.Cell>
                </Table.Row>
            </Table.Body>
        </Table>
    </>
}
