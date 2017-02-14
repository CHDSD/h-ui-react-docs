import React from 'react';
import { Link, browserHistory } from 'react-router';
import { SideMenu } from './h-ui';
import menuData from '../constants/menuData';
import './style.scss';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    let search = window.location.search
    search = search.replace(/^\?/, '').split('&');
    if (search.length) {
      console.log('search :', search);
      let redirect = search[0].split('=');
      if (redirect[0] === 'redirect' && redirect[1] === 'true') {
        let pathname = search[1].split('=')[1];
        pathname = decodeURIComponent(pathname);
        console.log('redirect to : ', pathname);
        browserHistory.replace(pathname);
      }
    }
  }

  // 菜单项被点击
  menuItemClk(path) {
    console.log('item clk : ' + path);
    browserHistory.push(path);
  }

  render() {
    let contextPath = window.appConf.contextPath.replace(/\/+$/, '');
    return (
      <div>
        <div className="header">
          <Link activeClassName="active" to={contextPath + "/home"}>首页</Link>
          <Link activeClassName="active" to={contextPath +"/about"}>关于</Link>
        </div>

        <div className="main-wrapper">
          <div className="menu-wrapper">
            <SideMenu 
              curPath={this.props.location.pathname} 
              data={menuData} 
              itemClk={this.menuItemClk} ></SideMenu>
          </div>
          <div className="main-container">
            {this.props.children}
          </div>
        </div>
      </div>
    )
  }
}
export default App;