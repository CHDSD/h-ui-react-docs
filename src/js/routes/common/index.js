import Common from '../../components/common';
import Pagination from '../../components/common/pagination';

const routes = {
  path: 'common',
  component: Common,
  childRoutes: [
    {path: 'pagination', component: Pagination}
  ]
}
export default routes;