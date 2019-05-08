import React from 'react';

import './Button.css';

const Button = props => (
    <button
        className={['Button', props.type].join(' ')}
        onClick={props.handleBtnClick}
        disabled={props.disabled}
    >
        {props.children}
    </button>
);

export default Button;
