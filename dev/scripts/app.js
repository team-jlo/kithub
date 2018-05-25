import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase';
import axios from 'axios';
import {
	BrowserRouter as Router,
	Route, Link, NavLink
} from 'react-router-dom';



class App extends React.Component {
  constructor() {
    super();

    this.state = { 
      productTypes: [
        { name: "-- Select A Product --"},
        { name: "Blush", value: 'blush', categories: ['All'] },
        { name: "Bronzer", value: 'bronzer', categories: ['All'] },
        { name: 'Eyebrow', value: 'eyebrow', categories: ['All'] },
        { name: 'Eyeliner', value: 'eyeliner', categories: ['All','Liquid', 'Pencil', 'Gel', 'Cream'] },
        { name: 'Eyeshadow', value: 'eyeshadow', categories: ['All','Palette', 'Pencil'] },
        { name: 'Foundation', value: 'foundation', categories: ['All','Liquid', 'Contour', 'Bb cc', 'Concealer', 'Cream', 'Mineral', 'Powder', 'Highlighter'] },
        { name: 'Lip Liner', value: 'lip_liner', categories: ['All'] },
        { name: 'Lipstick', value: 'lipstick', categories: ['All','Lipstick', 'Lip Gloss', 'Liquid', 'Lip Stain'] },
        { name: 'Mascara', value: 'mascara', categories: ['All'] },
        { name: 'Nail Polish', value: 'nail_polish', categories: ['All'] }
      ],
      productTypeSelected: false,
      selectedProductType: '',
      selectedProductCategories: [],
      searchQuery: '',
			queryResults: [],
			productsToDisplay: [],
			categoryToDisplay: '',

  }
    this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.setCategory = this.setCategory.bind(this);
  }

  handleChange(e) {    
    this.setState({ 
      [e.target.name]: e.target.value,
      productTypeSelected: true
    }, () => {
      this.getResultsByProductType();
    });
  }

  getResultsByProductType() {
    axios({
      url: `https://makeup-api.herokuapp.com/api/v1/products.json`,
      method: "GET",
      responseType: "json",
      params: {
        product_type: `${this.state.selectedProductType}`
      }
    }).then(res => {
      this.setState({
        queryResults: res.data,
      }, () => {
        this.getCategory()
      })
    });
	}
	setCategory(e){
		this.setState({
			[e.target.name]: e.target.value,
				categoryToDisplay: e.target.value
		}, () => {
			this.getProducts();
		}  )
		

	}

	getCategory() {
		let products = this.state.productTypes;
		console.log(products);
		
    for(let i = 0; i < products.length; i++){
			
			if (products[i].value === this.state.selectedProductType){
				this.setState({ 
					selectedProductCategories: products[i].categories
				}); 
			}
    }

	}

getProducts(){
		const queryResults = Array.from(this.state.queryResults);
		let productsWithCurrentCategory = [];
		console.log('calling get products');

		for (let i = 0; i < queryResults.length; i++){	
			console.log(queryResults[i]);
			if (queryResults[i].category === this.state.categoryToDisplay.toLowerCase() ){
				productsWithCurrentCategory.push(queryResults[i]);
				} else {
					productsWithCurrentCategory = queryResults;
				}
			}

		console.log(productsWithCurrentCategory);

		this.setState(
			{ productsToDisplay : productsWithCurrentCategory }
		)
	

		}


	displayProducts(){
		console.log('display products');
	}
	handleSubmit(e) {
		e.preventDefault();
	}

  render() {
    return (
		<div>
        <form action="" onSubmit={this.handleSubmit}>
          <select name="selectedProductType" value={this.state.selectedProductType} onChange={this.handleChange}>
            {this.state.productTypes.map((productType, i) => {
              return <option value={productType.value} key={i}>
                  {productType.name}
                </option>;
            })}
          </select>
        {this.state.productTypeSelected === true ? 
          <select onChange={this.setCategory} name="selectedCategory" value={this.state.selectedProductType.categories}>
            {this.state.selectedProductCategories.map((category, i) => {
              return (
                <option value={category} key={i}> 
                  {category}
                </option>
              )
            })}
          </select> 
        : null  }
          
          <input type="submit" value="Submit" />
        </form>
      </div>
		)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
