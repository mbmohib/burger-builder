import React from 'react';

import Aux from '../../../hoc/Aux';

const OrderSummery = props => {
    const ingredientSummery = Object.keys(props.ingredients).map(
        ingredientKey => {
            return (
                <li key={ingredientKey}>
                    <span style={{ textTransform: 'capitalize' }}>
                        {ingredientKey}
                    </span>{' '}
                    : {props.ingredients[ingredientKey]}
                </li>
            );
        }
    );
    return (
        <Aux>
            <h3>Your Order</h3>
            <p>A delicios burger with the following ingredients:</p>
            <ul>{ingredientSummery}</ul>
            <p>Continue to Checkout?</p>
        </Aux>
    );
};

export default OrderSummery;
