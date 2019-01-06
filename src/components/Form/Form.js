import React, { Component } from 'react';

export default class Form extends Component {
	state = {
		signinView: false
	};
	handleViewSwitch = () => {
		this.setState(state => {
			return {
				signinView: !state.signinView
			};
		});
	};
	render() {
		let formView = null;
		if (this.state.signinView) {
			formView = (
				<div>
					<form>
						<input type="text" placeholder="eMail" />
						<input type="password" placeholder="Password" />
						<button>Signin</button>
					</form>
				</div>
			);
		} else {
			formView = (
				<div>
					<form>
						<input type="text" placeholder="eMail" />
						<input type="password" placeholder="Password" />
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
