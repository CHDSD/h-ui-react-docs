import Form from '../../components/form';
import Calendar from '../../components/form/calendar';
import DemoSwitch from '../../components/form/switch';

const routes = {
  path: 'form',
  component: Form,
  childRoutes: [
    {path: 'calendar', component: Calendar},
    {path: 'switch', component: DemoSwitch}
  ]
}
export default routes;