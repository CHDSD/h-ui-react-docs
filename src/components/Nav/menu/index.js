import React from 'react';
import SideMenu from '../../h-ui/SideMenu';

const code = `
/**
 * 导航菜单组件
 * 组件可传入属性
 * 
 * data Array 必须 菜单数据对象数组，数组中的每个对象应当包含name, id字段，可选class和child字段。
 * curPath string 可选  指定菜单当前选中子项的路径，(e.g., '/nav/menu')。
 * 
 */

import SideMenu from '../../h-ui/SideMenu';

// 菜单数据对象数组
const menuData = [
  {
    name: '导航-1',
    id: 'dh1',
    class: 'aaa',
    child: [
      {
        name: '导航1-1',
        id: 'dh1-1',
        class: ''
      },
      {
        name: '导航1-2',
        id: 'dh1-2',
        class: '',
        child: [
          {
            name: '导航1-2-1',
            id: 'dh1-2-1',
            class: ''
          }
        ]
      }
    ]
  },
  {
    name: '导航-2',
    id: 'dh2',
    class: '',
    child: [
      {
        name: '导航-2-1',
        id: 'dh2-1',
        class: ''
      }
    ]
  }
];

// 示例
class Demo extends React.Component {
  render() {
    return (
      <SideMenu data={menuData}></SideMenu>
    );
  }
}
`;

const menuData = [
  {
    name: '导航-1',
    id: 'dh1',
    class: 'aaa',
    child: [
      {
        name: '导航1-1',
        id: 'dh1-1',
        class: ''
      },
      {
        name: '导航1-2',
        id: 'dh1-2',
        class: '',
        child: [
          {
            name: '导航1-2-1',
            id: 'dh1-2-1',
            class: ''
          }
        ]
      }
    ]
  },
  {
    name: '导航-2',
    id: 'dh2',
    class: '',
    child: [
      {
        name: '导航-2-1',
        id: 'dh2-1',
        class: ''
      }
    ]
  }
];

class Menu extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.refs.code.innerText = code;
    var _t = this;
    hljs.highlightBlock(_t.refs.code);
    // setTimeout(function () {
    //   // hljs.initHighlighting();
    // }, 200)
  }

  render() {
  	return (
  		<div className="menu">
        <p>菜单(Menu)组件：</p>
        <div style={{width: '300px'}}>
          <SideMenu data={menuData}></SideMenu>
        </div>

        <p>示例代码：</p>
        <div>
          <pre>
            <code ref="code" className="js"></code>
          </pre>
        </div>
  		</div>
		);
  }
}

export default Menu;