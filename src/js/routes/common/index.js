import Common from '../../components/common';
import Pagination from '../../components/common/pagination';
import Tabs from '../../components/common/tabs';
import Popup from '../../components/common/popup';
import DropList from '../../components/common/dropList';
import Form from '../../components/common/Form';


const routes = {
	path: 'common',
	component: Common,
	childRoutes: [{
		path: 'pagination',
		component: Pagination
	}, {
		path: 'tabs',
		component: Tabs
	}, {
		path: 'popup',
		component: Popup
	}, {
		path: 'dropList',
		component: DropList
	}, {
		path: 'form',
		component: Form
	}]
}
export default routes;