import React from 'react';
import DropList from '../../h-ui/DropList';

const code = `
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