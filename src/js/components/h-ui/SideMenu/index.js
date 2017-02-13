import React from 'react';
import MenuItem from './MenuItem';
import './style.scss';

class SideMenu extends React.Component {
	constructor(props) {
		super(props);

		let contextPath = window.appConf.contextPath || '';
		contextPath = contextPath && contextPath.replace(/\/+$/, '');
		this.state = {
			contextPath: contextPath,
			// 当前展开路径
			curPath: this.props.curPath || ''
		};

		this.setCurPath = this.setCurPath.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.curPath !== this.props.curPath) {
			let path = nextProps.curPath;
			// let path = nextProps.curPath.slice(this.state.contextPath.length);
			if (path !== this.state.curPath) {
				this.setState({curPath: path});
			}
		}
	}

	componentDidUpdate(prevProps, prevState) {
		// 
	}

	// 子菜单，菜单元素点击时，会传入父级的路径
	
	setCurPath(path, isItem) {
		// 点击子菜单时，如果路径在当前展开路径上，说明该子菜单是展开的，将展开往上一退层，收起该子菜单。
		if (!isItem && this.state.curPath.indexOf(path) === 0) {
			path = path.split('/');
			path.pop();
			path = path.join('/');
		}
		this.setState({curPath: path});
		if (isItem && this.props.itemClk) {
			this.props.itemClk(path);
		}
	}

	render() {
		const { data } = this.props;
		const { contextPath } = this.state;
		let curActive = this.props.curActive;
		let curPath = this.state.curPath;

		let list = [];
		for (let i = 0; i < data.length; i++) {
			let itemProps = {
				key: i,
				level: 1,
				parent: contextPath,
				data: data[i],
				curPath: curPath,
				setPath: this.setCurPath
			}
			list.push(
				<MenuItem {...itemProps}></MenuItem>
			);
		}

		return (
			<ul ref="menu" className="h-ui-side-menu level-1">{list}</ul>
		);
	}
}

export default SideMenu;