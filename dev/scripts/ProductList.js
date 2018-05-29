import React from 'react';
import Product from './Product';

const ProductList = (props) => {
    return (
        <div>
            {props.loggedIn !== true ? 
            <div>
                <h3>Too Add Products To Your List Or Kit, Please Log In</h3>
            </div>
            : null} 
            <ul className="product-list clearfix">
                {props.products.map((product, i) => {
                    return (
                    <li className="product_li" key={product.id}>
                    <Product 
                        brand={product.brand}
                        description={product.description}
                        id={product.id}
                        image_link={product.image_link}
                        name={product.name}
                        // product_colors={product.product_colors}
                        // product_link={product.product_link}
                        currentUserId={props.currentUserId}
                        addToWishlist={props.addToWishlist}
                        addToKit={props.addToKit}
                        button1Handler={props.button1Handler}
                        button2Handler={props.button2Handler}
                        button1Text={props.button1Text}
                        button2Text={props.button2Text}
                        loggedIn={props.loggedIn}
                    />
                    </li>
                    )
                })}
            </ul>
        
    </div>
    )
}

export default ProductList;