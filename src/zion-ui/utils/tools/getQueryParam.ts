/**
 * @description 获取url中的请求参数
 */
export const getQueryParam = (key) => {
	const query = window.location.search.substring(1);
	const vars = query.split("&");
	for (var i = 0; i < vars.length; i++) {
		var pair = vars[i].split("=");
		if (pair[0] == key) { return pair[1]; }
	}
	return null;
}