import React from 'react';
import Form from '../../h-ui/Form';

const code = `
/**
 * 表单组件
 * 组件可传入属性
 *
 */

import Form from '../../h-ui/Form';

<Form></Form>
`;

class DemoForm extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.refs.code.innerText = code;
    var _t = this;
    hljs.highlightBlock(_t.refs.code);

  }

  render() {
    return (
      <div className="pagination-box">
        <p>表单(Form)组件：</p>
        
        <Form></Form>
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

export default DemoForm;