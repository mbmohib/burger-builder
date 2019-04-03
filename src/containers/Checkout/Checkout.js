import React, { Component } from 'react';
import CheckoutSummery from '../../components/Order/CheckoutSummery/CheckoutSummery';

class Checkout extends Component {
    state = {
        ingredients: {
            salad: 0,
            meat: 0,
            cheese: 0,
            bacon: 0
        }
    };

    componentDidMount() {
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {}

        for (let param of query.entries()) {
            ingredients[param[0]] = +param[1];
        }

        this.setState({ ingredients });
    }

    onCheckoutContinueHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    };

    onCheckoutCancelHandler = () => {
        console.log('object');
        this.props.history.goBack();
    };

    render() {
        return (
            <CheckoutSummery
                ingredients={this.state.ingredients}
                onCheckoutContinue={this.onCheckoutContinueHandler}
                onCheckoutCancel={this.onCheckoutCancelHandler}
            />
        );
    }
}

export default Checkout;
