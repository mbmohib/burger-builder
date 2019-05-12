import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummery from '../../components/Order/CheckoutSummery/CheckoutSummery';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {

    onCheckoutContinueHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    };

    onCheckoutCancelHandler = () => {
        this.props.history.goBack();
    };

    render() {
        return (
            <div>
                <CheckoutSummery
                    ingredients={this.props.ings}
                    onCheckoutContinue={this.onCheckoutContinueHandler}
                    onCheckoutCancel={this.onCheckoutCancelHandler}
                />

                <Route
                    path={this.props.match.path + '/contact-data'}
                    component={ContactData}
                />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients
    }
}

export default connect(mapStateToProps)(Checkout);
