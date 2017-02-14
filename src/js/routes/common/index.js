import Common from '../../components/common';
import Pagination from '../../components/common/pagination';
import Tabs from '../../components/common/Tabs';

const routes = {
  path: 'common',
  component: Common,
  childRoutes: [
    {path: 'pagination', component: Pagination},
    {path: 'Tabs', component: Tabs}
  ]
}
export default routes;