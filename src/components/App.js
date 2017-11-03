import React from 'react';
import { Route, NavLink } from 'react-router-dom';
import { SideMenu } from './h-ui';
import menuData from '../constants/menuData';
import About from './About';
import Home from './Home';
import './style.scss';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    let search = window.location.search
    const { history } = this.props;
    search = search.replace(/^\?/, '').split('&');
    if (search.length) {
      console.log('search :', search);
      let redirect = search[0].split('=');
      if (redirect[0] === 'redirect' && redirect[1] === 'true') {
        let pathname = search[1].split('=')[1];
        pathname = decodeURIComponent(pathname);
        console.log('redirect to : ', pathname);
        history.replace(pathname);
      }
    }
  }

  // 菜单项被点击
  menuItemClk = (path) => {
    const { history } = this.props;
    console.log('item clk : ' + path);
    history.push(path);
  }

  render() {
    const props = this.props;
    const { match } = this.props;
    let rootRoutePath = window.AppConf.routeRootPath;
    return (
      <div>
        <div className="header">
          <NavLink activeClassName="active" to={`${rootRoutePath}home`}>首页</NavLink>
          <NavLink activeClassName="active" to={`${rootRoutePath}about`}>关于</NavLink>
          <a
            className="github-link"
            target="_blank"
            title="Github"
            href="https://github.com/CHDSD/h-ui-react-docs"><i className="fa-icon icon-github-circled"></i></a>
        </div>

        <div className="main-wrapper">
          <div className="menu-wrapper">
            <SideMenu
              curPath={props.location.pathname}
              data={menuData}
              itemClk={this.menuItemClk} ></SideMenu>
          </div>
          <div className="main-container">
            <Route path={`${match.path}about`} component={About}></Route>
            <Route path={`${match.path}home`} component={Home}></Route>
          </div>
        </div>
      </div>
    )
  }
}
export default App;