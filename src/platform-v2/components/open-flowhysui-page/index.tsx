/**
 * @description 打开FlowHYSUI配置页面
 * @param pageUrl 示例: initializedata/shebeixinxiguanlizhengshibiaoshujubd
 */
import { PageApiService } from "zion-ui"
import { DataApiService } from "v2"

interface IOpenFlowHYSUIPage {
	/** 窗口标题 */
	title?: string
	pageUrl: string
	type?: "modal" | "tab"
	/** 开发调试时可以传 */
	hostname?: string
}

export const OpenFlowHYSUIPage = async (params: IOpenFlowHYSUIPage) => {
	let { pageUrl, type = "modal", hostname, title } = params
	/** 以浏览器标签页方式打开 */
	if (type == "tab") {
		const absUrl = `http://${hostname || location.hostname}:${9000}/FlowHYS/Shell.html?type=IOTMP&projectId=03a3dc03b1654233b828e787dcefffe&pagename=${pageUrl}&ClientType=1`
		window.open(absUrl)
	} else {
		/** 获取页面名称作为窗口标题 */
		if (pageUrl && !title) {
			const result = await DataApiService.selectData({
				tableName: "view_sys_function",
				fieldName: ["id", "file_name", "web_name"],
				filterCondition: [
					["file_name", "=", "&&", pageUrl]
				]
			})
			title = (result.data[0] || {})["web_name"]
		}
		const pageService = new PageApiService({
			basePath: "/FlowHYS/Shell.html",
			hostname,
			port: 9000
		})
		pageService.request({
			params: {
				projectId: "03a3dc03b1654233b828e787dcefffe",
				pagename: pageUrl,
				ClientType: 1
			},
			data: {
				title
			}
		})
	}
}