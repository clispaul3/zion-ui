/**@description 通用的导出接口 */
import { getFilterCondition } from "./utils/getFilterCondition"
import { getOrderBy } from "./utils/getOrderBy"
import DataApiService from "."

interface IParams {
	tableName: string               // 如:["usr_Account"]
	tableType?: "table" | "view"     // 表类型，table->普通表  view->视图
	fileName?: string               // 导出文件名，默认 "导出文件"
	suffix?: string                 // 文件后缀名，默认 .xlsx
	templateId: string              // 导出模板id，需要在配置端配置模板
	filterCondition?: any[]         // 如：[["fieldName","condition","connection","value"],[[],[]]]
	orderBy?: any[]                 // 如: [["fieldName", "value"]]
}

export const exportData = function (params: IParams) {
	const { tableName, tableType = "table", suffix = ".xlsx", fileName = "导出文件", templateId, filterCondition = [], orderBy = [] } = params
	const requestParams = {
		tableName,
		fileName,
		templateIds: [templateId],
		orderBy: getOrderBy(tableName, orderBy as any),
		filterCondition: getFilterCondition(tableName, filterCondition as any)
	}
	return new Promise((resolve, reject) => {
		DataApiService.request({
			method: "POST",
			url: `dpApi/dp/business/output2excel/${tableType}`,
			data: requestParams
		}).then((res: any) => {
			const fileUrl = "/dpApi/dp/business/output2excel/download?fileName=" + res
			_dowloadFile(fileUrl, fileName, suffix)
		}).catch((error: any) => {
			reject(error)
		})
	})
}

// 下载文件
function _dowloadFile(url: string, fileName: string, suffix?: string) {
	var x = new XMLHttpRequest();
	x.open("GET", url, true);
	x.responseType = "blob";
	x.onload = function (e: any) {
		const file_name = fileName + (suffix || '.xlsx')
		const data = e.target.response
		// for IE
		if (window.navigator && window.navigator.msSaveOrOpenBlob) {
			window.navigator.msSaveOrOpenBlob(data, file_name);
		}
		// for Non-IE (chrome, firefox etc.)
		else {
			var a = document.createElement('A');
			let href = URL.createObjectURL(data);
			a.setAttribute('href', href);
			a.setAttribute('download', file_name);
			document.body.appendChild(a);
			a.click();
		}
	};
	x.send();
}  