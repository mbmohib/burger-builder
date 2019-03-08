import React from 'react';

import './BuildControl.css';

const BuildControl = props => (
    <div className="BuildControl">
        <div className="Label">{props.label}</div>
        <button
            disabled={props.disabled}
            className="Less"
            onClick={props.handleRemoveIngredient}
        >
            Less
        </button>
        <button className="More" onClick={props.handleAddIngredient}>
            More
        </button>
    </div>
);

export default BuildControl;
