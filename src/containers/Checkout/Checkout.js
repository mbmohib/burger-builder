import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
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
        let summery = <Redirect to="/" />
        if(this.props.ings) {
           
            const purchaseRedirect = this.props.purchased && <Redirect to="/" />
            summery = (<div>
            {purchaseRedirect}
            <CheckoutSummery
                ingredients={this.props.ings}
                onCheckoutContinue={this.onCheckoutContinueHandler}
                onCheckoutCancel={this.onCheckoutCancelHandler}
            />

            <Route
                path={this.props.match.path + '/contact-data'}
                component={ContactData}
            />
        </div>)
        }
        return summery;
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        purchased: state.order.purchased
    }
}

export default connect(mapStateToProps)(Checkout);
