import React from 'react';
import Pagination from '../../h-ui/Pagination';

const code = `
import Pagination from '../../h-ui/Pagination';

this.state = {
      current:1,
      total:10,
      range:6,
}
click(papernum) {
    var currentpaper = this.state.current;
    if (papernum =='up') {
      papernum = parseInt(currentpaper) - 1;
    } else if (papernum =='down') {
      papernum = parseInt(currentpaper) + 1;
    };
    this.setState({
      current:papernum
    })
}

<Pagination total = {this.state.total} current = {this.state.current} range = {this.state.range} click = {this.click}></Pagination>
`;

class DemoPagination extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current:1,
      total:10,
      range:6,
    }
    this.click = this.click.bind(this);
    this.handletol = this.handletol.bind(this);
    this.handlerag = this.handlerag.bind(this);
  }

  componentDidMount() {
    this.refs.code.innerText = code;
    var _t = this;
    hljs.highlightBlock(_t.refs.code);
    // setTimeout(function () {
    //   // hljs.initHighlighting();
    // }, 200)
  }

  click(papernum) {
    var currentpaper = this.state.current;
    if (papernum =='up') {
      papernum = parseInt(currentpaper) - 1;
    } else if (papernum =='down') {
      papernum = parseInt(currentpaper) + 1;
    };
    this.setState({
      current:papernum
    })
  }

  handletol(event) {
    var value = event.target.value;
    this.setState({total:value});
  }

  handlerag(event) {
    var value = event.target.value;
    this.setState({range:value});
  }
  render() {
  	return (
  		<div className="pagination-box">
        <p>分页(Pagination)组件：</p>
        <span>total：<input type="text" style={{width:'30px',textAlign:'center'}} onChange={this.handletol} value={this.state.total}/></span><br/><br/>
        <span>range：<input type="text" style={{width:'30px',textAlign:'center'}} onChange={this.handlerag} value={this.state.range}/></span><br/><br/>
        <Pagination total = {this.state.total} current = {this.state.current} range = {this.state.range} click = {this.click}></Pagination>
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

export default DemoPagination;


