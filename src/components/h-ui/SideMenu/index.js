import React from 'react';
import MenuItem from './MenuItem';
import './style.scss';

class SideMenu extends React.Component {
	constructor(props) {
		super(props);

		let contextPath = props.contextPath || '';
		contextPath = contextPath && contextPath.replace(/\/+$/, '');
		this.state = {
			contextPath: contextPath,
			// 当前展开路径
			curPath: this.props.curPath || '',
			// 当前激活选项路径
			curItemPath: this.props.curPath || ''
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
		let obj = {curPath: path};
		if (isItem) {
			obj['curItemPath'] = path;
			if (this.props.itemClk) {
				this.props.itemClk(path);				
			}
		}
		this.setState(obj);
	}

	render() {
		const { data, curActive } = this.props;
		const { contextPath, curPath, curItemPath } = this.state;
		// let curActive = this.props.curActive;

		let list = [];
		for (let i = 0; i < data.length; i++) {
			let itemProps = {
				key: i,
				level: 1,
				parent: contextPath,
				data: data[i],
				curPath: curPath,
				curItemPath: curItemPath,
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