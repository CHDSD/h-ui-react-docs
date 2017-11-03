import Nav from '../../components/Nav';
import Menu from '../../components/Nav/menu';

const routes = {
  path: 'nav',
  component: Nav,
  childRoutes: [
    {path: 'menu', component: Menu}
  ]
}
export default routes;