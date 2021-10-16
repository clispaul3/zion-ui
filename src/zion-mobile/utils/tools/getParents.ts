/**
 * @description 获取上级数据
 */
const idField = "key"
const pidField = "uiPid"

export const getParents = function (id: string, dataSource: object[]) {
	const mapObj: any = {}
	const parents: any = []
	let currentData: any = {}
	dataSource.forEach((data: any) => {
		mapObj[(data[idField] || data["id"])] = data
		if ((data[idField] || data["id"]) === id) {
			currentData = data
		}
	})
	if (!currentData) return parents
	let parent = mapObj[currentData[pidField]]
	if (parent) {
		parents.unshift(parent[idField])
	}
	while (parent) {
		parent = mapObj[parent[pidField]]
		if (parent) {
			parents.unshift(parent[idField])
		}
	}
	return parents
}