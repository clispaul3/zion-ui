/**
 * @description 登出
 **/
import Cookie from "js-cookie";
import DataApiService from ".";

export function webLogout() {
	return new Promise((resolve, reject) => {
		DataApiService.get('/api/restApi/auth/webLoginOut').then((res: any) => {
			Cookie.remove('tokenTime', { path: '' })
			Cookie.remove("tokenId", { path: '' })
			Cookie.remove("userInfo", { path: '' })
			Cookie.remove("menuList", { path: '' })
			resolve(true)
		}).catch((error: any) => {
			reject(error)
		})
	})
}