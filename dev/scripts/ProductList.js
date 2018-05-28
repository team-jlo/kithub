import React from 'react';
import Product from './Product';

const ProductList = (props) => {
    return (
        <ul className="product-list">
            {props.products.map((product, i) => {
                return (
                <li key={product.id}>
                <Product 
                    brand={product.brand}
                    description={product.description}
                    id={product.id}
                    image_link={product.image_link}
                    name={product.name}
                    price={product.price}
                    currentUserId={props.currentUserId}
                    addToWishlist={props.addToWishlist}
					addToKit={props.addToKit}
					button1Text={props.button1Text}
					button2Text={props.button2Text}
                />
                </li>
                )
            })}
        </ul>
    )
}

export default ProductList;