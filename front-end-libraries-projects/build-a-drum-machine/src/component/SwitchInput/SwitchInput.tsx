import React, { useEffect, useState } from 'react';
import './SwitchInput.css';

const SwitchInput: React.FC<{ onChange: Function; name: string; isChecked: boolean }> = (props) => {
    const { onChange, name, isChecked } = props;
    const [checked, setChecked] = useState(isChecked);

    useEffect(() => {
        setChecked(isChecked);
    }, [isChecked]);

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value);
        console.log(e.target.value);
    };

    return (
        <>
            <input type='checkbox' className="switchInput" id={name} name={name} onChange={handleOnChange} checked={checked} />
            <label className='switchInputLabel' htmlFor={name}></label>
        </>
    );
};

export default SwitchInput;
