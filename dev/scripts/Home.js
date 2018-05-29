import React from 'react';
import ProductList from './ProductList';

const Home = (props) => {
    return (

		<div className="home">
				<p className="intro">Search for makeup products by type and category, and keep track of your favourites! Add products you own to your makeup Kit, and save coveted cosmetics to your Wishlist!</p>

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
            
		</div>
    )
}

export default Home;