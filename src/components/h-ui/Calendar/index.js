import React from 'react';

import Month from './Month';
import * as tUtils from './timeUtils';
import './style.scss';

// 月份名映射
const MONTH_MAP = {
	1: '一月',
	2: '二月',
	3: '三月',
	4: '四月',
	5: '五月',
	6: '六月',
	7: '七月',
	8: '八月',
	9: '九月',
	10: '十月',
	11: '十一月',
	12: '十二月'
};

/**
 * 日历组件
 * 组件可传入属性
 * 
 * startDate string 可选 可以选择的开始日期(e.g.,'2017-02-08')，默认为空
 * endDate string  可选 可以选择的开始日期(e.g.,'2017-02-08')，默认为空
 * hide boolean 可选 是否隐藏日期选择组件
 * chg function 可选 选择日期时的回调，点击日期元素时调用(e.g,chg(dateStr))
 */
class Calendar extends React.Component {
	constructor(props) {
		super(props);

		let now = new Date();
		let startTime = this.props.startDate || null;
		let endTime = this.props.endDate || null;
		startTime = startTime && tUtils.strToTime(startTime);
		endTime = endTime && tUtils.strToTime(endTime);
		
		this.state = {
			// 当前文本框显示的时间
			selTime: '',
			// 当前文本框显示的时间字符串
			selTimeStr: '',
			// 当前的系统时间
			curTime: now,
			// 当前日历框视图中显示的时间
			viewTime: now,
			// 当前的视图
			curView: 'month',
			// 可选的开始时间
			startTime: startTime,
			// 可选的结束时间
			endTime: endTime,
			// 是否显示日历视图框
			showItem: false
		}

		this.preView = this.preView.bind(this);
		this.nextView = this.nextView.bind(this);
		this.parentView = this.parentView.bind(this);
		this.dayClk = this.dayClk.bind(this);
		this.monthClk = this.monthClk.bind(this);
		this.yearClk = this.yearClk.bind(this);
		this.toggle = this.toggle.bind(this);
		this.outsideClk = this.outsideClk.bind(this);
	}

	componentDidMount() {
		window.addEventListener('click', this.outsideClk);
	}

	componentWillUnmount() {
		window.removeEventListener('click', this.outsideClk);	
	}

	componentWillReceiveProps(nextProps) {
		// 如果开始时间或结束时间与之前不同，重设state中的可选范围的开始，结束时间
		if (nextProps.startDate !== this.props.startDate || nextProps.endDate !== this.props.endDate) {
			let startTime = nextProps.startDate || null;
			let endTime = nextProps.endDate || null;
			startTime = startTime && tUtils.strToTime(startTime);
			endTime = endTime && tUtils.strToTime(endTime);
			this.setState({startTime: startTime, endTime: endTime});
		}
	}

	// 阻止点击事件冒泡
	preventClk(e) {
		// e.stopPropagation();
	}

	// 点击item元素框外面时，收起item框
	outsideClk(e) {
		let target = e.target;
		let parent = this.refs.calendar;

		// while (target != undefined && target != null && target.tagName.toUpperCase() !== 'BODY') {
		// 	if (target === parent) {
		// 		return true;
		// 	}
		// 	target = target.parentNode;
		// }

		// this.setState({showItem: false});
	}

	// 获取年视图，显示月份
	getYearView() {
		let { y, m, d } = tUtils.getYmd(this.state.viewTime);
		let { startTime, endTime, curTime, selTime } = this.state;
		let mList = [];

		// 开始，结束日期所在的月份，每个显示的月份如果不在开始，结束时间的月份范围内，都要加上disable。
		// 为了方便对比，生成时间时天都设置为每月第一天。
		startTime = startTime && new Date(startTime.getFullYear(), startTime.getMonth(), 1);
		endTime = endTime && new Date(endTime.getFullYear(), endTime.getMonth(), 1);
		let cls, monthDay;
		for (let i = 1; i < 13; i++) {
			monthDay = new Date(y, i-1, 1);
			cls = 'month';
			if ((startTime && monthDay < startTime) || (endTime && monthDay > endTime)) {
				cls += ' disable';
			}
			if (monthDay > curTime) {
				cls += ' post-month';
			}
			if (selTime) {
				if (tUtils.compareTime(monthDay, selTime, 'month')) {
					cls += ' cur';
				}
			}
			mList.push(<span className={cls} key={i}>{MONTH_MAP[i]}</span>)
		}

		return (
			<div className="months" onClick={this.monthClk}>
				{mList}
			</div>
		);
	}

