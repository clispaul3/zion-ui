/**
 * @description 获取指定月份的开始日期和结束日期
 */
interface IGetStartEndDateOfMonth {
	year?: number
	month: number    // 1:一月，2：二月,......
}
export const getStartEndDateOfMonth = function (params: IGetStartEndDateOfMonth) {
	let { year, month } = params
	if (!year) {
		year = new Date().getFullYear()
	}
	const startDate = new Date(year, month - 1);
	const endDate = new Date(new Date(year, month).valueOf() - 60 * 60 * 1000 * 24);
	function datasFormat(d) {
		var datetime = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
		return datetime;
	}
	return {
		startDate: datasFormat(startDate),
		endDate: datasFormat(endDate)
	}
}