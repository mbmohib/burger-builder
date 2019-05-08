import React from 'react';

import './Order.css';

const Order = props => {
    const ingredients = [];

    for (let ingredientName in props.ingredients) {
        ingredients.push({
            name: ingredientName,
            amount: props.ingredients[ingredientName]
        })
    }
    
    return (
        <div className="Order">
            {ingredients.map( ingredient => (
                <span key={ingredient.name}>{ingredient.name} : {ingredient.amount}</span>
            ))}
            <p><strong>Price:</strong> {Number.parseFloat(props.price.toFixed(2))}</p>
        </div>
    )
}

export default Order;