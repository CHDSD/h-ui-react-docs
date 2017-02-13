import React from 'react';
import { Link, browserHistory } from 'react-router';
import { SideMenu } from './h-ui';
import menuData from '../constants/menuData';
import './style.scss';

class App extends React.Component {
  constructor(props) {
    super(props);
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
          <Link activeClassName="active" to={contextPath +"/info"}>信息</Link>
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