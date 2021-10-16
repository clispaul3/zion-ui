/**
 * @description 获取filterCondition
 * filterCondition: [["fieldName","condition","connection","value"],[[],[]]]
 * @param tableName 
 * @param filterCondition 
 */
const getField = (tableName: string, field: any) => {
	// ES 搜索的表名
	if (tableName === "MissTableName") return field
	if (field.indexOf(".") >= 0) return field
	return tableName + "." + field
}

// 获取子查询的条件
const getSubFilterCondition = function (arrayFilter: any[], tableName: string, pid?: string) {
	// 树形表
	const treeTableCondition = [
		"samelevel_childrens", "parents", "childrens", "samelevel_parents",
		"samelevel_children", "children", "other_not_self_child", "other_not_child"
	]
	const subId = parseInt(Math.random() * 10000 as any);
	const connection = arrayFilter.find(item => Array.isArray(item) === false)
	const filterCondition = [{
		connection: connection || "&&",
		id: subId,
		pid: pid || 0,
		subsetStart: true
	}]

	arrayFilter.forEach(record => {
		if (Array.isArray(record) === false) return
		const filter: any = {
			type: "1",
			field: getField(tableName, record[0]),
			condition: record[1],
			connection: record[2],
			id: parseInt(Math.random() * 10000 as any),
			pid: subId
		}
		if (treeTableCondition.includes(record[1])) {  // 本级及子孙级
			filter["caseColumnInfo"] = {
				tableName,
				columnName: record[0] || "id",
				pid: record[4] || "pid"                    // 上级标识字段
			}
		}
		if (record[3]) {
			filter.value = record[3]
		}
		filterCondition.push(filter)
	})
	return filterCondition
}

export const getFilterCondition = function (tableName: string, filterCondition = []) {
	const targetFilterCondition: any = []
	// 树形表
	const treeTableCondition = [
		"samelevel_childrens", "parents", "childrens", "samelevel_parents",
		"samelevel_children", "children", "other_not_self_child", "other_not_child"
	]

	filterCondition.forEach((item: any, index) => {
		let filter: any = {}
		if (Array.isArray(item[0]) === false) {
			filter = {
				type: "1",
				field: getField(tableName, item[0]),
				condition: item[1],
				connection: item[2],
				id: parseInt(Math.random() * 10000 as any),
				pid: 0
			}
			if (item[3]) {
				filter.value = item[3]
			}
			if (treeTableCondition.includes(item[1])) {  // 本级及子孙级
				filter["caseColumnInfo"] = {
					tableName,
					columnName: item[0] || "id",
					pid: item[4] || "pid"     // 上级标识字段
				}
			}
			targetFilterCondition.push(filter)
			// 一层子查询
		} else if (Array.isArray(item[0]) && Array.isArray(item[0][0]) === false) {
			const subFilterCondition = getSubFilterCondition(item, tableName)
			targetFilterCondition.push(...subFilterCondition)
			// 二层子查询
		} else if (Array.isArray(item[0]) && Array.isArray(item[0][0])) {
			const connection = item.find((item2: string) => Array.isArray(item2) === false)
			const subId: any = parseInt(Math.random() * 10000 as any);
			const subFilter = {
				connection: connection || "&&",
				id: subId,
				pid: 0,
				subsetStart: true
			}
			targetFilterCondition.push(subFilter)
			item.forEach((data: any) => {
				if (Array.isArray(data) === false) return
				const subFilterCondition = getSubFilterCondition(data, tableName, subId)
				targetFilterCondition.push(...subFilterCondition)
			})
		}
	})
	return targetFilterCondition
}