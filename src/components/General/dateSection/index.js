import React from 'react';
import DateSection from '../../h-ui/DateSection';
const code = `
/**
 * 日历组件
 * 组件可传入属性
 * 
 * SectionStart string 可选 可以选择的开始日期(e.g.,'2017-02-08')，默认为空
 * SectionEnd string  可选 可以选择的结束日期(e.g.,'2017-02-08')，默认为空
 * 
 * onSelect function 可选 选择日期时的回调，点击日期元素时调用(e.g,select(dateArr),dateArr:选择的开始日期及结束日期数组，['开始日期','结束日期'])
 */
import DateSection from '../../h-ui/DateSection';
class DemoDateSection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            SectionStart: '2017-02-11',
            SectionEnd:'2017-03-10',
        }
        this.onSelect = this.onSelect.bind(this);
    }

    onSelect(date) {
        console.log(date);
    }
    render() {
        return (
             <div>
                    <span style={{marginRight: '10px'}}>日期段:</span>
                    <DateSection 
                              SectionStart={this.state.SectionStart}
                              SectionEnd={this.state.SectionEnd}
                              onSelect={this.onSelect}
                          />
                </div>
        );
    }
}

`;
class DemoDateSection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            SectionStart: '2017-02-11',
            SectionEnd:'2017-03-10',
        }
        this.onSelect = this.onSelect.bind(this);
    }
    componentDidMount() {
        this.refs.code.innerText = code;
        var _t = this;
        hljs.highlightBlock(_t.refs.code);

    }
    onSelect(date) {
        console.log(date);
    }
    render() {
        return (
            <div className="pagination-box">
                <p>日期段(DateSection)组件：</p>
                <p>示例代码：</p>
                <div>
                    <span style={{marginRight: '10px'}}>日期段:</span>
                    <DateSection 
                              SectionStart={this.state.SectionStart}
                              SectionEnd={this.state.SectionEnd}
                              onSelect={this.onSelect}
                          />
                </div>
                <div>
                    <pre>
                      <code ref="code" className="js">{code}</code>
                    </pre>
                </div>
            </div>
        );
    }
}

export default DemoDateSection;