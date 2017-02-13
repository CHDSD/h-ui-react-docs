import React from 'react';
import { Link } from 'react-router';

class MenuItem extends React.Component {
	constructor(props) {
		super(props);

		this.state = {};

		this.subMenuClk = this.subMenuClk.bind(this);
		this.itemClk = this.itemClk.bind(this);
	}

	// 子菜单点击事件
	subMenuClk() {
		let path = this.props.parent + '/' + this.props.data.id;
		console.log('path: '+path);
		this.props.setPath(path);
	}

	itemClk() {
		let path = this.props.parent + '/' + this.props.data.id;
		console.log('path no-child: '+path);
		this.props.setPath(path, true);
	}

	render() {
		const { data } = this.props;

		if (data.child) {
			let list = [];
			let child = data.child;
			let { level, parent, curPath, setPath } = this.props;
			level += 1;
			parent = parent + '/' + data.id;

			for (let i = 0; i < child.length; i++) {
				let itemProps = {
					key: i,
					level: level,
					parent: parent,
					data: child[i],
					curPath: curPath,
					setPath: setPath
				}
				list.push(
					<MenuItem {...itemProps}></MenuItem>
				);
			}
			let cls = "sub-menu level-"+level;
			if (this.props.curPath.indexOf(parent) === 0) {
				cls += ' expand';
			}
			return (
				<li className="mid-layer" ref="menu">
					<p className="mid-name" onClick={this.subMenuClk}>{data.name}</p>
					<ul className={cls}>{list}</ul>
				</li>
			)
		} else {
			const { parent, level } = this.props;
			let itemCls = "menu-item " + (data.class || '');
			// let route = parent ? parent + '/' + data.path : data.path;
			// let link;
			// if (data.path) {
			// 	link = (
			// 		<Link to={route}><span className='menu_icon'></span>{data.name}</Link>
			// 	);
			// } else {
			// 	link = data.name;
			// }

			return (
				<li className={itemCls} onClick={this.itemClk}>{data.name}</li>
			);
		}
	}
}

export default MenuItem;