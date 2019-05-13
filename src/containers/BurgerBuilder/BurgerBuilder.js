import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummery from '../../components/Burger/OrderSummery/OrderSummery';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as burgerBuilderActions from '../../store/actions/index';

class BurgerBuilder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            purchaseModalOpen: false
        };
    }

    componentDidMount() {
        // Get ingredients from API
        this.props.onInitIngredients();
    }

    /**
     * Open/Close Modal
     *
     * @memberof BurgerBuilder
     */
    purchaseModalHandler = () => {
        this.setState(prevState => {
            return {
                purchaseModalOpen: !prevState.purchaseModalOpen
            };
        });
    };

    /**
     * Check if any ingredient added & if added
     * return true thus enabling order button
     *
     * @memberof BurgerBuilder
     */
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

    /**
     * Close modal & navigate to checkout page
     *
     * @memberof BurgerBuilder
     */
    handleContinuePurchase = () => {
        this.setState({ purchaseModalOpen: false });
        this.props.onInitPurchase();
        this.props.history.push('/checkout');
    };

    render() {
        /*
        * Construct an object containing which
        * ingredient's less button will be disabled
        */
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
                ) : this.props.error ? (
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
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onInitIngredients: () =>
            dispatch(burgerBuilderActions.initIngredient()),
        onIngredientAdded: ingName =>
            dispatch(burgerBuilderActions.addIngredient(ingName)),
        onIngredientRemoved: ingName =>
            dispatch(burgerBuilderActions.removeIngredient(ingName)),
        onInitPurchase: () => dispatch(burgerBuilderActions.purchaseInit())
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withErrorHandler(BurgerBuilder));
