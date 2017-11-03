import React from 'react';

import * as tUtils from './timeUtils';

// 月视图组件，显示一个月中的天
class Month extends React.Component {
	constructor(props) {
		super(props);

		this.dayClk = this.dayClk.bind(this);
	}

	// 日期被点击
	dayClk(e) {
		if(e.target.className.match(/disable/)) {
			return ;
		}
		let { y, m, d } = tUtils.getYmd(this.props.viewTime);
		let cls = e.target.className;
		d = e.target.innerHTML;
		if (cls.match(/pre-month/)) {
			m -= 1;
		} else if (cls.match(/post-month/)) {
			m += 1;
		}
		let nextSelTime = new Date(y, m, e.target.innerHTML);
		let nextSelTimeStr = tUtils.timeToStr(nextSelTime);
		let nextViewTime = new Date(y, m, d);
		this.props.dayClk(nextSelTime, nextSelTimeStr, nextViewTime);
	}

	render() {
		let { y, m, d } = tUtils.getYmd(this.props.viewTime);
		let { startTime, endTime, curTime, selTime } = this.props;
		let dayList = [];
		let selYmd = selTime && tUtils.getYmd(selTime);

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
			if (selYmd) {
				if (day === selYmd.d && m === selYmd.m && y === selYmd.y) {
					cls += ' cur';
				}
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
			if (selTime) {
				if (tUtils.compareTime(monthDay, selTime, 'date')) {
					cls += ' cur';
				}
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
			if (selTime) {
				if (tUtils.compareTime(monthDay, selTime, 'date')) {
					cls += ' cur';
				}
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
}

export default Month;