import React from 'react';
import ReactDOM from 'react-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import { AppContainer } from 'react-hot-loader';

import './config';
import AppMain from './AppMain';

const history = createBrowserHistory();

const render = (Component) => {
	ReactDOM.render(
		<AppContainer>
			<Component history={history}></Component>
		</AppContainer>,
		document.getElementById('reactapp')
	);
};

render(AppMain);

if (module.hot) {
	module.hot.accept('./AppMain', () => {
		render(AppMain)
	});
}