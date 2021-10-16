/**
 * @description 状态管理服务
 */
import {
	IStateManage,
	IStateManageSelect,
	IStateManageUpdate
} from "../../@types/StateManage"
import { IObservableObject, toJS, set, isObservableObject } from 'mobx'
import Lodash from "lodash"

class StateManage implements IStateManage {
	private store: { [key: string]: any }
	constructor() {
		this.store = Object.create(null)
	}

	// 清空所有实例对象
	clearAll() {
		this.store = Object.create(null)
	}

	// 删除实例对象
	deleteState(key: string) {
		this.store[key] = null
		delete this.store[key]
	}

	// 判断是否有某实例对象
	has(key: string) {
		if (this.store[key]) return true
		return false
	}

	// 添加实例对象
	addState(key: string, state: IObservableObject) {
		this.store[key] = state
	}

	// 查找控件的属性值 
	public select(params: IStateManageSelect | IStateManageSelect[]): any {
		const result: any = {}
		const self = this
		function getKeyValue(param: { property: object, target: string | string[] }) {
			let { property, target } = param
			if (typeof target === "string") {
				target = [target]
			}
			const targetObj = isObservableObject(property) ? property : self.store[property as any]
			const JSObj: any = toJS(targetObj)
			const controlKey = JSObj["controlKey"] || JSObj["namespace"]
			result[controlKey] = {}
			target.forEach(key => {
				result[controlKey][key] = Lodash.get(JSObj, key)
			})
		}
		if (params instanceof Array) {
			params.forEach((item) => {
				getKeyValue(item as any)
			})
		} else {
			getKeyValue(params as any)
		}
		return result
	}

	// 修改控件的属性值
	public update(params: IStateManageUpdate | IStateManageUpdate[], isForceUpdate?: boolean): void {
		const self = this
		function setKeyValue(param: { property: object, target: { [key: string]: any } }) {
			const { property, target } = param
			const targetObj = isObservableObject(property) ? property : self.store[property as any]
			const JSObj: any = toJS(targetObj)
			if (!JSObj) return
			let isEqual = true
			const watcher = JSObj["watcher"]
			Object.keys(target).forEach(key => {
				const prev = Lodash.get(JSObj, key)
				if (watcher && watcher[key] && typeof watcher[key] === "function") {
					watcher[key](prev, target[key])
				}
				if (isForceUpdate) {
					Lodash.set(JSObj, key, target[key])
				} else {
					if (!Lodash.isEqual(prev, target[key])) {
						isEqual = false
						Lodash.set(JSObj, key, target[key])
					}
				}
			})
			if (isForceUpdate) {
				set(targetObj, JSObj)
			} else {
				if (!isEqual) {
					set(targetObj, JSObj)
				}
			}
		}
		if (params instanceof Array) {
			params.forEach(item => {
				setKeyValue(item as any)
			})
		} else {
			setKeyValue(params as any)
		}
	}
	// 查询单个控件的属性
	public get(obj: IObservableObject | string, key?: string | string[]): any {
		const target = isObservableObject(obj) ? obj : this.store[obj]
		if (!key) {
			return toJS(target)  // 查询所有属性
		}
		let result: any = {}
		const JSObj = toJS(target)
		if (typeof key === "string") {
			result = Lodash.get(JSObj, key)
		} else {
			key.forEach(item => {
				result[item] = Lodash.get(JSObj, item)
			})
		}
		return result
	}
	// 设置单个控件的属性
	public set(obj: IObservableObject | string, target: { [key: string]: any }, isForceUpdate?: boolean): void {
		this.update({ property: obj, target }, isForceUpdate)
	}
}
const instance = new StateManage()
export default instance
