import { Http as DataApiService } from "../data-api-service"
import { Loading } from "zion-ui"
import Cookies from "js-cookie"

export const HttpRequest = async function (params: any, loading?: boolean) {
	if (loading !== false) {
		Loading.setGlobalLoading(true)
	}
	const systemInfo = await HttpRequest.getSystemInfo()
	const paasServerUrl = systemInfo.paasServerUrl
	const saasServerUrl = systemInfo.saasServerUrl
	return new Promise((resolve, reject) => {
		const { lesseeCode, applicationCode } = HttpRequest.getAppCode()
		params.url = params.url.replace("lesseeCode", lesseeCode).replace("applicationCode", applicationCode)
		if (/^\/paas/.test(params.url)) {
			params.url = paasServerUrl + params.url
			params.isAbsolute = true
		}
		if (/^\/saas/.test(params.url)) {
			params.url = params.url.replace("/saas", "/hy/saas")
			params.url = saasServerUrl + params.url
			params.isAbsolute = true
		}
		DataApiService.request({ ...params, ignore: true }).then(({ status, data }) => {
			Loading.setGlobalLoading(false)
			if (loading !== false) {
				Loading.setGlobalLoading(false)
			}
			if (status == 200) {
				if (params.ignore === true) {
					resolve(data)
				} else {
					const { code, result, msg, message } = data
					if (code === "00000" || code === "SA0000" || code === 0 || code === "fs00000") {
						resolve(result)
					} else {
						reject(msg || message)
					}
				}
			} else {
				reject("请求失败")
			}
		}).catch(error => {
			Loading.setGlobalLoading(false)
			reject(error)
		})
	})
}

// 获取租户编号和应用编号
HttpRequest.getAppCode = (function () {
	let lesseeCode, applicationCode;
	return function () {
		if (!applicationCode) {
			applicationCode = Cookies.get("applicationCode");
		}
		if (!lesseeCode) {
			lesseeCode = Cookies.get("lesseeCode");
		}
		if (!lesseeCode) {
			// Utils.openLink({ search: "?pagename=LowerCode.pass_platform", isReplace: true })
		}
		return {
			lesseeCode,
			applicationCode,
		};
	};
})();

// 获取系统相关的信息
HttpRequest.getSystemInfo = (function () {
	let systemInfo
	return async function () {
		if (!systemInfo) {
			const { data } = await DataApiService.request({
				url: "./provider-env-config.prod.json",
				method: "GET",
				ignore: true
			})
			systemInfo = typeof data == "string" ? JSON.parse(data) : data
		}
		return systemInfo
	}
})();
