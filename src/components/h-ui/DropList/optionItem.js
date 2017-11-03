import React from 'react';

var OptionItem = React.createClass({
	handleClk: function (event) {
		this.props.chgSel(this.props.item.value, this.props.index)
	},
	render: function () {
		return (
			<li className="option" onClick={this.handleClk} data-value={this.props.item.value}>{this.props.item.nm}</li>
		);
	}
});

export default OptionItem;