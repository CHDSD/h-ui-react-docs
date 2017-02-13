import Nav from '../../components/nav';
import Menu from '../../components/nav/menu';

const routes = {
  path: 'nav',
  component: Nav,
  childRoutes: [
    {path: 'menu', component: Menu}
  ]
}
export default routes;