/**
 * @description 定制页面与其他页面(如:配置页面)之间的通信
 */
const deepGet = (object, path, defaultValue) => {
	return (!Array.isArray(path) ? path.replace(/\[/g, '.').replace(/\]/g, '').split('.') : path)
		.reduce((o, k) => (o || {})[k], object) || defaultValue;
}

function registerListener() {
	(window as any).addEventListener("message", ev => {
		const { topic } = ev.data || {}
		// 与FlowHYSUI的配置页面通信
		if (topic === "DATA_FROM_FLOWHYSUI") {
			sessionStorage.removeItem("PAGE_API_SERVICE")
			let data: any = {}
			let { mode = "radio", pageUrl, selectedData = { selectedId: "", selectedName: "" }, popConfigData, pageConfig: { pageStatus }, selectedTableData, otherFileds, showTableDataParams = {} } = ev.data || {}
			// 兼容initCustomerPageArr事件
			if (pageUrl.indexOf("initCustomPageArr") >= 0) {
				selectedData.selectedId = ev.data.SelectedArr.map(item => item.arrField1).join(",")
				selectedData.selectedName = ev.data.SelectedArr.map(item => item.arrField2).join(",")
				data.SelectedObj = ev.data.SelectedObj
			}
			const ids = (selectedData["selectedId"] || "").split(",")
			const names = (selectedData["selectedName"] || "").split(",")
			const checkedData = ids.map((item, idx) => {
				return {
					id: item,
					label: names[idx]
				}
			})
			Object.assign(data, {
				pagename: pageUrl,
				checkedData,
				mode,
				selectedTableData,
				status: pageStatus || "insert"
			})
			// 支持扩展字段
			if (otherFileds) {
				data.otherFileds = otherFileds
			}
			if (popConfigData) {
				const tableName = deepGet(popConfigData, 'data.initProperty.tableName', '');
				// add 李佳 获取返回结果，返回字段的数据（带下划线） 20200325
				const bottomFieldLine = deepGet(popConfigData, 'data.bottomField', tableName + '.name');
				const idLine = deepGet(popConfigData, 'data.selectDataShow.id[0]', tableName + '.id');
				Object.assign(data, {
					filterCondition: deepGet(popConfigData, 'data.initProperty.filterCondition', []),
					orderBy: deepGet(popConfigData, 'data.initProperty.orderBy', []),
					// add 李佳 将返回结果，返回字段转化为表.列 20200325
					bottomField: bottomFieldLine.replace(tableName + '_', tableName + '.'),
					id: idLine.replace(tableName + '_', tableName + '.'),
					tableName
				})
			}
			if (showTableDataParams.filterCondition && showTableDataParams.filterCondition.length > 0) {
				data.filterCondition = showTableDataParams.filterCondition
			}
			if (showTableDataParams.orderBy && showTableDataParams.orderBy.length > 0) {
				data.orderBy = showTableDataParams.orderBy
			}
			console.log(ev.data, "DATA_FROM_FLOWHYSUI")
			sessionStorage.setItem("DATA_FROM_FLOWHYSUI", JSON.stringify(data))
		}

		// 新版页面通信
		if (topic === "PAGE_API_SERVICE") {
			sessionStorage.removeItem("DATA_FROM_FLOWHYSUI")
			sessionStorage.setItem("PAGE_API_SERVICE", JSON.stringify(ev.data))
			console.log(ev.data, "PAGE_API_SERVICE")
		}
		// 与2.5定时周期控件通信
		if (topic === "DATA_FROM_CYCLE_CONTROL") {
			sessionStorage.removeItem("DATA_FROM_FLOWHYSUI")
			sessionStorage.setItem("DATA_FROM_CYCLE_CONTROL", JSON.stringify(ev.data))
			console.log(ev.data, "DATA_FROM_CYCLE_CONTROL")
		}
	})
}

export {
	registerListener
}

