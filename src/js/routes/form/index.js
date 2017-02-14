import Form from '../../components/form';
import Calendar from '../../components/form/calendar';

const routes = {
  path: 'form',
  component: Form,
  childRoutes: [
    {path: 'calendar', component: Calendar}
  ]
}
export default routes;