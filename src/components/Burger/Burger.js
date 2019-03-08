import React from 'react';

import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import './Burger.css';

const Burger = props => {
    let transformedIngredients = Object.keys(props.ingredients)
    .map(ingredientsKey => {
        // Make cheese: 2 = [cheese, cheese]
        return [...Array(props.ingredients[ingredientsKey])].map((_, i) => {
            return <BurgerIngredient key={ingredientsKey + i} type={ingredientsKey} />
        })
    })
    //Flatten the array, if no ingredients added, return empty
    .reduce((prevValue, currentValue) => {
        return prevValue.concat(currentValue);
    }, []);

    if(transformedIngredients.length === 0 ) {
        transformedIngredients = <p>Please start adding ingredients!</p>
    }

    return (
        <div className='Burger'>
            <BurgerIngredient type="bread-top" />
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom" />
        </div>
    )
}

export default Burger;