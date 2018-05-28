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
      currentUserName: '',
      // Orry added this in
      currentUser: '',
      loggedIn: false

  }
    this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
    this.setCategory = this.setCategory.bind(this);
		this.loginWithGoogle = this.loginWithGoogle.bind(this);
		this.addToWishlist = this.addToWishlist.bind(this);	
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
            this.setState({
              loggedIn: true,
              currentUser: loggedInUser,
              currentUserId: loggedInUser.userId
            });
            this.dbRefUser = dbRefUser;
          }
          else {
            console.log('new user created');
            // *** changed const to a let ***
            let loggedInUser = {
              userId: user.uid,
              userName: user.displayName,
							wishKitArray: []
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
          currentUser: null
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
		// console.log('calling get products', queryResults.length);

		if(this.state.categoryToDisplay === 'All'){
			
			productsWithCurrentCategory.push(...queryResults);
		} else{

			for (let i = 0; i < queryResults.length; i++){	
				if(queryResults[i].category === this.state.categoryToDisplay.replace(/\s/g, '_').toLowerCase() ){
						// console.log(queryResults[i]);
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
	}

	addToWishlist(productId) {
    let dbRefUser = firebase.database().ref(`users/${this.state.currentUserId}`);
    let dbRefWishKitArray = firebase.database().ref(`users/${this.state.currentUserId}/wishKitArray/${productId}`);

    
		dbRefUser.once('value').then((snapshot) => {

      let inWishKit = snapshot.child('wishKit').exists()
			if (inWishKit === false) {
        const newWishKit = {
          productId: productId,
          inWishList: true
        }
        dbRefWishKitArray.set(newWishKit);
        
        console.log('wishkit doesnt exist')
			}
      else { 
        let wishKit = snapshot.val().wishKit
        const wishKitArray = Object.values(wishKit)
        
        
          if (wishKitArray.indexOf(productId) === -1) {
            console.log('its not in the array')
            dbRefUser.child("wishKit").push(productId)
          }
			}
		});
  }
  
  addToKit() {

  }
	// will check to see if this item is 1) in user's wishKit 2) if it is, then does if have a wishList property of true.
	// if in wishKit, change property.. if not, push to array. 

	// if(item with this product id is NOT in wishkit ){
	// dbRefUser.wishKit.push( whole object plus inwishList property : true)
	// } else if { it's IN wishKit already, change inWishlist property from false to true

//	} else if {
	// return true
// }


  render() {
    return (
			<div className="wrapper">
					<Header />
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
						<ProductList products={this.state.productsToDisplay}
												currentUserId={this.state.currentUserId}
												addToWishlist={this.addToWishlist}/>
					</div>
					<Footer/>
			</div>
		)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
