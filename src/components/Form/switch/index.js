import React from 'react';
import ReactDom from 'react-dom';
import Switch from '../../h-ui/Switch';

const code = `
/**
 * 开关组件
 * 组件可传入属性
 *
 * checkvalue boolean 必须 初始化开关值
 * disabled boolean 可选 是否禁用开关 默认启用
 */
import Switch from '../../h-ui/Switch';

class DemoSwitch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checkvalue: true,
      disabled: null,
    };
    this.checkchange = this.checkchange.bind(this);
  }

  checkchange(value) {
    this.setState({checkvalue:value});
  }
  render() {
    return (
      <Switch change={this.checkchange} value={this.state.checkvalue}></Switch>
    );
  }
`;

class DemoSwitch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checkvalue: true,
      checkvalue2: false,
      checkvalue3: false,
    };
    this.checkchange = this.checkchange.bind(this);
    this.checkchange2 = this.checkchange2.bind(this);
    this.checkchange3 = this.checkchange3.bind(this);
  }

  componentDidMount() {
    // this.refs.code.innerText = code;
    var _t = this;
    hljs.highlightBlock(_t.refs.code);
  }

  checkchange(value) {
    this.setState({checkvalue:value});
  }

  checkchange2(value) {
    this.setState({checkvalue2:value});
  }

  checkchange3(value) {
    this.setState({checkvalue3:value});
  }

  render() {
  	return (
  		<div className="menu">
        <p>开关(Switch)组件：</p>
        <p>以下分别为禁用 默认开启 默认关闭：</p>
        <div style={{display:'inline-block',margin:'5px 10px'}}>
          <Switch change={this.checkchange3} value={this.state.checkvalue3} disabled = {true}></Switch>
        </div>
        <div style={{display:'inline-block',margin:'5px 10px'}}>
          <Switch change={this.checkchange} value={this.state.checkvalue}></Switch>
        </div>
        <div style={{display:'inline-block',margin:'5px 10px'}}>
          <Switch change={this.checkchange2} value={this.state.checkvalue2}></Switch>
        </div>

        <p>示例代码：</p>

        <div>
          <pre>
            <code ref="code" className="js">{code}</code>
          </pre>
        </div>
  		</div>
		);
  }
}

export default DemoSwitch;