import pagenames from "../config/pagename.json";
import customerMap from "../config/pageResource.json";
import baseResources from "../config/baseResource.json";

const pagenameReousource = { ...customerMap }
// 根据pagename加载对应的js资源
Object.keys(pagenames).forEach(key => {
	if (pagenames[key].length > 0) {
		pagenames[key].forEach(pagename => {
			const fullPagename = key + "." + pagename
			pagenameReousource[fullPagename] = [
				{ tagName: "script", url: "./js/page/" + fullPagename + ".js" },
			]
			if (customerMap[fullPagename]) {
				pagenameReousource[fullPagename].push(...customerMap[fullPagename])
			}
		})
	} else {  // 单页面应用的资源加载
		pagenameReousource[key] = [
			{ tagName: "script", url: "./js/page/" + key + ".js" },
		]
		if (customerMap[key]) {
			pagenameReousource[key].push(...customerMap[key])
		}
	}
})
export {
	baseResources, pagenameReousource
}