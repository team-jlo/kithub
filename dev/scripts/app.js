import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase';
import axios from 'axios';
import {
	BrowserRouter as Router,
	Route, Link, NavLink
} from 'react-router-dom';
import ProductList from './ProductList';
import Header from './Header';
import Footer from './Footer';
import Home from './Home';


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
        { name: "Blush", value: 'blush', categories: ['-- Select Product Type --','All'] },
        { name: "Bronzer", value: 'bronzer', categories: ['-- Select Product Type --','All'] },
        { name: 'Eyebrow', value: 'eyebrow', categories: ['-- Select Product Type --','All'] },
        { name: 'Eyeliner', value: 'eyeliner', categories: ['-- Select Product Type --','All','Liquid', 'Pencil', 'Gel', 'Cream'] },
        { name: 'Eyeshadow', value: 'eyeshadow', categories: ['-- Select Product Type --','All','Palette', 'Pencil'] },
        { name: 'Foundation', value: 'foundation', categories: ['-- Select Product Type --','All','Liquid', 'Contour', 'Bb cc', 'Concealer', 'Cream', 'Mineral', 'Powder', 'Highlighter'] },
        { name: 'Lip Liner', value: 'lip_liner', categories: ['-- Select Product Type --','All'] },
        { name: 'Lipstick', value: 'lipstick', categories: ['-- Select Product Type --','All','Lipstick', 'Lip Gloss', 'Liquid', 'Lip Stain'] },
        { name: 'Mascara', value: 'mascara', categories: ['-- Select Product Type --','All'] },
        { name: 'Nail Polish', value: 'nail_polish', categories: ['-- Select Product Type --','All'] }
      ],
      isProductTypeSelected: false,
      selectedProductType: '',
      selectedProductCategories: [],
      searchQuery: '',
			queryResults: [],
			productsToDisplay: [],
      categoryToDisplay: '',
      currentUserId: '',
      currentUser: '',
			loggedIn: false,
			displayAddToWishlist: true,
			displayAddToKit: true,
      displayRemove: true,
      currentUserWishlist: [],
      currentUserKit: []
  }

    this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
    this.setCategory = this.setCategory.bind(this);
		this.loginWithGoogle = this.loginWithGoogle.bind(this);
    this.addToWishlist = this.addToWishlist.bind(this);	
    this.addToKit = this.addToKit.bind(this);
    this.removeProduct = this.removeProduct.bind(this);
  }

  componentDidMount() {
    this.dbRef = firebase.database().ref('users');

    firebase.auth().onAuthStateChanged((user) => {
      if (user !== null) {
        let dbRefUser = firebase.database().ref('users/' + user.uid);
				
				// checks to see if current user exists; if not, creates user
        dbRefUser.on('value', (snapshot) => {
          if (snapshot.exists()) {
            let loggedInUser = snapshot.val();
            let loggedInUserKit = loggedInUser.kit || {};
            let loggedInUserWishlist = loggedInUser.wishList || {};
            let loggedInUserWishlistArray = Object.values(loggedInUserWishlist);
            let loggedInUserKitArray = Object.values(loggedInUserKit);

            this.setState({
              loggedIn: true,
              currentUser: loggedInUser,
              currentUserId: loggedInUser.userId,
              currentUserWishlist: loggedInUserWishlistArray,
              currentUserKit: loggedInUserKitArray
            }, () => { console.log(this.state.currentUserWishlist, this.state.currentUserKit)});
            this.dbRefUser = dbRefUser;
          }
          else {
            console.log('new user created');
            let loggedInUser = {
              userId: user.uid,
              userName: user.displayName,
            }
          this.setState({
            loggedIn: true,
            currentUser: loggedInUser,
            currentUserId: loggedInUser.userId
          })
          dbRefUser.set(loggedInUser);
          console.log(loggedInUser)
          }
        })
      }
      else {
        this.setState({
          loggedIn: false,
          currentUser: null,
          currentUserKit: [],
          currentUserWishlist: []
        })
      } 
    })
  }
  loginWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)
      .then((user) => {
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
  
  handleChange(e) {    
    this.setState({ 
      [e.target.name]: e.target.value,
      isProductTypeSelected: true
    }, () => {
      this.getResultsByProductType();
    }); 
  }

  removeProduct(productId, productList, productName, productBrand, productImage) {
    console.log(`removing ${productId}`);
    firebase.database().ref(`users/${this.state.currentUserId}/${productList}/${productId}`).remove();
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
    })
  }
  
	getCategory() {
		let products = this.state.productTypes;	
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

		if(this.state.categoryToDisplay === 'All'){
			
			productsWithCurrentCategory.push(...queryResults);
		} else{

			for (let i = 0; i < queryResults.length; i++){	
				if(queryResults[i].category === this.state.categoryToDisplay.replace(/\s/g, '_').toLowerCase() ){
							productsWithCurrentCategory.push(queryResults[i]);
					}
				}
		}
		this.setState(
			{ productsToDisplay : productsWithCurrentCategory }
		)
	}
	handleSubmit(e) {
    e.preventDefault();
    this.getProducts()
  }
  
  addToWishlist(productId, productList, productName, productBrand, productImage) {
    console.log("adding to wishlist");
    let dbRefUser = firebase.database().ref(`users/${this.state.currentUserId}`);
    let dbRefWishList = firebase.database().ref(`users/${this.state.currentUserId}/wishList/${productId}`);

    const newWishListItem = {
      id: productId,
      name: productName,
      image_link: productImage,
      brand: productBrand,
			// product_colors: productColors,
			// product_link: productLink
    }
    dbRefWishList.set(newWishListItem);
  }
  
  addToKit(productId, productList, productName, productBrand, productImage) {
    console.log("adding to kit");
    let dbRefUser = firebase.database().ref(`users/${this.state.currentUserId}`);
    let dbRefKit = firebase.database().ref(`users/${this.state.currentUserId}/kit/${productId}`);

    const newKitItem = {
      id: productId,
      name: productName,
      image_link: productImage,
			brand: productBrand,
			// product_colors: productColors,
			// product_link: productLink
    }
    dbRefKit.set(newKitItem);
  }

  render() {
    return (
			<Router>
        <div className="wrapper">
					<Header 
            loggedIn={this.state.loggedIn}
            loginWithGoogle={this.loginWithGoogle}
            logout={this.logout}
          />

          <Route path="/" exact render={() => 
            <Home
              handleSubmit={this.handleSubmit}
              selectedProductType={this.state.selectedProductType}
              handleChange={this.handleChange}
              productTypes={this.state.productTypes}
              isProductTypeSelected={this.state.isProductTypeSelected}
              setCategory={this.setCategory}
							selectedProductCategories={this.state.selectedProductCategories}
							products={this.state.productsToDisplay}
							currentUserId={this.state.currentUserId}
              button1Text={"Add to wishlist"}
							button1Handler={this.addToWishlist}
              button2Text={"Add to kit"}
              button2Handler={this.addToKit}
              loggedIn={this.state.loggedIn}
              context={"products"}
            /> 
          }/>
					<Route path="/my-wishlist" render={() => 
					<ProductList
              products={this.state.currentUserWishlist}
              currentUserId={this.state.currentUserId}
              button1Text={"Remove from wishlist"}
              button1Handler={this.removeProduct}
              button2Text={"Add to kit"}
              button2Handler={this.addToKit}
              loggedIn={this.state.loggedIn}
              context={"wishList"}
					/> } />

					<Route path="/my-kit" render={() =>
						<ProductList
              products={this.state.currentUserKit}
              currentUserId={this.state.currentUserId}
              button1Text={"Add to wishlist"}
              button1Handler={this.removeProduct}
              button2Text={"Remove from kit"}
              button2Handler={this.addToKit}
              loggedIn={this.state.loggedIn}
              context={"kit"}
						/>} />

          <Route path="/" exact render={() =>
            <ProductList
              products={this.state.productsToDisplay}
              currentUserId={this.state.currentUserId}
							button1Text={"Add to wishlist"}
              button1Handler={this.addToWishlist}
              button2Text={"Add to kit"}
							button2Handler={this.addToKit}
              loggedIn={this.state.loggedIn}
              context={"products"}
            />
          }/>
					
					<Footer/>
			  </div> 
      </Router>
		)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
