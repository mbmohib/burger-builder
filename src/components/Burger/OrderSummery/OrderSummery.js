import React from 'react';

import Aux from '../../../hoc/Aux';
import Button from '../../UI/Button/Button';

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
            <p><strong>Total Price: </strong>{props.totalPrice.toFixed(2)}</p>
            <p>Continue to Checkout?</p>
            <Button type="Danger" handleBtnClick={props.handleCancelPurchase}>Cancel</Button>
            <Button type="Success" handleBtnClick={props.handleContinuePurchase}>Continue</Button>
        </Aux>
    );
};

export default OrderSummery;
