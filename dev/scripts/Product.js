import React from 'react';

const Product = (props) => {
    return (
        <div className="product" data-id={props.id}>
            <h3 className="product__headline">
                <span className="product__brand">
                    {props.brand}
                </span>
                <span className="product__name">
                    {props.name}
                </span>
            </h3>
            <img src={props.image_link} alt={props.name} className="product__image" />
            <p className="product__price">${props.price}</p>
            <p className="product__description">
                {props.description}
            </p>
            <button className="button button__wishlist button__toggle">Add to wishlist</button>
            <button className="button button__kit button__toggle"></button>
        </div>
    );
}

export default Product;