	// 获取十年期视图
	getDecadeView() {
		let { y, m, d } = tUtils.getYmd(this.state.viewTime);
		let { startTime, endTime, curTime, selTime } = this.state;
		var yList = [];

		// 开始，结束日期所在的年份，每个显示的年份如果不在开始，结束时间的年份范围内，都要加上disable。
		// 为了方便对比，生成时间时天都设置为每年第一个月的第一天。
		startTime = startTime && new Date(startTime.getFullYear(), 0, 1);
		endTime = endTime && new Date(endTime.getFullYear(), 0, 1);

		let cls = '';
		let monthDay;
		y = y - y % 10 - 1;
		for (let i = 0; i < 12; i++) {
			cls = 'year';
			if (i == 0) {
				cls += ' pre-year';
			} else if (i == 11) {
				cls += ' post-year';
			} else if (new Date(y, 0, 1) > curTime) {
				cls += ' post-year';
			}
			monthDay = new Date(y, 0, 1);
			if ((startTime && monthDay < startTime) || (endTime && monthDay > endTime)) {
				cls += ' disable';
			}
			if (selTime) {
				if (tUtils.compareTime(monthDay, selTime, 'year')) {
					cls += ' cur';
				}
			}
			yList.push(<span className={cls} key={i}>{y}</span>);
			y++;
		}

		return (
			<div className="years" onClick={this.yearClk}>
				{yList}
			</div>
		);
	}

	// 获取日历视图
	getView() {
		let curView = this.state.curView;
		let { startTime, endTime, curTime, selTime, viewTime } = this.state;

		if (curView === 'month') {
			return (
				<Month {...{startTime, endTime, curTime, selTime, viewTime}} dayClk={this.dayClk}></Month>
			);
		} else if (curView === 'year') {
			return this.getYearView();
		} else if (curView === 'decade') {
			return this.getDecadeView();
		}
	}

	// 获取当前视图父级信息的描述
	getParentsInfo() {
		let { y, m, d } = tUtils.getYmd(this.state.viewTime);
		let curView = this.state.curView;
		let info = '';

		if (curView === 'month') {
			info = MONTH_MAP[m + 1] + y;
		} else if (curView === 'year') {
			info = y;
		} else if (curView === 'decade') {
			info = (y - y%10) + '-' + (y - y%10 + 9);
		}
		return info;
	}

	// 显示、隐藏日历框。如果将要显示日历框时，重置viewTime为当前选中时间selTime，或当前时间。
	toggle() {
		let obj = {showItem: !this.state.showItem};
		if (obj.showItem) {
			if (this.state.selTime) {
				obj['viewTime'] = this.state.selTime;
			} else {
				obj['viewTime'] = new Date();				
			}
		} 
		this.setState(obj);
	}

	/**
	 * 设置选中的日期，如果传入了select方法，调用select方法
	 * @param {[type]} time     选择的时间
	 * @param {[type]} timeStr  选择的时间的字符串
	 * @param {[type]} viewTime 视图时间
	 */
	setSelectTime(time, timeStr, viewTime) {
		this.setState({
			selTime: time,
			selTimeStr: timeStr,
			viewTime: viewTime,
			showItem: false
		});
		if (this.props.select) {
			this.props.select(timeStr);
		}
	}

	/**
	 * 日期被点击时，如果是可选日期，子组件会调用该方法，并传入三个参数。
	 * @param  {[type]} nextSelTime    选择的时间
	 * @param  {[type]} nextSelTimeStr 选择的时间对应的字符串
	 * @param  {[type]} nextViewTime   对应的视图时间
	 * @return {[type]}                [description]
	 */
	dayClk(nextSelTime, nextSelTimeStr, nextViewTime) {
		this.setSelectTime(nextSelTime, nextSelTimeStr, nextViewTime);
	}

	// 月份被点击
	monthClk(e) {
		if(e.target.className.match(/disable/)) {
			return ;
		}
		let month = e.target.innerHTML;
		for (let i = 1; i < 13; i++) {
			if (MONTH_MAP[i] === month) {
				month = i - 1;
				break;
			}
		}
		if (typeof month === 'number') {
			let viewTime = this.state.viewTime;
			let y = viewTime.getFullYear();
			let m = viewTime.getMonth();
			let d = viewTime.getDate();
			this.setState({
				viewTime: new Date(y, month, 1),
				curView: 'month'
			});
		}
	}

