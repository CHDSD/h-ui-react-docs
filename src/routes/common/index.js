import Common from '../../components/General';
import Pagination from '../../components/General/pagination';
import Tabs from '../../components/General/tabs';
import Popup from '../../components/General/popup';
import DropList from '../../components/General/dropList';
import Form from '../../components/General/Form';
import DateSection from '../../components/General/dateSection';
import Transfer from '../../components/General/Transfer';

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
	}, {
		path: 'dateSection',
		component: DateSection
	}, {
		path: 'transfer',
		component: Transfer
	}]
}
export default routes;