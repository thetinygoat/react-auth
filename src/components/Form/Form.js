import React, { Component } from 'react';
import axios from 'axios';

export default class Form extends Component {
	state = {
		signinView: false,
		signinData: {
			email: '',
			password: ''
		},
		signupData: {
			email: '',
			password: ''
		}
	};
	handleViewSwitch = () => {
		this.setState(state => {
			return {
				signinView: !state.signinView
			};
		});
	};
	handleSigninEmail = e => {
		let signinData = {
			...this.state.signinData,
			email: e.target.value
		};
		this.setState({
			signinData: signinData
		});
	};
	handleSigninpassword = e => {
		let signinData = {
			...this.state.signinData,
			password: e.target.value
		};
		this.setState({
			signinData: signinData
		});
	};
	handleSignUpEmail = e => {
		let signupData = {
			...this.state.signupData,
			email: e.target.value
		};
		this.setState({
			signupData: signupData
		});
	};
	handleSignUpPassword = e => {
		let signupData = {
			...this.state.signupData,
			password: e.target.value
		};
		this.setState({
			signupData: signupData
		});
	};
	handleSignUp = e => {
		e.preventDefault();
		const signupForm = {
			email: this.state.signupData.email.toString(),
			password: this.state.signupData.password.toString(),
			returnSecureToken: true
		};
		console.log(this.state.signupData.email);
		console.log(this.state.signupData.password);
		axios
			.post(
				'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyDwAJ6UXhUDgi_yV63CEz_Z7-TDm-8bWj8',
				signupForm
			)
			.then(res => {
				console.log(res.data);
			})
			.catch(err => {
				console.log(err);
			});
	};
	render() {
		let formView = null;
		if (this.state.signinView) {
			formView = (
				<div>
					<form>
						<input
							type="text"
							placeholder="eMail"
							onChange={this.handleSigninEmail}
							value={this.state.signinData.email}
						/>
						<input
							type="password"
							placeholder="Password"
							onChange={this.handleSigninpassword}
							value={this.state.signinData.password}
						/>
						<button>Signin</button>
					</form>
				</div>
			);
		} else {
			formView = (
				<div>
					<form onSubmit={this.handleSignUp}>
						<input
							type="text"
							placeholder="eMail"
							onChange={this.handleSignUpEmail}
							value={this.state.signupData.email}
						/>
						<input
							type="password"
							placeholder="Password"
							onChange={this.handleSignUpPassword}
							value={this.state.signupData.password}
						/>
						<button>Signup</button>
					</form>
				</div>
			);
		}
		return (
			<div>
				{formView}
				<button onClick={this.handleViewSwitch}>
					{!this.state.signinView ? ' switch to signin' : 'switch to signup'}
				</button>
			</div>
		);
	}
}
