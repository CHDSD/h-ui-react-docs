import React from 'react';
import DropList from '../../h-ui/DropList';

const code = `
/**
 * 下拉框组件
 * 组件可传入属性
 *
 * curActive    string   必须  切换展开收起状态
 * curoption    string   必须  当前选中项的value
 * propKey      string   必须  区分下拉框的id
 * chgOption    funtion  必须  保存选中项的值
 * chgActive    funtion  必须  设置curActive值
 * dropData     array    必须  选项数据
 * nodefault    boolean  可选  是否默认选中第一个
 * placeholder  string   可选  设置提示信息
 */


import DropList from '../../h-ui/DropList';

const itemData = [
  {nm: '下拉框选项一',value: '1'}, 
  {nm: '下拉框选项二',value: '2'}, 
  {nm: '下拉框选项三',value: '3'}, 
  {nm: '下拉框选项四',value: '4'}, 
  {nm: '下拉框选项五',value: '5'}, 
  {nm: '下拉框选项六',value: '6'}, 
  ];

class DemoDropList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      curActive: '',
      curOption: {
        a: ''
      }
    }
    this.chgActive = this.chgActive.bind(this);
    this.chgOption = this.chgOption.bind(this);
  }

  chgActive(key) {
    this.setState({
      curActive: key
    });
  }

  chgOption(key, value) {
    var obj = {};
    obj[key] = value;
    obj = Object.assign({}, this.state.curOption, obj);
    this.setState({
      curOption: obj
    });
  }
  render() {
    return (
      <div className="pagination-box">       
        <DropList 
            curActive={this.state.curActive}
            curoption={this.state.curOption['a']}
            propKey="a"
            chgOption={this.chgOption} 
            chgActive={this.chgActive}
            dropData={itemData}
            nodefault={true}
            placeholder={'请选择下拉框某项'}
          ></DropList>
      </div>
    );
  }
}
`;
const itemData = [{
  nm: '下拉框选项一',
  value: '1'
}, {
  nm: '下拉框选项二',
  value: '2'
}, {
  nm: '下拉框选项三',
  value: '3'
}, {
  nm: '下拉框选项四',
  value: '4'
}, {
  nm: '下拉框选项五',
  value: '5'
}, {
  nm: '下拉框选项六',
  value: '6'
}, ];

class DemoDropList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      curActive: '',
      curOption: {
        a: ''
      }
    }
    this.chgActive = this.chgActive.bind(this);
    this.chgOption = this.chgOption.bind(this);
  }

  componentDidMount() {
    this.refs.code.innerText = code;
    var _t = this;
    hljs.highlightBlock(_t.refs.code);

  }

  chgActive(key) {
    this.setState({
      curActive: key
    });
  }

  chgOption(key, value) {
    var obj = {};
    obj[key] = value;
    obj = Object.assign({}, this.state.curOption, obj);
    this.setState({
      curOption: obj
    });
  }
  render() {
    return (
      <div className="pagination-box">
        <p>下拉框(DropList)组件：</p>
        
        <DropList 
            curActive={this.state.curActive}
            curoption={this.state.curOption['a']}
            propKey="a"
            chgOption={this.chgOption} 
            chgActive={this.chgActive}
            dropData={itemData}
            nodefault={true}
            placeholder={'请选择下拉框某项'}
          ></DropList>
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

export default DemoDropList;