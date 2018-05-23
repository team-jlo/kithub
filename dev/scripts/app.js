import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase';
import axios from 'axios';
import {
	BrowserRouter as Router,
	Route, Link, NavLink
} from 'react-router-dom';



class App extends React.Component {
	componentDidMount(){

	}
  render() {
    return (
      <div>
        Hello
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
