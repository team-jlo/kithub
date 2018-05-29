import React from 'react';
import ProductList from './ProductList';

const Home = (props) => {
    return (

		<div className="home">
            {props.loggedIn !== true ? <h1>To Use This Feature, Please Log In :) </h1>
            : 
            <form action="" onSubmit={props.handleSubmit}>
                <select name="selectedProductType" value={props.selectedProductType} onChange={props.handleChange}>
                    {props.productTypes.map((productType, i) => {
                        return <option value={productType.value} key={i}>
                            {productType.name}
                        </option>;
                    })}
                </select>
                {props.isProductTypeSelected === true ?
                    <select onChange={props.setCategory} name="selectedCategory" value={props.selectedProductType.categories}>
                        {props.selectedProductCategories.map((category, i) => {
                            return (
                                <option value={category} key={i}>
                                    {category}
                                </option>
                            )
                        })}
                    </select>
                    : null}

                <input type="submit" value="Submit" />
            </form> 
            
            }
            {/* The closing bracket above closes the ternary operator */}
								
		</div>
    )
}

export default Home;