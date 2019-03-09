import React, { Component } from 'react';

import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummery from '../../components/Burger/OrderSummery/OrderSummery';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};

class BurgerBuilder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ingredients: {
                salad: 0,
                bacon: 0,
                cheese: 0,
                meat: 0
            },
            totalPrice: 4,
            purchasable: false,
            purchaseModalOpen: false
        };
    }

    purchaseModalHandler = () => {
        this.setState((prevState) => {
            return {
                purchaseModalOpen: !prevState.purchaseModalOpen
            }
        })
    }

    updatePurchaseState(ingredients) {
        const sumIngredients = Object.keys(ingredients)
            .map( key => {
                return ingredients[key]
            })
            .reduce((prevValue, currentValue) => {
                return prevValue + currentValue
            }, 0)

        this.setState({
            purchasable: sumIngredients > 0
        })
    }

    addIngredientHandler = type => {
        const updatedCount = this.state.ingredients[type] + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;

        const updatedPrice = INGREDIENT_PRICES[type] + this.state.totalPrice;

        this.setState({
            totalPrice: updatedPrice,
            ingredients: updatedIngredients
        });
        this.updatePurchaseState(updatedIngredients);
    };

    removeIngredientHandler = type => {
        const updatedCount = this.state.ingredients[type] - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;

        const updatedPrice = INGREDIENT_PRICES[type] - this.state.totalPrice;

        this.setState({
            totalPrice: updatedPrice,
            ingredients: updatedIngredients
        });
        this.updatePurchaseState(updatedIngredients);
    };

    handleContinuePurchase = () => {
        alert('Continue!')
    }

    render() {
        const disabledInfo = {
            ...this.state.ingredients
        };

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        return (
            <Aux>
                <Modal show={this.state.purchaseModalOpen} backdropHandler={this.purchaseModalHandler}>
                    <OrderSummery 
                        ingredients={this.state.ingredients}
                        handleCancelPurchase={this.purchaseModalHandler}
                        handleContinuePurchase={this.handleContinuePurchase}
                        totalPrice={this.state.totalPrice}
                    />
                </Modal>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls
                    addIngredientHandler={this.addIngredientHandler}
                    removeIngredientHandler={this.removeIngredientHandler}
                    disabledInfo={disabledInfo}
                    price={this.state.totalPrice}
                    purchasable={this.state.purchasable}
                    purchaseModalHandler={this.purchaseModalHandler}
                />
            </Aux>
        );
    }
}

export default BurgerBuilder;
