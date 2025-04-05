import {useState} from 'react';
import { Table, Input, Button, Header, Icon, Modal, ModalHeader, ModalDescription, ModalContent, ModalActions, Checkbox, List, ListItem } from 'semantic-ui-react';
import { calcArm, calcMoment } from '../common';


const defaultCrew=[
    {name: 'Pilot',         weight: 200, arm: 140, checked: true},
    {name: 'Copilot',       weight: 200, arm: 140, checked: true},
    {name: 'CSO',           weight: 200, arm: 194, checked: false},
    {name: 'AFDS',          weight: 200, arm: 227, checked: false},
    {name: 'Extra Cockpit', weight: 200, arm: 227, checked: false},
    
    {name: 'Fwd Left LM',   weight: 200, arm: 281, checked: false},
    {name: 'Fwd Right LM',  weight: 200, arm: 281, checked: false},
    {name: 'Aft Left LM',   weight: 200, arm: 710, checked: true},
    {name: 'Aft Right LM',  weight: 200, arm: 710, checked: false},
];

export default function CrewCalcModal({setCrewData}){
    const [open, setOpen] = useState(false);
    const [crew, setCrew]=useState(defaultCrew);

    return <>
        <Modal 
            onClose={()=>{}}
            onOpen={()=>{setOpen(true)}}
            open={open}
            trigger={<Button icon><Icon name='calculator'/></Button>}
        >
            <ModalHeader>
                Crew Calc
            </ModalHeader>
            <ModalContent>
                <List size='huge'>
                {
                    crew.map(member=>(
                        <ListItem style={{padding:'5px'}}>
                        <Checkbox
                            onChange={(e, data)=>{
                                const newCrew=[...crew];
                                for (const a of newCrew){
                                    if (a.name===member.name){
                                        a.checked=data.checked;
                                    }
                                }
                                setCrew(newCrew);
                            }}
                            checked={member.checked}
                            label={member.name+' '+member.weight+'lbs at FS '+member.arm}
                        />
                        </ListItem>
                    ))
                }
                </List>
            </ModalContent>
            <ModalActions>
                <Button
                    color='green' 
                    onClick={()=>{
                        let weight=0;
                        let moment=0;
                        for (const member of crew){
                            if (member.checked){
                                weight+=member.weight;
                                moment+=calcMoment(member.weight, member.arm);
                            }
                        }
                        setCrewData({weight, moment});
                        setOpen(false);
                    }}
                >
                    Save
                </Button>
                <Button color='red' onClick={()=>{
                    setOpen(false);
                }}>Cancel</Button>
            </ModalActions>
        </Modal>
    </>

}