import React from 'react';

// 角色列表中单个角色组件
var RoleItem = React.createClass({
	setSel: function () {
		
		this.props.setSel(this.props.item.value);
	},
	render: function () {
		var chkCls = this.props.chked ? 'chked' : '';
		return (
			<div onClick={this.setSel} className={"role-item "+chkCls}>{this.props.item.name}</div>
		);
	}
});

export default RoleItem;