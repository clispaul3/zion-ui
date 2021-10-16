/**
 * @description 控件属性配置
 */
import { DefaultPropsMap } from "./config"
import { StateManage, PropertyService, Utils } from "../.."
import React from "react"

interface IProperty {
	type: string             // 控件类型
	property?: object        // 对应具体控件的props, 如:{ controlKey: "Button$123456", text: "按钮" }
}

export const Property = function (props: IProperty) {
	const { type, property } = props
	const targetControlKey = type + "$" + Utils.uuid()
	// 获取配置结果
	const getResult = async function () {
		const JSON_controlKey = targetControlKey + "@JSON"
		const configJson = {
			"type": `[[${type}]]`,
			"props": StateManage.get(JSON_controlKey)
		}
		return configJson
	}
	const Target = DefaultPropsMap[type]["component"]
	const state = PropertyService.getObservableObj({ getResult })
	StateManage.addState(targetControlKey, state)
	const Template = () => {
		return <Target controlKey={targetControlKey} property={property} />
	}
	return [state, Template]
}

