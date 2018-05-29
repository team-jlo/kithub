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
						<div className="product__image--container">
            <img src={props.image_link} alt={props.name} className="product__image" />
						</div>	
						
            {props.loggedIn === true ? <button onClick={() => { props.addToWishlist(props.id, props.name, props.brand, props.image_link, props.description) }} className="button button__wishlist button__toggle">{props.button1Text}</button> : null}
            {props.loggedIn === true ? <button onClick={() => { props.addToKit(props.id, props.name, props.brand, props.image_link, props.description) }} className="button button__kit button__toggle">{props.button2Text}</button> : null}
            
            
        </div>
		);
}

export default Product;