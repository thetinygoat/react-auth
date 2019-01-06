import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

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
		},
		idToken: null,
		localId: null,
		loading: false
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
				this.setState(
					{
						...this.state,
						signinData: { ...this.state.signinData },
						signupData: { ...this.state.signupData },
						idToken: res.data.idToken,
						localId: res.data.localId,
						loading: false
					},
					() => {
						console.log(this.state);
					}
				);
			})
			.catch(err => {
				console.log(err);
			});
	};
	handleSignIn = e => {
		e.preventDefault();
		this.setState(state => {
			return {
				loading: !state.loading
			};
		});
		const signupForm = {
			email: this.state.signinData.email.toString(),
			password: this.state.signinData.password.toString(),
			returnSecureToken: true
		};
		axios
			.post(
				'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyDwAJ6UXhUDgi_yV63CEz_Z7-TDm-8bWj8',
				signupForm
			)
			.then(res => {
				this.setState(
					{
						...this.state,
						signinData: { ...this.state.signinData },
						signupData: { ...this.state.signupData },
						idToken: res.data.idToken,
						localId: res.data.localId,
						loading: false
					},
					() => {
						console.log(this.state);
					}
				);
			})
			.catch(err => {
				console.log(err.message);
			});
	};
	render() {
		let formView = null;
		if (this.state.signinView) {
			formView = (
				<div>
					<form onSubmit={this.handleSignIn}>
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
		let redirect = null;
		if (this.state.idToken !== null) {
			redirect = <Redirect to="/secret" />;
		}
		return (
			<div>
				{redirect}
				{this.state.loading ? 'loading...' : formView}
				<button onClick={this.handleViewSwitch}>
					{!this.state.signinView ? ' switch to signin' : 'switch to signup'}
				</button>
			</div>
		);
	}
}
