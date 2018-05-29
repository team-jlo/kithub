import React from 'react';
import {
	BrowserRouter as Router,
	Route, Link, NavLink
} from 'react-router-dom';


const Header = (props) => {
	return(
    <header>
        <h1>
            <span>Kit</span>Hub
        </h1>
        <nav className="main-nav">
				<ul>
					<li className="login">
						{props.loggedIn === false && <button onClick={props.loginWithGoogle} className="button">Login with Google</button>}
						{props.loggedIn === true ? <button onClick={props.logout}>Logout</button> : null}
					</li>

					<li><NavLink to="/">Home </NavLink> </li>
					<li><NavLink to="/my-wishlist" >Wishlist</NavLink></li>
					<li><NavLink to="/my-kit">My Kit</NavLink></li>
				</ul>
			
        </nav>

    </header>

	)
}

export default Header;
