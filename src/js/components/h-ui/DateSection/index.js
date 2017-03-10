
import React from 'react';
// import RoleList from './RoleList';
import Calendar from '../Calendar';
import './style.scss';

// 时间段选择组件
class DateSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      curActive: '',
      curOption: {
        a: ''
      },
      date:['',''],
      s_start:this.props.SectionStart?this.props.SectionStart:'',
      s_end:'',
      e_start:'',
      e_end:this.props.SectionEnd?this.props.SectionEnd:''
    }
    this.chgActive = this.chgActive.bind(this);
    this.chgOption = this.chgOption.bind(this);
    this.startSel = this.startSel.bind(this);
    this.endSel = this.endSel.bind(this);
  }

  // componentDidMount() {
  //   this.refs.code.innerText = code;
  //   var _t = this;
  //   hljs.highlightBlock(_t.refs.code);

  // }

  chgActive(key) {
    this.setState({
      curActive: key
    });
    this.props.onSelect()
  }
  startSel(str){
    var date=this.state.date;
    date[0]=str;
    this.setState({
      e_start: str,
      date:date
    });
    this.props.onSelect(date);
  }
  endSel(str){
    var date=this.state.date;
    date[1]=str;
    this.setState({
      s_end: str,
      date:date
    });
    this.props.onSelect(date);
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
      <div className="date_section">
          <Calendar 
            startDate={this.state.s_start}
           endDate={this.state.s_end}
           select={this.startSel}
          />
          <span className='section_icon'>--</span>
          <Calendar 
           startDate={this.state.e_start}
          endDate={this.state.e_end}
          select={this.endSel}
          />
        </div>
    );
  }
}
export default DateSection;