// 一些通用的时间处理的方法

/**
 * 字符串转换为时间
 * @param  {[type]} str 输入时间字符串
 * @return {[type]}     [description]
 */
export function strToTime(str) {
	let ymd = str.split('-');
	let y = ymd[0];
	let m = ymd[1] - 1;
	let d = ymd[2];
	return new Date(y, m, d);
}

/**
 * 时间转换为字符串
 * @param  {Date} date 输入的时间对象
 * @return {[type]}      [description]
 */
export function timeToStr(date) {
	let y = date.getFullYear();
	let m = date.getMonth();
	let d = date.getDate();

	m = (m + 101 + '').substring(1);
	d = (d + 100 + '').substring(1);
	return [y, m, d].join('-');
}

/**
 * 获取时间对象的yyyy, mm, dd
 * @param  {[type]} date 待转换的时间对象
 * @return {[type]}      [description]
 */
export function getYmd(date) {
	if (!date) {
		return {};
	}
	
	let y = date.getFullYear();
	let m = date.getMonth();
	let d = date.getDate();
	return {y, m, d};
}

/**
 * 对比两个时间对象是否相同。
 * 可以设置比较级别，如果到指定的级别都相同，返回true。
 * 
 * @param  {[type]} dateA 要比较的时间对象 
 * @param  {[type]} dateB 要比较的时间对象
 * @param  {[type]} level 比较到的级别，可选值有：year，month，date
 * @return {[type]}       [description]
 */
export function compareTime(dateA, dateB, level) {
	if (!level) {
		return dateA.getTime() === dateB.getTime();
	}

	if (dateA.getFullYear() === dateB.getFullYear()) {
		if (level === 'year') {
			return true;
		}
		if (dateA.getMonth() === dateB.getMonth()) {
			if (level === 'month') {
				return true;
			}
			if (dateA.getDate() === dateB.getDate()) {
				if (level === 'date') {
					return true;
				}
			}
		}
	}
	return false;
}
