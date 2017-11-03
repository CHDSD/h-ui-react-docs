import React from 'react';
import Transfer from '../../h-ui/Transfer';

 const code = `
 /**
 * Transfer穿梭框组件
 * 组件可传入属性
 *
 * dataSource 必须 数据源，其中的数据将会被渲染到左边一栏中，targetKeys 中指定的除外。
 * targetKeys 显示在右侧框数据的value集合 
 * onChange 必须 选项在两栏之间转移时的回调函数(e.g, onChange(dateStr) ;dateStr:右侧已选选项的value数组, e.g['5','2'];)
 * doFilter   可选 是否开启左侧数据源搜索框。true/flase
 */
 const dataSource = [{
  name: 'data1',
  value: '1',
}, {
  name: 'data2',
  value: '2'
}, {
  name: 'data3',
  value: '3',
}, {
  name: 'data4',
  value: '4',
}, {
  name: 'data5',
  value: '5'
}, {
  name: 'data6',
  value: '6'
}];
const targetKeys = ['5','2'];
class DemoTransfer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
            dataSource:dataSource?dataSource:[],
            targetKeys:targetKeys?targetKeys:[]
    }
    this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount() {
    this.refs.code.innerText = code;
    var _t = this;
    hljs.highlightBlock(_t.refs.code);
  }
  handleChange(keys) {
    console.log(keys);
    this.setState({
      targetKeys: keys
    });
  }
  render() {
    return (
      <div className="pagination-box">
        <p>穿梭框(Transfer)组件：</p>
        <Transfer
            dataSource={this.state.dataSource}
            targetKeys={this.state.targetKeys}
            onChange={this.handleChange}
            doFilter={true}
        />
        <p>示例代码：</p>
        <div>
          <pre>
            <code ref="code" className="js"></code>
          </pre>
        </div>
      </div>
    );
  }
 `;
const dataSource = [{
  name: 'data1',
  value: '1',
}, {
  name: 'data2',
  value: '2'
}, {
  name: 'data3',
  value: '3',
}, {
  name: 'data4',
  value: '4',
}, {
  name: 'data5',
  value: '5'
}, {
  name: 'data6',
  value: '6'
}];
const targetKeys = ['5','2'];
class DemoTransfer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
            dataSource:dataSource?dataSource:[],
            targetKeys:targetKeys?targetKeys:[]
    }
    this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount() {
    this.refs.code.innerText = code;
    var _t = this;
    hljs.highlightBlock(_t.refs.code);
  }
  handleChange(keys) {
    console.log(keys);
    this.setState({
      targetKeys: keys
    });
  }
  render() {
    return (
      <div className="pagination-box">
          <p>穿梭框(Transfer)组件：</p>
          <Transfer
              dataSource={this.state.dataSource}
              targetKeys={this.state.targetKeys}
              onChange={this.handleChange}
              doFilter={true}
          />
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
export default DemoTransfer;