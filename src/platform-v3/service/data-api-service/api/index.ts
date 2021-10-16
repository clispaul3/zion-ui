import DataApiService from "../http-request"
import Cookie from "js-cookie"

// 添加全局请求拦截器
DataApiService.addInterceptor({
	url: "*",
	reqInterceptor: function (config: any) {
		if (config.url.indexOf("auth/webLogin") >= 0 || config.url.indexOf("/login") >= 0) return config
		const tokenId = Cookie.get("saas_tokenId")
		if (tokenId) {
			config.headers.Authorization = "Bearer " + tokenId
		} else {
			console.warn("cookie中的saas_tokenId不能为空")
		}
		config.timeout = 180000  // 添加超时
		return config
	}
});


export default DataApiService


