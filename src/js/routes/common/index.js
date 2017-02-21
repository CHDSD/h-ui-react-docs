import Common from '../../components/common';
import Pagination from '../../components/common/pagination';
import Tabs from '../../components/common/tabs';
import Popup from '../../components/common/popup';


const routes = {
  path: 'common',
  component: Common,
  childRoutes: [
    {path: 'pagination', component: Pagination},
    {path: 'tabs', component: Tabs},
    {path: 'popup', component: Popup}
  ]
}
export default routes;