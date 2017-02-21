import React from 'react';
import ReactDOM from 'react-dom';

import { AppContainer } from 'react-hot-loader';
import AppMain from './AppMain';

const render = (Component) => {
	ReactDOM.render(
		<AppContainer>
			<Component></Component>
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