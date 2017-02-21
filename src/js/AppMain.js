import React from 'react';
import { Router, browserHistory } from 'react-router';

import './config';
import routes from './routes';

export default class AppMain extends React.Component {
	render() {
		return (
			<Router history={browserHistory} routes={routes}></Router>
		);
	}
}
