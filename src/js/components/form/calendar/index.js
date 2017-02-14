import React from 'react';
import ReactDom from 'react-dom';
import Calendar from '../../h-ui/Calendar';

const code = `
/**
 * 日历组件
 * 组件可传入属性
 * 
 * startDate string 可选 可以选择的开始日期(e.g.,'2017-02-08')，默认为空
 * endDate string  可选 可以选择的开始日期(e.g.,'2017-02-08')，默认为空
 * hide boolean 可选 是否隐藏日期选择组件
 * select function 可选 选择日期时的回调，点击日期元素时调用(e.g,select(dateStr))
 */

import Calendar from '../../h-ui/Calendar';

<Calendar></Calendar>
`;

class CalendarDocs extends React.Component {
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
  		<div className="menu">
        <p>菜单(Calendar)组件：</p>
        <div style={{background: '#fff'}}>
          <span>选择日期：</span>
          <Calendar></Calendar>
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

export default CalendarDocs;