import React from 'react';
import firebase from 'firebase';
import Colorset from './ColorSet';


const Product = (props) => {
    return (
        <div className="product" data-id={props.id}>
            <h3 className="product__headline">
                <span className="product__brand">
                    {props.brand}
                </span>
                <span className="product__name">
						<a href="#">{props.name}</a>
                </span>
            </h3>

		    <div className="product__image--container">
                <img src={props.image_link} alt={props.name} className="product__image" />
            </div>	
					
            <div className="buttons">
                {props.loggedIn === true ? <button onClick={() => { props.button1Handler(props.id, props.context, props.name, props.brand, props.image_link ) }} className="button button__wishlist button__toggle">{props.button1Text}</button> : null}
						
               {props.loggedIn === true ? <button onClick={() => { props.button2Handler(props.id, props.context, props.name, props.brand, props.image_link) }} className="button button__kit button__toggle">{props.button2Text}</button> : null}
            </div>
                        
        </div>
		);
}

export default Product;