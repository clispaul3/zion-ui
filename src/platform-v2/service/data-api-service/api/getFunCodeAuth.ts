/**
 * @description 获取权限项授权结果
 */
import { getUserInfo } from "./getUserInfo"
import { selectData } from "./selectData"

interface IParams {
	authCode?: string[]
}

export const getFunCodeAuth = async function (params?: IParams) {
	const { authCode = [] } = params || {}
	const userInfo: any = await getUserInfo()
	const { userRoleInfo } = userInfo
	const result: any = {}
	// 为空时，查找所有有权限的权限项
	if (authCode.length <= 0) {
		const roleIds = userRoleInfo.map((item: any) => item["id"])
		const requestParams = {
			tableName: "auth_role_fun",
			pageSize: 99999,
			filterCondition: [
				["roleid", "in", "&&", roleIds.join(",")]
			]
		}
		const res = await selectData(requestParams)
		res.data.forEach((item: any) => {
			result[item["code"]] = true
		})
		return result
	}
	const adminRole = userRoleInfo.find((item: any) => item["IsRoot"] === "1")
	if (adminRole) {
		authCode.forEach(auth => {
			result[auth] = true
		})
	} else {
		const roleIds = userRoleInfo.map((item: any) => item["id"])
		const filterCondition: any = [
			["roleid", "in", "&&", roleIds.join(",")]
		]
		const codeFilter: any = []
		roleIds.forEach((role: any) => {
			authCode.forEach(code => {
				const filter = ["code", "=", "||", code]
				codeFilter.push(filter)
			})
		})
		filterCondition.push(codeFilter)
		const requestParams = {
			tableName: "auth_role_fun",
			filterCondition,
			pageSize: 99999
		}
		const res = await selectData(requestParams)
		const hasAuthCode = res.data.map((item: any) => item["code"])
		authCode.forEach(code => {
			if (hasAuthCode.includes(code)) {
				result[code] = true
			} else {
				result[code] = false
			}
		})
	}
	return result
}