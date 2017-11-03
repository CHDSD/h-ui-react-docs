import React from 'react';
import ReactDom from 'react-dom';
import './style.scss';

class Switch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value:this.props.value,
      disabled:this.props.disabled || null,
    };
    this.change = this.change.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.value!= this.props.value){
      this.setState({
        value:nextProps.value,
      })
    }
  }
  change() {
    this.props.change(!this.state.value);
  }
  render() {
    var change = this.state.disabled ? '' : this.change;
  	return (
  		<span className='container'>
        <label className="iSwitch">
            <input checked={this.state.value} onClick={change} type="checkbox"/>
            <i></i>
        </label>
      </span> 
		);
  }
}

export default Switch;