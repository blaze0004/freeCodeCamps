import React from 'react';
import './SwitchInput.css';

const SwitchInput: React.FC<{
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    name: string;
    label: string;
    checked: boolean;
}> = (props) => {
    const { onChange, name, label, checked } = props;

    return (
        <div>
            <div>{label}</div>
            <div>
                <input
                    type='checkbox'
                    className='switchInput'
                    id={name}
                    name={name}
                    onChange={onChange}
                    checked={checked}
                />
                <label className='switchInputLabel' htmlFor={name}></label>
            </div>
        </div>
    );
};

export default SwitchInput;
