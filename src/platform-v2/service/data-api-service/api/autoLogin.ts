/**
 * @description 自动登录
 */
import { webLogin } from './webLogin'

export const autoLogin = function (username: string, password: string, ip: string) {
	if (location.hostname === ip) {
		webLogin(username, password)
	}
}
