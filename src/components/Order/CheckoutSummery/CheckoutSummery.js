import React from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import './CheckoutSummery.css';

const CheckoutSummery = props => {
    return (
        <div className="CheckoutSummary">
            <h1>We hope it tastes well!</h1>
            <div>
                <Burger ingredients={props.ingredients} />
            </div>
            <Button type="Danger" handleBtnClick={props.onCheckoutCancel}>
                Cancel
            </Button>
            <Button type="Success" handleBtnClick={props.onCheckoutContinue}>
                Continue
            </Button>
        </div>
    );
};

export default CheckoutSummery;
