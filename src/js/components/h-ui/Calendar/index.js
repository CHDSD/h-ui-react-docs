import React from 'react';
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
		startTime = startTime && this.strToTime(startTime);
		endTime = endTime && this.strToTime(endTime);
		
		this.state = {
			// 当前文本框显示的时间
			selTime: '',
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
			startTime = startTime && this.strToTime(startTime);
			endTime = endTime && this.strToTime(endTime);
			this.setState({startTime: startTime, endTime: endTime});
		}
	}

	/**
	 * 字符串转换为时间
	 * @param  {string} str 输入时间字符串
	 * @return {[type]}     [description]
	 */
	strToTime(str) {
		let ymd = str.split('-');
		let y = ymd[0];
		let m = ymd[1] - 1;
		let d = ymd[2];
		return new Date(y, m, d);
	}

	/**
	 * 时间转换为字符串
	 * @param  {Date} time 输入的事件对象
	 * @return {[type]}      [description]
	 */
	timeToStr(time) {
		let y = time.getFullYear();
		let m = time.getMonth();
		let d = time.getDate();

		m = (m + 101 + '').substring(1);
		d = (d + 100 + '').substring(1);
		return [y, m, d].join('-');
	}

	// 阻止点击事件冒泡
	preventClk(e) {
		e.stopPropagation();
	}

	// 点击item元素框外面时，收起item框
	outsideClk() {
		this.setState({showItem: false});
	}

	// 获取时间对象的yyyy, mm, dd
	getYmd(date) {
		let y = date.getFullYear();
		let m = date.getMonth();
		let d = date.getDate();
		return {y, m, d};
	}

	// 获取月视图，显示天
	getMonthView() {
		let { y, m, d } = this.getYmd(this.state.viewTime);
		let { startTime, endTime, curTime } = this.state;
		let dayList = [];

		let day = 1;
		let cls = '';
		let monthDay = new Date(y, m, day);
		// 当前月份的天
		while (monthDay.getMonth() === m) {
			cls = 'day cur-month'
			if ((startTime && monthDay < startTime) || (endTime && monthDay > endTime)) {
				cls += ' disable';
			}
			if (monthDay > curTime) {
				cls += ' post';
			}
			dayList.push(<span className={cls} key={day}>{day}</span>);
			day += 1;
			monthDay = new Date(y, m, day);
		}
		let lastDate = day - 1;

		// 设置灰色显示的上月的日期
		day = 1;
		cls = '';
		let firstDayOfMonth = new Date(y, m, 1).getDay();
		let preDays = firstDayOfMonth === 0 ? 7 : firstDayOfMonth;
		while (preDays > 0) {
			preDays -= 1;
			day -= 1;
			monthDay = new Date(y, m, day);
			cls = 'day pre-month'
			if ((startTime && monthDay < startTime) || (endTime && monthDay > endTime)) {
				cls += ' disable';
			}
			dayList.unshift(<span className={cls} key={day}>{monthDay.getDate()}</span>)
		}

		// 设置灰色显示的下月的日期
		day = lastDate;
		cls = '';
		let lastDayOfMonth = new Date(y, m, day).getDay();
		let postDays = lastDayOfMonth === 6 ? 7 : 7 - lastDayOfMonth - 1;
		// 确保每个月显示6行天数
		if ((dayList.length + postDays) / 7 < 6) {
			postDays += 7;
		}
		while (postDays > 0) {
			postDays -= 1;
			day += 1;
			monthDay = new Date(y, m, day);
			cls = 'day post-month'
			if ((startTime && monthDay < startTime) || (endTime && monthDay > endTime)) {
				cls += ' disable';
			}
			dayList.push(<span className={cls} key={day}>{monthDay.getDate()}</span>)
		}
		
		return (
			<div className="days" onClick={this.dayClk}>
				<span className="day-name">日</span>
				<span className="day-name">一</span>
				<span className="day-name">二</span>
				<span className="day-name">三</span>
				<span className="day-name">四</span>
				<span className="day-name">五</span>
				<span className="day-name">六</span>
				{dayList}
			</div>
		);
	}

	// 获取年视图，显示月份
	getYearView() {
		let { y, m, d } = this.getYmd(this.state.viewTime);
		let { startTime, endTime, curTime } = this.state;
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
		let { y, m, d } = this.getYmd(this.state.viewTime);
		let { startTime, endTime, curTime } = this.state;
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
		if (curView === 'month') {
			return this.getMonthView();
		} else if (curView === 'year') {
			return this.getYearView();
		} else if (curView === 'decade') {
			return this.getDecadeView();
		}
	}


	// 获取当前视图父级信息的描述
	getParentsInfo() {
		let { y, m, d } = this.getYmd(this.state.viewTime);
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

	// 显示、隐藏日历框
	toggle() {
		this.setState({showItem: !this.state.showItem});
	}

	// 设置选中的日期，如果传入了select方法，调用select方法
	setSelectTime(timeStr, viewTime) {
		this.setState({
			selTime: timeStr,
			viewTime: viewTime,
			showItem: false
		});
		if (this.props.select) {
			this.props.select(timeStr);
		}
	}

	// 日期被点击
	dayClk(e) {
		if(e.target.className.match(/disable/)) {
			return ;
		}
		let { y, m, d } = this.getYmd(this.state.viewTime);
		let cls = e.target.className;
		d = e.target.innerHTML;
		if (cls.match(/pre-month/)) {
			m -= 1;
		} else if (cls.match(/post-month/)) {
			m += 1;
		}
		let nextSelTime = this.timeToStr(new Date(y, m, e.target.innerHTML));
		let nextViewTime = new Date(y, m, d);
		this.setSelectTime(nextSelTime, nextViewTime);
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
				viewTime: new Date(y, month, d),
				curView: 'month'
			});
		}
	}

	// 年被点击
	yearClk(e) {
		if(e.target.className.match(/disable/)) {
			return ;
		}
		let { y, m, d } = this.getYmd(this.state.viewTime);
		let year = e.target.innerHTML;

		this.setState({
			viewTime: new Date(year, m, d),
			curView: 'year'
		});
	}

	// 上一个日历视图
	preView() {
		let { y, m, d } = this.getYmd(this.state.viewTime);
		let curView = this.state.curView;
		let nextTime = null;

		if (curView === 'month') {
			nextTime = new Date(y, m - 1, d);
		} else if (curView === 'year') {
			nextTime = new Date(y - 1, m, d);
		} else if (curView === 'decade') {
			nextTime = new Date(y - 10, m, d);
		}
		this.setState({viewTime: nextTime});
	}

	// 下一个日历视图
	nextView() {
		let { y, m, d } = this.getYmd(this.state.viewTime);
		let curView = this.state.curView;
		let nextTime = null;

		if (curView === 'month') {
			nextTime = new Date(y, m + 1, d);
		} else if (curView === 'year') {
			nextTime = new Date(y + 1, m, d);
		} else if (curView === 'decade') {
			nextTime = new Date(y + 10, m, d);
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
		let { y, m, d } = this.getYmd(this.state.viewTime);
		let curView = this.state.curView;

		let pre = 'pre-view';
		let next = 'next-view';

		if (this.props.startDate) {
			// 和属于当前视图(不包括pre和post)的第一个元素的第一天比较，如果比startDate小，则不显示preView按钮
			let startTime = this.strToTime(this.props.startDate);
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
			let endTime = this.strToTime(this.props.endDate);
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
			<div className="chui-calendar" onClick={this.preventClk} style={{display: (this.props.hide ? 'none' : '')}}>
				<div className="ipt-box">
					<input type="text" onClick={this.toggle} value={this.state.selTime} readOnly={true} />
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

Calendar.propTypes = {
	hide: React.PropTypes.bool,
	startDate: React.PropTypes.string,
	endDate: React.PropTypes.string
};

export default Calendar;