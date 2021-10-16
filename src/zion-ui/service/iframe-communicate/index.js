/**
 * @author zhangyb
 * iframe页面之间通信
 */
function validator(topic, data) {
	if (typeof data !== "object") {
		throw new Error("data必须是一个对象")
	}
	if (!topic) {
		throw new Error("topic未指定")
	}
	if (typeof topic !== "string") {
		throw new Error("topic必须是一个字符串")
	}
}
export const IframeCommunicate = {
	/**
	 * 向父页面发送消息
	 * @param {String} topic 通信主题
	 * @param {Object} data 向父页面发送的数据
	 */
	toParentPage(topic, data = {}) {
		if (!window.parent.window) return
		validator(topic, data)
		window.parent.window.postMessage({ ...data, topic }, "*")
	},
	/**
	 * 向子页面发送消息
	 * @param {String} container 放置子页面的iframe选择器
	 * @param {String} topic 通信主题
	 * @param {Object} data 向子页面发送的数据
	 */
	toChildPage(container, topic, data = {}) {
		const iframe = document.querySelector(container)
		if (!iframe) {
			throw new Error("当前页面不存在该选择器" + container)
		}
		validator(topic, data)
		const childPage = iframe.contentWindow
		childPage.postMessage({ ...data, topic }, "*")
	},
	/**
	 * 监听父页面或子页面发送过来的消息
	 * @param {Array} topic 订阅的主题
	 * @param {Function} listener 回调函数 
	 */
	addListener(listener) {
		window.addEventListener("message", listener)
	},
	removeListener(listener) {
		window.removeEventListener("message", listener)
	}
}
