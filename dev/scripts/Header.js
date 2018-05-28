import React from 'react';
import {
	BrowserRouter as Router,
	Route, Link, NavLink
} from 'react-router-dom';


const Header = () => {
	return(
    <header>
        <h1>
            <span>Kit</span>Hub
        </h1>
        <nav className="main-nav">
				<ul>
					<li>
						Sign-In
					</li>
					<li>Wishlist</li>
					<li>My Kit</li>
					{/* <li>
						<NavLink to="/sign-in">Sign In</NavLink>
					</li>
					<li><NavLink to="/wishlist" >Wishlist</NavLink></li>
					<li><NavLink to="myKit" >My Kit</NavLink></li> */}
				</ul>
				
	
        </nav>
    </header>

	)
}

export default Header;
