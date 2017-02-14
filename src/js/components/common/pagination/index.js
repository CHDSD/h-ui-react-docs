import React from 'react';
// import Pagination from '../../h-ui/Pagination';

const code = `
import Pagination from '../../h-ui/Pagination';

const PaginationData = [
  ];

<Pagination ></Pagination>
`;

class Pagination extends React.Component {
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
        <p>分页(Pagination)组件：</p>
        <div style={{width: '300px'}}>
          {/*<Pagination> </Pagination>*/}
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

export default Pagination;