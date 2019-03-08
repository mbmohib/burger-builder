import React from 'react';

import './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    {
        label: 'Salad',
        type: 'salad'
    },
    {
        label: 'Bacon',
        type: 'bacon'
    },
    {
        label: 'Cheese',
        type: 'cheese'
    },
    {
        label: 'Meat',
        type: 'meat'
    }
];

const BuildControls = props => (
    <div className="BuildControls">
        <p>Current Price: <strong>{props.price.toFixed(2)}</strong></p>
        {controls.map(ctrl => (
            <BuildControl
                key={ctrl.label}
                label={ctrl.label}
                handleAddIngredient={() =>
                    props.addIngredientHandler(ctrl.type)
                }
                handleRemoveIngredient={() =>
                    props.removeIngredientHandler(ctrl.type)
                }
                disabled={props.disabledInfo[ctrl.type]}
            />
        ))}
    </div>
);

export default BuildControls;
