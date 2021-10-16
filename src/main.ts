/**
 * @description 项目入口文件
 */
import "babel-polyfill";
import LoadResource from "./resource/LoadResource";
import { baseResources, pagenameReousource } from "./resource";
import { platformV2 } from "./platform-v2/platformV2"
import { DataApiService } from "v2"

DataApiService.autoLogin("H02477", "123456", "10.6.2.56")
// DataApiService.autoLogin("200014", "Abc123456", "10.6.2.33")

async function load(params) {
	console.time("基础资源加载耗时");
	await LoadResource.load(baseResources as any);
	console.timeEnd("基础资源加载耗时");
	await LoadResource.load(params);
}
window.onload = function () {
	platformV2();
	const searchObj = new URLSearchParams(location.search);
	const pagename = searchObj.get("moduleName") || searchObj.get("pagename") || "";
	load(pagenameReousource[pagename]);
};
