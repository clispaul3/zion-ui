/**
 * @description 获取queryString的参数
 */

export const getUrlSearchKey = (key: string | string[]) => {
	const searchObj = new URLSearchParams(location.search)
	if (typeof key === "string") return searchObj.get(key)
	if (Array.isArray(key)) {
		const result = {}
		key.forEach(item => {
			result[item] = searchObj.get(item)
		})
		return result
	}
	return null
}