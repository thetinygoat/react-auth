import React from 'react';
import { Route, NavLink } from 'react-router-dom';
import Form from '../Form/Form';
import SecretPage from '../SecretPage/SecretPage';

const nav = () => {
	return (
		<div>
			<Route path="/" exact component={Form} />
			<Route path="/secret" component={SecretPage} />
		</div>
	);
};

export default nav;
