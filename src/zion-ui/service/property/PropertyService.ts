/**
 * @description 属性服务，用于创建可观察的对象
 */
import { IPropertyService, IParams, IJsonConfig } from "../../@types/PropertyService"
import { observable, IObservableObject } from "mobx"
import { getReactElementFromJSON } from "./getReactElementFromJSON"

class PropertyService implements IPropertyService {
	constructor() { }

	// 获取控件的props
	getControlProps(Model: any, props: Object) {
		if (typeof Model !== "function") {
			throw new Error("Model必须是构造函数")
		}
		const mobxProps = observable.object({ ...new Model(props) })
		return mobxProps
	}
	// 获取一个observable对象
	getObservableObj(props: Object): IObservableObject {
		if (Object.prototype.toString.call(props) !== '[object Object]') {
			throw new Error("props必须是字面量对象")
		}
		return observable.object({ ...props }) as unknown as IObservableObject
	}
	// 根据json配置对象获取组件模板
	getReactElementFromJSON(configJSON: IJsonConfig, params?: IParams) {
		return getReactElementFromJSON(configJSON, params)
	}
}
const instance = new PropertyService

export default instance