	// 年被点击
	yearClk(e) {
		if(e.target.className.match(/disable/)) {
			return ;
		}
		let { y, m, d } = tUtils.getYmd(this.state.viewTime);
		let year = e.target.innerHTML;

		this.setState({
			viewTime: new Date(year, 0, 1),
			curView: 'year'
		});
	}

	// 上一个日历视图
	preView() {
		let { y, m, d } = tUtils.getYmd(this.state.viewTime);
		let curView = this.state.curView;
		let nextTime = null;

		if (curView === 'month') {
			nextTime = new Date(y, m - 1, 1);
		} else if (curView === 'year') {
			nextTime = new Date(y - 1, 0, 1);
		} else if (curView === 'decade') {
			nextTime = new Date(y - 10, 0, 1);
		}
		this.setState({viewTime: nextTime});
	}

	// 下一个日历视图
	nextView() {
		let { y, m, d } = tUtils.getYmd(this.state.viewTime);
		let curView = this.state.curView;
		let nextTime = null;

		if (curView === 'month') {
			nextTime = new Date(y, m + 1, 1);
		} else if (curView === 'year') {
			nextTime = new Date(y + 1, 0, 1);
		} else if (curView === 'decade') {
			nextTime = new Date(y + 10, 0, 1);
		}
		nextTime && this.setState({viewTime: nextTime});
	}

	// 切换到父级的视图
	parentView() {
		let curView = this.state.curView;
		let nextView = null;

		if (curView === 'month') {
			nextView = 'year';
		} else if (curView === 'year') {
			nextView = 'decade';
		}
		nextView && this.setState({curView: nextView});
	}

	// 获取tools中pre，netx按钮的class
	// 主要用于props中传入了startDate，endDate时，控制按钮的显示
	getPreNextBtnCls() {
		let { y, m, d } = tUtils.getYmd(this.state.viewTime);
		let curView = this.state.curView;

		let pre = 'pre-view';
		let next = 'next-view';

		if (this.props.startDate) {
			// 和属于当前视图(不包括pre和post)的第一个元素的第一天比较，如果比startDate小，则不显示preView按钮
			let startTime = tUtils.strToTime(this.props.startDate);
			let compareTime;
			if (curView === 'month') {
				// 比较这个月第一天
				compareTime = new Date(y, m, 1);
			} else if (curView === 'year') {
				// 比较今年第一个月的第一天
				compareTime = new Date(y, 0, 1);
			} else if (curView === 'decade') {
				// 比较本十年开头的第一年的第一个月的第一天
				compareTime = new Date(y - y % 10, 0, 1);
			}
			if (startTime >= compareTime) {
				pre += ' disable';
			}
		}

		if (this.props.endDate) {
			// 和属于当前视图(不包括pre和post)的最后一个元素的最后一天比较，如果比endDate大，则不显示nextView按钮
			let endTime = tUtils.strToTime(this.props.endDate);
			let compareTime;
			if (curView === 'month') {
				// 比较这个月最后一天
				compareTime = new Date(y, m + 1, 0);
			} else if (curView === 'year') {
				// 比较今年最后一个月的最后一天
				compareTime = new Date(y, 11, 31);
			} else if (curView === 'decade') {
				// 比较本十年结束的最后一年的最后一个月的最后一天
				compareTime = new Date(y - y % 10 + 9, 11, 31);
			}
			if (endTime <= compareTime) {
				next += ' disable';
			}
		}

		return {
			pre,
			next
		};
	}

	render() {
		let items = null;
		let parentsInfo = null;
		let btnCls = null;
		// 日历视图框显示时才计算视图中的内容
		if (this.state.showItem) {
			items = this.getView();
			parentsInfo = this.getParentsInfo();
			btnCls = this.getPreNextBtnCls();
		}

		return (
			<div ref="calendar" className="chui-calendar" onClick={this.preventClk} style={{display: (this.props.hide ? 'none' : '')}}>
				<div className="ipt-box">
					<input type="text" onClick={this.toggle} value={this.state.selTimeStr} readOnly={true} />
				</div>
				<div className="item-box" style={{display: (this.state.showItem ? '' : 'none')}}>
					<div className="tools">
						<span className={btnCls && btnCls.pre} onClick={this.preView}>&lt;</span>
						<div className="parents-info" onClick={this.parentView}>{parentsInfo}</div>
						<span className={btnCls && btnCls.next} onClick={this.nextView}>&gt;</span>
					</div>
					{items}
				</div>
			</div>
		);
	}
}

export default Calendar;