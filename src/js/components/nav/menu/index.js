import React from 'react';
import SideMenu from '../../h-ui/SideMenu';


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

const code = `
import SideMenu from '../../h-ui/SideMenu';

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

class Demo extends React.Component {
  render() {
    return (
      <SideMenu data={menuData}></SideMenu>
    );
  }
}
`;


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