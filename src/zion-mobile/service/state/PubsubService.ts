/**
 * @description 发布订阅对象
 */
const PubsubService = function () {
	let topics: any = {}
	function publish(topic: string, data: any) {
		if (topics[topic]) {
			for (let fn of topics[topic]) {
				fn(data)
			}
		} else {
			topics[topic] = []
		}
	}
	function subscribe(topic: string, callback: (params?: any) => void) {
		if (!topics[topic]) {
			topics[topic] = []
		}
		let exist = false
		for (let fn of topics[topic]) {
			if (fn == callback) {
				exist = true
			}
		}
		if (exist) return
		topics[topic].push(callback)
		return function unsubscribe() {
			const index = topics[topic].indexOf(callback)
			topics[topic].splice(index, 1)
		}
	}
	function clearAllSub() {
		for (let key in topics) {
			topics[key] = []
		}
	}
	// 清空某个主题的订阅者
	function clearSubsByTopic(topic: string) {
		if (topics[topic]) {
			topics[topic] = []
		}
	}
	return {
		publish,
		subscribe,
		clearSubsByTopic,
		clearAllSub
	}
}()

export default PubsubService
