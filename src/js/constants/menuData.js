export default [
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
          },
          {
            name: '导航1-2-2',
            id: 'dh1-2-2',
            class: ''
          }
        ]
      },
      {
        name: '导航1-3',
        id: 'dh1-3',
        class: ''
      }
    ]
  },
  {
    name: '表单类组件',
    id: 'form',
    class: '',
    child: [
      {
        name: '日历',
        id: 'calendar',
        class: ''
      }
    ]
  },
  {
    name: '导航类组件',
    id: 'nav',
    class: 'nav',
    child: [
      {
        name: '菜单',
        id: 'menu',
        class: 'menu'
      }
    ]
  },
  {
    name: '公共类组件',
    id: 'common',
    class: 'common',
    child: [
      {
        name: '分页',
        id: 'pagination',
        class: ''
      },
      {
        name: 'Tabs切换',
        id: 'Tabs',
        class: ''
      },
      {
        name: 'Popup提示弹框',
        id: 'Popup',
        class: ''
      }
    ]
  }
];