import React, { Component } from 'react';
import Nav from './Nav';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import Map from './Map'
import HeroSection from './HeroSection'
// import './App.css';


class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
		displayed_form: '',
		logged_in: localStorage.getItem('token') ? true : false,
		username: ''
		};
	}

	componentDidMount() {
		if (this.state.logged_in) {
		fetch('http://localhost:8000/core/current_user/', {
			headers: {
			Authorization: `JWT ${localStorage.getItem('token')}`
			}
		})
			.then(res => res.json())
			.then(json => {
			this.setState({ username: json.username });
			});
		}
	}

	handle_login = (e, data) => {
		e.preventDefault();
		fetch('http://localhost:8000/token-auth/', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
		})
		.then(res => res.json())
		.then(json => {
			localStorage.setItem('token', json.token);
			this.setState({
			logged_in: true,
			displayed_form: '',
			username: json.user.username
			});
		});
	};

	handle_signup = (e, data) => {
		e.preventDefault();
		fetch('http://localhost:8000/core/users/', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
		})
		.then(res => res.json())
		.then(json => {
			localStorage.setItem('token', json.token);
			this.setState({
			logged_in: true,
			displayed_form: '',
			username: json.username
			});
		});
	};

	handle_logout = () => {
		localStorage.removeItem('token');
		this.setState({ logged_in: false, username: '' });
	};

	display_form = form => {
		this.setState({
		displayed_form: form
		});
	};

	render() {
		let form;
		switch (this.state.displayed_form) {
		case 'login':
			form = <LoginForm handle_login={this.handle_login} />;
			break;
		case 'signup':
			form = <SignupForm handle_signup={this.handle_signup} />;
			break;
		default:
			form = null;
    }


    return (
		<div className="App">
			<Nav
			logged_in={this.state.logged_in}
			display_form={this.display_form}
			handle_logout={this.handle_logout}
			/>
			{form}
			<HeroSection></HeroSection>
			<h3>
			{this.state.logged_in
				? <Map></Map>
				: 'Please Log In'}
			{/* <Map></Map> */}
			</h3>
		</div>
		);
	}
}

export default App;

// import React from "react";
// import './App.css';
// import Navbar from "./Navbar";
// import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// import Home from './pages/home';
// import SignUp from './pages/signup';
// import LogIn from './pages/login';


// function App() {
// 	return (
// 		<Router>
// 			<Navbar />
// 			<Switch>
// 				<Route path="/" exact component={Home} />
// 				<Route path="/login" component={LogIn} />
// 				<Route path="/sign-up" component={SignUp} />
// 			</Switch>
// 		</Router>
// 	);
// }

// export default App;

