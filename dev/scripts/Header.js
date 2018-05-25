import React from 'react';
import {
	BrowserRouter as Router,
	Route, Link, NavLink
} from 'react-router-dom';


const Header = () => {
	return(
		<div>
			<header>
				<h1> KitHub</h1>
				<nav>
					<NavLink>Wishlist</NavLink>
					<NavLink>My Kit</NavLink>
				</nav>
			</header>
		</div>
	)
} 


export default Header