import React, { ButtonHTMLAttributes } from 'react';

interface IButton extends ButtonHTMLAttributes<any> {
    text: string,
    bgColor: string,
}
const Button: React.FC<IButton> = (props) => {
    const {text, bgColor, ...buttonProps} = props;
    return <button style={{
        backgroundColor: bgColor,
        borderRadius: 8,
        color: 'white',
        padding: '4px 8px',
        border: 'none'
    }} {...buttonProps}>{text}</button> 
}

export default Button;