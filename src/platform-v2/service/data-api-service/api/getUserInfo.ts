/**
 * @description 获取用户信息
 */
import DataApiService from "."

export const getUserInfo = (function (this: any) {
	let userInfo
	return async function () {
		if (!userInfo) {
			const result = await DataApiService.request({
				url: "/api/restApi/auth/getAllUserJoinCacheInfo",
				method: "GET"
			})
			const jsObj: any = {}
			Object.keys(result).forEach(key => {
				if (result[key]) {
					jsObj[key] = JSON.parse(result[key])
				} else {
					jsObj[key] = result[key]
				}
			})
			userInfo = jsObj
		}
		return userInfo
	}
})();