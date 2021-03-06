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
            {
                props.products.length > 0 ? 
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
																				product_link={product.product_link}
                                        currentUserId={props.currentUserId}
                                        button1Text={props.button1Text}
                                        button1Handler={props.button1Handler}
                                        button1Context={props.button1Context}
                                        button2Handler={props.button2Handler}
                                        button2Text={props.button2Text}
                                        button2Context={props.button2Context}
                                        loggedIn={props.loggedIn}
                                        // context={props.context}
                                    />
                                </li>
                            )
                        })}
                    </ul>
                : <p className="products-no-results">No products to display yet</p>
            }

                
        
              
    </div>
    )
}

export default ProductList;