import React from 'react';

import { Table } from 'semantic-ui-react'

import RawRows from './RawRows';

export default function RawOutput({detailed, chartProject, ...props}){

    return  (
        <>
        <Table compact="very" collapsing unstackable>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Type</Table.HeaderCell>
                    <Table.HeaderCell>Name</Table.HeaderCell>
                    <Table.HeaderCell>Value</Table.HeaderCell>
                </Table.Row>
            </Table.Header>

            <Table.Body>
                <RawRows chartProject={chartProject} detailed={detailed}/>
            </Table.Body>
        </Table>
        </>
    );
}