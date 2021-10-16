/**
 * @description 登录
 */
import CryptoJS from "crypto-js";
import qs from "qs";
import Cookie from "js-cookie";
import DataApiService from "."

const encrypt = function (word: string, keyStr: string) {
	var key = CryptoJS.enc.Utf8.parse(keyStr);
	var srcs = CryptoJS.enc.Utf8.parse(word);
	var encrypted = CryptoJS.AES.encrypt(srcs, key, { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7 });
	return encrypted.toString();
}
export function webLogin(loginName: string, password: string) {
	const loginInfo = {
		username: loginName,
		password: encrypt(loginName + password, 'flowhysuseraesco'),
		clientType: 4
	}
	return new Promise((resolve, reject) => {
		DataApiService.post('/api/restApi/auth/webLogin', qs.stringify({ ...loginInfo })).then((res: any) => {
			let { expireTime, longToken, userInfo: { loginTime }, tokenId } = res
			let tokenTime = { expireTime, loginTime, longToken }
			Cookie.set('tokenTime', JSON.stringify(tokenTime))
			Cookie.set("tokenId", tokenId)
			Cookie.set("userInfo", res["userInfo"])
			resolve(res)
		}).catch((error: any) => {
			reject(error)
		})
	})
}
