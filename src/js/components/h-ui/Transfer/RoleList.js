import React from 'react';
import RoleItem from './RoleItem';

// 角色列表
var RoleList = React.createClass({
	render: function () {
		var itemList = [];
		var roles = this.props.roles;
		var chked;
		var filter;

		if (this.props.doFilter) {
			filter = this.props.filter;
		}

		for (var i = 0; i < roles.length; i++) {
			chked = this.props.sel[roles[i]['value']];
			if (filter) {
				if (roles[i].name.indexOf(filter) < 0) {
					continue;
				}
			}
			itemList.push(
				<RoleItem setSel={this.props.setSel} chked={chked}  item={roles[i]} key={i}></RoleItem>
			)
		}
		return (
			<div className="role-list unselectable">
				{itemList}
			</div>
		);
	}
});

export default RoleList;