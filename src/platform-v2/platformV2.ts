import { registerListener } from "./service/registerListener";
import Cookies from "js-cookie";

/** 在main.ts中注入平台的特殊业务处理 */
export const platformV2 = function () {
	registerListener()
	const searchObj = new URLSearchParams(location.search);
	const clientToken = searchObj.get("client_token"); // 通过客户端url拿到的token
	const tokenId = Cookies.get("tokenId");
	if (!tokenId) {
		Cookies.set("tokenId", clientToken);
	};
	/** 根据客户端发送过来的token，写入到cookie */
	(window as any).invokeToolMethod = (type, params, success, fail) => {
		console.log("客户端调用定制页面的回调方法进行token续期：", params)
		switch (type) {
			case 4:
				Cookies.remove('client_token');
				Cookies.set('client_token', params);
				Cookies.set('tokenId', params);
			default: break;
		}
	}
};

