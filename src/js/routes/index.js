import App from '../components/App';
import Home from '../components/home';
import About from '../components/about';

import nav from './nav';

const routes = {
  path: window.appConf.contextPath,
  component: App,
  indexRoute: {
    component: Home
  },
  childRoutes: [
    {path: 'home', component: Home},
    {path: 'about', component: About},
    nav
  ]
}
export default routes;