import React from 'react';
import { Router, Route } from 'react-router-dom';
import App from './components/App';

export default class AppMain extends React.Component {
	render() {
		return (
			<Router history={this.props.history}>
        <Route path={""} component={App}></Route>
      </Router>
		);
	}
}
