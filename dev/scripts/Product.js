import React from 'react';

const Product = () => {
    return (
        <div className="product">
            <h3 className="product__name">Product Name</h3>
            <img src="" alt="" className="product__image" />
            <p className="product__price">Price</p>
            <p className="product__description">
                Description
            </p>
            <button className="button button__wishlist button__add">Add to wishlist</button>
            <button className="button button__kit button__add"></button>
        </div>
    );
}

export default Product;