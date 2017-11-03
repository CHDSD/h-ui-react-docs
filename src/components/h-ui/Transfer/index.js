import React from 'react';
import RoleList from './RoleList';
import './style.scss';

// 角色选择器组件
var Transfer = React.createClass({
	getInitialState: function () {
		return {
			leftRoles: [],
			rightRoles: [],
			leftSel: {},
			rightSel: {},
			filterText: '',
			filter: '',
		};
	},
	componentDidMount: function () {
		// $(this.refs.leftList).mCustomScrollbar({
		// 	theme:"light-3"
		// });
		// $(this.refs.rightList).mCustomScrollbar({
		// 	theme:"light-3"
		// });
	},
	componentWillMount:function(){
			if (this.props.dataSource.length) {
				var keyMap = {};
				this.props.targetKeys.forEach(function (item) {
					keyMap[item] = true;
				});
				var leftRoles = [];
				var rightRoles = [];
				this.props.dataSource.forEach(function (item) {
					if (keyMap[item.value]) {
						rightRoles.push(item);
					} else {
						leftRoles.push(item);
					}
				});
				this.setState({
					leftRoles: leftRoles,
					rightRoles: rightRoles
				});
			}

	},

	/**
	 * 左侧选择
	 * @param  {[type]} value  选项值
	 * @return {[type]}        [description]
	 */
	leftSel: function (value) {
		var i, j;
		var leftRoles = this.state.leftRoles;
		console.log(value);
		var leftSel = Object.assign({}, this.state.leftSel);
		for (i = 0; i < leftRoles.length; i++) {
			if (leftRoles[i].value === value) {
				if (leftSel[value]) {
					leftSel[value] = false;
				} else {
					leftSel[value] = true;
				}
			}
		}
		this.setState({
			leftSel: leftSel
		});
	},
	/**
	 * 右侧选择
	 * @param  {[type]} value 选项值
	 * @return {[type]}        [description]
	 */
	rightSel: function (value) {
		var i, j;
		var rightRoles = this.state.rightRoles;
		var rightSel = Object.assign({}, this.state.rightSel);
		for (i = 0; i < rightRoles.length; i++) {
			if (rightRoles[i].value === value) {
				if (rightSel[value]) {
					rightSel[value] = false;
				} else {
					rightSel[value] = true;
				}
			}
		}
		this.setState({
			rightSel: rightSel
		});
	},
	// 左侧选项移动到右侧
	toRight: function () {
		var i, k, role;
		var leftRoles = this.state.leftRoles.slice();
		var rightRoles = this.state.rightRoles.slice();
		var leftSel = this.state.leftSel;
		var hasSel = false;

		for (k in leftSel) {
			if (leftSel[k]) {
				hasSel = true;
				for (i = 0; i < leftRoles.length; i++) {
					if (leftRoles[i].value == k) {
						role = leftRoles.splice(i, 1);
						rightRoles.push(role[0]);
						break;
					}
				}
			}
		}
		if (!hasSel) {
			return ;
		}
		rightRoles.sort(function(a,b){return a.value - b.value;});
		this.setState({
			leftRoles: leftRoles,
			rightRoles: rightRoles,
			leftSel: {}
		});
		var targetKeys = rightRoles.map(function (item) {
			return item.value;
		});
		this.props.onChange(targetKeys);
	},
	// 右侧选项移动到左侧
	toLeft: function () {
		var i, k, role;
		var leftRoles = this.state.leftRoles.slice();
		var rightRoles = this.state.rightRoles.slice();
		var rightSel = this.state.rightSel;
		var hasSel = false;

		for (k in rightSel) {
			if (rightSel[k]) {
				hasSel = true;
				for (i = 0; i < rightRoles.length; i++) {
					if (rightRoles[i].value == k) {
						role = rightRoles.splice(i, 1);
						leftRoles.push(role[0]);
						break;
					}
				}
			}
		}
		if (!hasSel) {
			return ;
		}
		leftRoles.sort(function(a,b){return a.value - b.value;});
		this.setState({
			leftRoles: leftRoles,
			rightRoles: rightRoles,
			rightSel: {}
		});
		var targetKeys = rightRoles.map(function (item) {
			return item.value;
		});
		this.props.onChange(targetKeys);
	},
	handleInput: function (event) {
		var val = event.target.value;
		this.setState({
			filterText: val
		});
	},
	// 过滤输入文本中的特殊字符
	filterInput: function (event) {
		var val = event.target.value;
		val = val.replace(/\s/g, '');
		this.setState({
			filterText: val
		});
	},
	filterSet: function () {
		this.setState({
			filter: this.state.filterText
		});
	},
	render: function () {
		var filter = this.state.filter;
		var leftFilteredLength = 0;
		var leftRoles = this.state.leftRoles;
		var  showFilter=this.props.doFilter?'search-bar':' hide search-bar ';
		// 如果有过滤条件，中间按钮根据过滤之后左边的数据条数，判断是否灰显。
		if (filter) {
			for (var i = 0; i < leftRoles.length; i++) {
				if (leftRoles[i].name.indexOf(filter) >= 0) {
					leftFilteredLength += 1;
				}
			}
		} else {
			leftFilteredLength = leftRoles.length;
		}

		return (
			<div className="role-selector">
				<div className={showFilter}>
					<input 
						onChange={this.handleInput}
						onKeyUp={this.filterInput}
						value={this.state.filterText}
						className="filter-text" type="text"/>
					<div 
						onClick={this.filterSet}
						className="btn search">搜索</div>
				</div>
				<div className="left-role" ref="leftList">
					<RoleList
						filter={this.state.filter}
						doFilter={this.props.doFilter?this.props.doFilter:false}
						roles={this.state.leftRoles}
						sel={this.state.leftSel}
						setSel={this.leftSel}
					></RoleList>
				</div>
				<div className="mid-bar">
					<div onClick={this.toRight} className={"sel-btn to-right " + (leftFilteredLength ? 'active' : '')}></div>
					<div onClick={this.toLeft} className={"sel-btn to-left " + (this.state.rightRoles.length ? 'active' : '')}></div>
				</div>
				<div className="right-role" ref="rightList">
					<RoleList
						doFilter={false}
						roles={this.state.rightRoles}
						sel={this.state.rightSel}
						setSel={this.rightSel}
					></RoleList>
				</div>
			</div>
		);
	}
});

export default Transfer;