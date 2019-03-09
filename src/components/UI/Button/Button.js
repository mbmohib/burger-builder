import React from 'react';

import './Button.css';

const Button = props => (
    <button
        className={['Button', props.type].join(' ')}
        onClick={props.handleBtnClick}
    >
        {props.children}
    </button>
);

export default Button;
