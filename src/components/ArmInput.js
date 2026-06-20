import {useState} from 'react';
import TouchInput from '@dteel/touch-input'
import {Button, Input} from 'semantic-ui-react';

import ArmPicker from './ArmPicker';

export default function ArmInput({value, onChange, disabled, title='Arm', input}){
    const [pickerOpen, setPickerOpen] = useState(false);

    return (
        <div className='arm-input'>
            <TouchInput
                as={Input}
                className='arm-input-field'
                value={value}
                onChange={onChange}
                fluid
                disabled={disabled}
                type={disabled ? null : 'number'}
                title={title}
                input={input}
            />
            <Button
                className='arm-picker-button'
                icon='crosshairs'
                size='mini'
                title='Pick arm from station diagram'
                disabled={disabled}
                onClick={() => setPickerOpen(true)}
            />
            <ArmPicker
                open={pickerOpen}
                value={value}
                onPick={onChange}
                onClose={() => setPickerOpen(false)}
            />
        </div>
    );
}
