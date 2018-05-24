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
        { name: "Blush", value: 'blush' },
        { name: "Bronzer", value: 'bronzer' },
        { name: 'Eyebrow', value: 'eyebrow' },
        { name: 'Eyeliner', value: 'eyeliner', categories: ['Liquid', 'Pencil', 'Gel', 'Cream'] },
        { name: 'Eyeshadow', value: 'eyeshadow', categories: ['Palette', 'Pencil'] },
        { name: 'Foundation', value: 'foundation', categories: ['Liquid', 'Contour', 'Bb cc', 'Concealer', 'Cream', 'Mineral', 'Powder', 'Highlighter'] },
        { name: 'Lip Liner', value: 'lip_liner' },
        { name: 'Lipstick', value: 'lipstick', categories: ['Lipstick', 'Lip Gloss', 'Liquid', 'Lip Stain'] },
        { name: 'Mascara', value: 'mascara' },
        { name: 'Nail Polish', value: 'nail_polish'}
      ],
      productTypeSelected: false,
      selectedProductType: '',
      selectedProductCategories: [],
      searchQuery: '',
      queryResults: [],

  }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

	componentDidMount(){
  }
  
  handleChange(e) {    
    this.setState({ 
      [e.target.name]: e.target.value,
      productTypeSelected: true
    }, () => {
      this.getResultsByProductType();
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    
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
      console.log(res.data);
      this.setState({
        queryResults: res.data,
      }, () => {
        this.getCategory()
      })
      
    });
  }

  getCategory() {
    let products = this.state.productTypes;
    console.log(products);

    for(let i = 0; i < products.length; i++){
      console.log(products[i].name);
        if (products[i].value === this.state.selectedProductType){
          this.setState({ 
            selectedProductCategories: products[i].categories
          }, () => {console.log(this.state.selectedProductCategories)})
        }
    }

  }

  render() {
    return <div>
        <form action="" onSubmit={this.handleSubmit}>
          <select name="selectedProductType" value={this.state.selectedProductType} onChange={this.handleChange}>
            {this.state.productTypes.map((productType, i) => {
              return <option value={productType.value} key={i}>
                  {productType.name}
                </option>;
            })}
          </select>
        {this.state.productTypeSelected === true ? 
          <select name="selectedCategory" value={this.state.selectedProductType.categories}>
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
      </div>;
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
