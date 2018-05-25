import React from 'react';

const ProductList = (props) => {
    return (
        <ul className="product-list">
            {props.products.map((product, i) => {
                return (
                <li>
                    <Product 
                        brand={props.brand}
                        description={props.description}
                        id={props.id}
                        image_link={props.image_link}
                        price={props.price}
                    />
                </li>
                )
            })}
        </ul>
    )
}

export default ProductList;