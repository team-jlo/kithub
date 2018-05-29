import React from 'react';
import Product from './Product';

const ProductList = (props) => {
    return (

        <div>
            {props.loggedIn !== true ? 
            <div>
                <h3>Please log in to save products to your lists</h3>
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
                    currentUserId={props.currentUserId}
                    button1Handler={props.button1Handler}
                    button2Handler={props.button2Handler}
                    button1Text={props.button1Text}
                    button2Text={props.button2Text}
                    loggedIn={props.loggedIn}
                    context={props.context}
                    />
                    </li>
                    )
                })}
            </ul>
        
    </div>
    )
}

export default ProductList;