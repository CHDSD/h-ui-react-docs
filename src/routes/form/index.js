import Form from '../../components/Form';
import Calendar from '../../components/Form/calendar';
import DemoSwitch from '../../components/Form/switch';

const routes = {
  path: 'form',
  component: Form,
  childRoutes: [
    {path: 'calendar', component: Calendar},
    {path: 'switch', component: DemoSwitch}
  ]
}
export default routes;