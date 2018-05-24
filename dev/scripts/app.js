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
        { name: "Blush", value: 'blush' },
        { name: "Bronzer", value: 'bronzer' },
        { name: 'Eyebrow', value: 'eyebrow' },
        { name: 'Eyeliner', value: 'eyeliner' },
        { name: 'Eyeshadow', value: 'eyeshadow' },
        { name: 'Foundation', value: 'foundation' },
        { name: 'Lip Liner', value: 'lip_liner' },
        { name: 'Lipstick', value: 'lipstick' },
        { name: 'Mascara', value: 'mascara' },
        { name: 'Nail Polish', value: 'nail_polish'}
      ],
      selectedProductType: 'mascara',
      searchQuery: '',
      queryResults: []
  }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

	componentDidMount(){
  }
  
  handleChange(e) {    
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
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
        queryResults: res.data
      })
    });

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
          <input type="text" name="searchQuery" value={this.state.searchQuery} placeholder="Search for a thing" />
          <input type="submit" value="submit" />
        </form>
      </div>;
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
