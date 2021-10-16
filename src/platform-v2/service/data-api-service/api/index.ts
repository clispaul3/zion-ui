import DataApiService from "../http-request"
import Cookie from "js-cookie"

// 添加全局请求拦截器
DataApiService.addInterceptor({
	url: "*",
	reqInterceptor: function (config: any) {
		if (config.url.indexOf("auth/webLogin") >= 0) return config
		const tokenId = Cookie.get("tokenId")
		if (tokenId) {
			config.headers.Authorization = "Bearer " + tokenId
		} else {
			console.warn("cookie中的tokenId不能为空")
		}
		config.timeout = 0  // 添加超时
		return config
	}
});

// 当请求地址匹配(精确匹配)到以下地址时，请求结果不会被拦截
const filterResInterceptor = [
	"/api/restApi/api/ESBCallFunc",
	"/dpApi/dp/business/output2excel/download",
	"api/restApi/authority/getPageAuthority",
	"/FrontEndLogger/invoke/async",
	"/api/restApi/personalCenter/getDetails.htm",         // 获取个人详细信息
	"/api/restApi/personalCenter/getHeadAppearPath.htm",  // 获取个人头像
	"/api/restApi/personalCenter/uploadHeadAppear.htm",   // 修改个人头像
	"/api/dataTree/getAllTable.htm",                      // 获取数据表
];
filterResInterceptor.forEach(url => {
	DataApiService.addInterceptor({
		url,
		resInterceptor: function (response: any) {
			return response
		}
	})
});

// 添加接口返回数据格式(模糊匹配)
["videoApi/", "api/restApi", "dpApi/", "authorityApiV2/", "hba/", "ProjMgBusiness/"].forEach(item => {
	DataApiService.addResBodyConfig({
		url: item,
		message: "message",
		dataKey: "result",
		success: {
			key: "code",
			value: 0
		}
	})
});
// 添加接口返回数据格式(模糊匹配)
["/Schedule/api"].forEach(item => {
	DataApiService.addResBodyConfig({
		url: item,
		message: "ExceptionMsg",
		dataKey: "Data",
		success: {
			key: "IsSuccess",
			value: true
		}
	})
})

export default DataApiService


