import App from '../components/App';
import Home from '../components/home';
import About from '../components/about';

import nav from './nav';
import form from './form';
import common from './common'

const routes = {
  path: window.appConf.contextPath,
  component: App,
  indexRoute: {
    component: Home
  },
  childRoutes: [
    {path: 'home', component: Home},
    {path: 'about', component: About},
    nav,
    form,
    common
  ]
}
export default routes;