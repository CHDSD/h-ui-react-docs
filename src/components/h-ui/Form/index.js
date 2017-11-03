import React from 'react';
import './style.scss';
var Form = React.createClass({
	getInitialState() {
		return {
			name: '',
			password: '',
			phoneNm: '',
			email: '',
		};
	},

	chgName(e) {
		this.setState({
			name: e.target.value
		});
	},

	chgPassword(e) {
		this.setState({
			password: e.target.value
		});
	},

	chgPhoneNm(e) {
		this.setState({
			phoneNm: e.target.value
		});
	},

	chgEmail(e) {
		this.setState({
			email: e.target.value
		});
	},


	render() {
		return (
			<div className="form">
	        <div className="item"><label>账号：</label><input onChange={this.chgName} value={this.state.name} className="input" type="text" placeholder="请输入账号" ></input></div>
	        <div className="item"><label>密码：</label><input onChange={this.chgPassword} value={this.state.password} className="input" type="password" placeholder="请输入密码" ></input></div>
	        <div className="item"><label>电话：</label><input onChange={this.chgPhoneNm} value={this.state.phoneNm} className="input" type="text" placeholder="请输入电话"></input></div>
	        <div className="item"><label>邮箱：</label><input onChange={this.chgEmail} value={this.state.email} className="input" type="text" placeholder="请输入邮箱"></input></div>
			</div>
		);
	}
});

export default Form;