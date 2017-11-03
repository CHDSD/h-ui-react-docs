import React from 'react';
import OptionItem from './OptionItem';
import './style.scss';
// 下拉选择框, 传入属性说明：
//  nodefault 选中框中默认会显示第一个选项，设置为true之后禁止默认选中，选中框显示内容为空
//  curoption 当前选中项的value，指定下拉框组件加载时的选中项
var DropList = React.createClass({
	getInitialState: function() {
		var i, index = -1,
			dropData = this.props.dropData;
		// 如果没有禁用默认选择，默认选中第一项456
		if (!this.props.nodefault && dropData.length > 0) {
			index = 0;
		}
		// 初始化时已经指定了选项，选中指定的选项
		for (i = 0; i < dropData.length; i++) {
			if (this.props.curoption === dropData[i].value) {
				index = i;
			}
		}
		// index表示当前选中的选项的序号，如果没有选项选中index的值为-1
		return {
			index: index
		}
	},
	componentWillReceiveProps: function(nextProps) {
		var i, index = -1;
		var dropData = nextProps.dropData;
		// 选项改变，重新计算index的值
		if (this.props.curoption !== nextProps.curoption || this.props.dropData.length != dropData.length) {
			for (i = 0; i < dropData.length; i++) {
				if (nextProps.curoption === dropData[i].value) {
					index = i;
				}
			}
			this.setState({
				index: index
			});
		}
	},
	// 设置下拉框选中项，当点击已选中的选项时，取消选中
	handleSel: function(value, index) {
		// this.setState({
		// 	index: this.state.index == index ? -1 : index
		// });
		this.props.chgOption(this.props.propKey, value);
	},
	// 切换展开收起状态
	switchDrop: function(event) {
		event.stopPropagation();
		event.preventDefault();
		var curActive = this.props.curActive == this.props.propKey ? '' : this.props.propKey;
		this.props.chgActive(curActive);
	},
	render: function() {
		var dropData = this.props.dropData;
		var i, dropCls, optList = [];
		for (i = 0; i < dropData.length; i++) {
			optList.push(
				<OptionItem key={i} index={i} chgSel={this.handleSel} item={dropData[i]} />
			)
		}
		var selectOption = '';
		if (this.state.index > -1) {
			selectOption = dropData.length > this.state.index ? dropData[this.state.index].nm : '';
		}
		dropCls = this.props.propKey == this.props.curActive ? 'active' : '';
		return (
			<div ref="drop" className="droplist" onClick={this.switchDrop} style={{position:'relative'}}>
			<div className='select-abtest' >
			    <input className="abtestDrop" type="text" placeholder={this.props.placeholder} value={selectOption} readOnly />
		        <span className="icon-arrow"></span>
			</div>
				{/*<div className="cur-option">{selectOption}</div>*/}
				<ul className={"option-list " + dropCls}>
					{optList}
				</ul>
			</div>
		)
	}
});

export default DropList;