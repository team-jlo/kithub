import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase';
import axios from 'axios';
import {
	BrowserRouter as Router,
	Route, Link, NavLink
} from 'react-router-dom';
import ProductList from './ProductList';

const config = {
  apiKey: "AIzaSyCqf-B49wkmM2dxSkJoOR1uwF0lfypU-vw",
  authDomain: "kithub-aa9f5.firebaseapp.com",
  databaseURL: "https://kithub-aa9f5.firebaseio.com",
  projectId: "kithub-aa9f5",
  storageBucket: "",
  messagingSenderId: "321165294365"
};
firebase.initializeApp(config);

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
      currentUserId: '',
      currentUserFirebaseId: '',
      currentUserName: '',
      loggedIn: false

  }
    this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
    this.setCategory = this.setCategory.bind(this);
    this.loginWithGoogle = this.loginWithGoogle.bind(this);
  }

  componentDidMount() {
    this.dbRef = firebase.database().ref('users');

    firebase.auth().onAuthStateChanged((user) => {
      if (user !== null) {
        // let currentUser = firebase.auth().currentUser;
        let dbRefUser = firebase.database().ref('users/' + user.uid);
        
        this.dbRef.on('value', (snapshot) => {
          if (snapshot.exists()) {
            let loggedInUser = snapshot.val();
            this.setState({
              loggedIn: true,
              currentUser: loggedInUser
            });
            this.dbRefUser = dbRefUser;
          }
          else {
            console.log('new user created');
            const loggedInUser = {
              userId: user.uid,
              userName: user.displayName
            }
          this.setState({
            loggedIn: true,
            currentUser: loggedInUser
          })
          dbRefUser.set(loggedInUser);
          }
        })
      }
      else {
        this.setState({
          loggedIn: false,
          currentUser: null
        })
      } 
    })
  }


  loginWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)
      .then((user) => {
        // this.dbRef.push({ userId: this.state.currentUserId, userName: this.state.currentUserName });
        console.log(user);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  logout() {
    firebase.auth().signOut();
    this.dbRef.off('value');
  }

  checkIfCurrentUserExists(snapshot) {
    let currentUser = this.state.currentUserId;

    const data = snapshot.val();
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
		console.log('calling get products', queryResults.length);

		if(this.state.categoryToDisplay === 'All'){
			
			productsWithCurrentCategory.push(...queryResults);
		} else{

			for (let i = 0; i < queryResults.length; i++){	
				if(queryResults[i].category === this.state.categoryToDisplay.replace(/\s/g, '_').toLowerCase() ){
						console.log(queryResults[i]);
							productsWithCurrentCategory.push(queryResults[i]);
				
					}
				}
		}

		console.log(productsWithCurrentCategory.length);

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
        <div className="login">
          {this.state.loggedIn === false && <button onClick={this.loginWithGoogle}>Login with Google</button>}
          {this.state.loggedIn === true ? <button onClick={this.logout}>Logout</button> : null}
        </div>
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
        <ProductList products={this.state.productsToDisplay} />
      </div>
		)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
