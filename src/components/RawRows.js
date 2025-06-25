import React from 'react';

import { Table, Message } from 'semantic-ui-react'

import {displayVal, markUpScript} from '../common';

const objectTypeMap =   {
    linear:     "chart line",
    clamp:      "arrows alternate vertical",
    trend:      "random",
    poly:       "clone",
    table:      "table",
    input:      "edit",
    script:     "code",
    constant:   "caret right"
};


export default function RawRows({chartProject, detailed}){
    let rows=[];
    for (const [ , obj] of Object.entries(chartProject.calcArray)) {

        let details;
        
        if (detailed){
            switch (obj.type){
                case 'script':
                    details=(
                        <Message size="mini" style={{margin: "15px"}}>{markUpScript(obj)}</Message>
                    );
                    break;
                case 'input':
                    details=(<div style={{width:"100%"}}>
                                <pre style={{textAlign:"center"}}>{obj.name} input of '{obj.input}' = {displayVal(obj.value,5)}</pre>
                                <Message size="mini" style={{margin: "15px"}}>{markUpScript(obj)}</Message>
                            </div>)
                    break;
                case 'linear':
                    details=(<div style={{width:"100%"}}>
                                <pre style={{textAlign:"center"}}>{obj.xOrYRefObj.name} of {displayVal(obj.xOrYRefObj.value,1)} -&gt; {obj.zRefObj.name} of {displayVal(obj.zRefObj.value,1)} = {displayVal(obj.value,1)}</pre>
                            </div>)
                    break;
                case 'clamp':
                    details=(<div style={{width:"100%"}}>
                                <pre style={{textAlign:"center"}}>{obj.valueToClampRefObj.name} of {displayVal(obj.valueToClampRefObj.value,1)} @ {obj.xOrYRefObj.name} of {displayVal(obj.xOrYRefObj.value,1)} = {displayVal(obj.value,1)}</pre>
                            </div>)
                    break;
                case 'trend':
                    details=(<Table basic="very" compact="very" collapsing unstackable size="small" style={{marginLeft:"auto", marginRight:"auto"}}>
                                <Table.Body>
                                    <Table.Row>
                                        <Table.Cell>
                                            {obj.yIsInputAxis?"Y":"X"} in
                                        </Table.Cell>
                                        <Table.Cell>
                                            {obj.xOrYRefObj.name}
                                        </Table.Cell>
                                        <Table.Cell>
                                            {displayVal(obj.xOrYRefObj.value,1)}
                                        </Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell>
                                            Entry
                                        </Table.Cell>
                                        <Table.Cell>
                                            {obj.entryPointRefObj.name}
                                        </Table.Cell>
                                        <Table.Cell>
                                            {displayVal(obj.entryPointRefObj.value,1)}
                                        </Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell>
                                            Exit
                                        </Table.Cell>
                                        <Table.Cell>
                                            {obj.exitPointRefObj.name}
                                        </Table.Cell>
                                        <Table.Cell>
                                            {displayVal(obj.exitPointRefObj.value,1)}
                                        </Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell>
                                            {obj.yIsInputAxis?"Y":"X"} out
                                        </Table.Cell>
                                        <Table.Cell>
                                            
                                        </Table.Cell>
                                        <Table.Cell>
                                            {displayVal(obj.value,1)}
                                        </Table.Cell>
                                    </Table.Row>
                                </Table.Body>
                            </Table>)
                    break;
                case 'poly':
                    details=(<Table basic="very" compact="very" collapsing unstackable size="small" style={{marginLeft:"auto", marginRight:"auto"}}>
                                <Table.Body>
                                    <Table.Row>
                                        <Table.Cell>
                                            X
                                        </Table.Cell>
                                        <Table.Cell>
                                            {obj.xInRefObj.name}
                                        </Table.Cell>
                                        <Table.Cell>
                                            {displayVal(obj.xInRefObj.value,1)}
                                        </Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell>
                                            Y
                                        </Table.Cell>
                                        <Table.Cell>
                                            {obj.yInRefObj.name}
                                        </Table.Cell>
                                        <Table.Cell>
                                            {displayVal(obj.yInRefObj.value,1)}
                                        </Table.Cell>
                                    </Table.Row>
                                </Table.Body>
                            </Table>)
                    break;
                case 'table':
                    details=(<Table basic="very" compact="very" collapsing unstackable size="small" style={{marginLeft:"auto", marginRight:"auto"}}>
                                <Table.Body>
                                    <Table.Row>
                                        <Table.Cell>
                                        {obj.inputRefObj.name}
                                        </Table.Cell>
                                        <Table.Cell>{displayVal(obj.inputRefObj.value,1)}
                                        </Table.Cell>
                                        <Table.Cell>
                                        </Table.Cell>
                                    </Table.Row>
                                    {
                                        obj.table.map( item =>    
                                            <Table.Row key={obj.inputRefObj.name+"table_row"+item.refObj.name}>
                                                <Table.Cell>
                                                    {item.refObj.name}
                                                </Table.Cell>
                                                <Table.Cell>
                                                    {displayVal(item.value,1)}
                                                </Table.Cell>
                                                <Table.Cell>
                                                    {displayVal(item.refObj.value,1)}
                                                </Table.Cell>
                                            </Table.Row>
                                        )
                                    }
                                </Table.Body>
                            </Table>)
                    break;
                default:
                    break;
            }
        }

        rows.push(<React.Fragment key={obj.name+"_normalRow"}>
            <Table.Row>
                <Table.Cell icon={objectTypeMap[obj.type]}></Table.Cell>
                <Table.Cell style={{fontWeight:"bold"}}>{obj.name}</Table.Cell>
                <Table.Cell>{displayVal(obj.value,1)}</Table.Cell>
            </Table.Row>
            {
                details
                ?
                    <Table.Row style={{padding:"0px"}}>
                        <Table.Cell colSpan={3} style={{padding:"0px", paddingRight:"5px", border: "0px"}}>
                            {details}
                        </Table.Cell>
                    </Table.Row>
                :
                    null
            }
        </React.Fragment>);
    }
    return rows;
}