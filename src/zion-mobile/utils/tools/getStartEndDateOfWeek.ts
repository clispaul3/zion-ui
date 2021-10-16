/**
 * @description 第n年的第n周，获取开始和结束时间 （星期一为一周的开始）
 **/
interface IGetStartEndDateOfWeek {
	year: number
	week: number
}
export function getStartEndDateOfWeek(params: IGetStartEndDateOfWeek) {
	const { year, week: weekNo } = params
	// 此年1号是星期几
	let oneday = new Date(year + '-01-01').getDay() //0-6
	// 方便计算，当为星期天时为7
	if (oneday == 0) {
		oneday = 7
	}

	let one_fistday;
	let one_lastday;
	// 如果1号刚好是星期一
	if (oneday == 1) {
		one_fistday = year + '-01-01'
		one_lastday = year + '-01-07'
	} else {
		let jj = 8 - oneday
		one_fistday = (year - 1) + '-12-' + (31 - oneday + 2 > 9 ? 31 - oneday + 2 : '0' + (31 - oneday + 2))
		one_lastday = year + '-01-' + (jj > 9 ? jj : '0' + jj)
	}

	let fistday;
	let lastday;
	// 如果刚好是第一周
	if (weekNo == 1) {
		fistday = one_fistday
		lastday = one_lastday
	} else {
		fistday = _addDate(one_lastday, (weekNo - 2) * 7 + 1)
		lastday = _addDate(one_lastday, (weekNo - 1) * 7)
	}
	return {
		startDate: fistday,
		endDate: lastday
	}
}

// 日期加减法  date参数为计算开始的日期，days为需要加的天数   
// 格式:addDate('2017-1-11',20) 
function _addDate(date, days) {
	var d = new Date(date);
	d.setDate(d.getDate() + days);
	var m = d.getMonth() + 1;
	return d.getFullYear() + '-' + (m > 9 ? m : '0' + m) + '-' + (d.getDate() > 9 ? d.getDate() : '0' + d.getDate());
}