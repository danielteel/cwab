import React from 'react';
import { Container, Header, Segment } from 'semantic-ui-react';
import WABMenu from './components/WABMenu';
import Aircraft from './components/Aircraft';
import Cargo from './components/Cargo';
import Options from './components/Options';
import Fuel from './components/Fuel';

import useAircraftReducer from './reducers/aircraftReducer';
import useSelectedMenuReducer from './reducers/selectedMenuReducer';
import useCargoReducer from './reducers/cargoReducer';
import useFuelReducer from './reducers/fuelReducer';
import CPRaw from './components/CPRaw';
import Output from './components/Output';

import ChartProject from './charts';

const menuItems=[
    {page: 'aircraft', title: 'Aircraft'},
    {page: 'fuel', title: 'Fuel'},
    {page: 'cargo', title: 'Cargo'},
    {page: 'output', title: 'Output'},
    {page: 'cpraw',title: 'CP Raw'},
    {page: 'options', title: 'Options'},
]


const chartProject = new ChartProject();


function App() {
    const [selectedMenu, selectedMenuDispatch] = useSelectedMenuReducer(1000);
    const [aircraft, aircraftDispatch] = useAircraftReducer(1000);
    const [fuel, fuelDispatch] = useFuelReducer(1000);
    const [cargo, cargoDispatch] = useCargoReducer(1000);

    let pageToShow=null;

    if (selectedMenu?.page==='aircraft'){
        pageToShow=<Aircraft aircraft={aircraft} aircraftDispatch={aircraftDispatch}/>
    }else if (selectedMenu?.page==='fuel'){
        pageToShow=<Fuel fuel={fuel} fuelDispatch={fuelDispatch}/>
    }else if (selectedMenu?.page==='cargo'){
        pageToShow=<Cargo cargo={cargo} cargoDispatch={cargoDispatch}/>
    }else if (selectedMenu?.page==='cpraw'){
        pageToShow=<CPRaw chartProject={chartProject}/>
    }else if (selectedMenu?.page==='output'){
        pageToShow=<Output chartProject={chartProject}/>
    }else if (selectedMenu?.page==='options'){
        pageToShow=<Options/>
    }else{
        selectedMenuDispatch('aircraft');
    }

    return ( 
        <Container style={{flexGrow:1, margin:0}}>
            <Segment inverted attached="top">
                <Header as='h1' textAlign="center">CWAB</Header>
                <Header as='h6' textAlign='center' style={{color:'#FFFFFF33'}}>Reference Use Only</Header>
            </Segment>
            <WABMenu menuItems={menuItems} selectedMenu={selectedMenu} selectedMenuDispatch={selectedMenuDispatch}/>
            <Segment attached="bottom" secondary style={{alignItems:'center', display:'flex', flexDirection:'column'}}>
                {pageToShow}
            </Segment>
        </Container>
    );
}

export default App;