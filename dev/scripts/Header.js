import React from 'react';
import {
	BrowserRouter as Router,
	Route, Link, NavLink
} from 'react-router-dom';


const Header = (props) => {
	return(
    <header>
        <h1>
			<img src="images/kithub-logo.png" alt="Kithub" />
        </h1>
        <nav className="main-nav clearfix">
				<ul className="clearfix">

					<li><NavLink exact to="/" activeClassName="active">Home </NavLink> </li>
					<li><NavLink to="/my-kit" activeClassName="active">My Kit</NavLink></li>
					<li><NavLink to="/my-wishlist" activeClassName="active">Wishlist</NavLink></li>
					<li className="login">
						{props.loggedIn === false && <button onClick={props.loginWithGoogle} className="link--button">Login with Google</button>}
						{props.loggedIn === true ? <button className="link--button" onClick={props.logout}>Logout</button> : null}
					</li>
				</ul>
			
        </nav>

    </header>

	)
}

export default Header;
