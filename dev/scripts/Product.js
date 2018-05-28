import React from 'react';
import firebase from 'firebase';


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
            <p className="product__description">
                {props.description}
            </p>
            <button onClick={() =>{props.addToWishlist(props.id, props.name, props.brand, props.image_link, props.description)}} className="button button__wishlist button__toggle">{props.button1Text}</button>
            <button onClick={() => { props.addToKit(props.id, props.name, props.brand, props.image_link, props.description)}} className="button button__kit button__toggle">{props.button2Text}}</button>
        </div>
		);
}

export default Product;