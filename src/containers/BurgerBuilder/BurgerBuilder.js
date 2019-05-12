import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummery from '../../components/Burger/OrderSummery/OrderSummery';
import axios from '../../axios-order';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actionTypes from '../../store/actions';

class BurgerBuilder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            purchaseModalOpen: false,
            loading: false,
            error: null
        };
    }

    componentDidMount() {
        // axios
        //     .get('/ingredients.json')
        //     .then(response => {
        //         this.setState({ ingredients: response.data });
        //     })
        //     .catch(error => {
        //         this.setState({ error: true });
        //     });
    }

    purchaseModalHandler = () => {
        this.setState(prevState => {
            return {
                purchaseModalOpen: !prevState.purchaseModalOpen
            };
        });
    };

    updatePurchaseState(ingredients) {
        const sumIngredients = Object.keys(ingredients)
            .map(key => {
                return ingredients[key];
            })
            .reduce((prevValue, currentValue) => {
                return prevValue + currentValue;
            }, 0);

        return sumIngredients > 0
    }

    handleContinuePurchase = () => {
        this.setState({ purchaseModalOpen: false });
        this.props.history.push('/checkout');
    };

    render() {
        const disabledInfo = {
            ...this.props.ings
        };

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        return (
            <Aux>
                {this.props.ings ? (
                    <Aux>
                        <Modal
                            show={this.state.purchaseModalOpen}
                            clicked={this.purchaseModalHandler}
                        >
                            {this.state.loading ? (
                                <Spinner />
                            ) : (
                                <OrderSummery
                                    ingredients={this.props.ings}
                                    handleCancelPurchase={
                                        this.purchaseModalHandler
                                    }
                                    handleContinuePurchase={
                                        this.handleContinuePurchase
                                    }
                                    totalPrice={this.props.price}
                                />
                            )}
                        </Modal>
                        <Burger ingredients={this.props.ings} />
                        <BuildControls
                            addIngredientHandler={this.props.onIngredientAdded}
                            removeIngredientHandler={
                                this.props.onIngredientRemoved
                            }
                            disabledInfo={disabledInfo}
                            price={this.props.price}
                            purchasable={this.updatePurchaseState(this.props.ings)}
                            purchaseModalHandler={this.purchaseModalHandler}
                        />
                    </Aux>
                ) : this.state.error ? (
                    <p style={{ textAlign: 'center' }}>
                        Ingredients are not loading! Please reload!
                    </p>
                ) : (
                    <Spinner />
                )}
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: ingName =>
            dispatch({
                type: actionTypes.ADD_INGREDIENT,
                ingredientName: ingName
            }),
        onIngredientRemoved: ingName =>
            dispatch({
                type: actionTypes.REMOVE_INGREDIENT,
                ingredientName: ingName
            })
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withErrorHandler(BurgerBuilder));
