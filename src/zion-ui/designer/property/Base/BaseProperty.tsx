import React from "react"
import { Collapse } from "antd"
import { PropertyService, StateManage } from "../../../"
import { cloneDeep, get } from "lodash"

interface IBaseProperty {
	controlKey: string
	UIjson?: JSON
	DataJson?: JSON
	EventJson?: JSON
	LifeCycleJson?: JSON
	Property?: object
	Service: Function
}

export const BaseProperty = function (props: IBaseProperty) {
	const { controlKey, UIjson, DataJson, EventJson, LifeCycleJson, Service, Property } = props as any
	const UI_controlKey = controlKey + "@UI"
	const Event_controlKey = controlKey + "@Event"
	const LifeCycle_controlKey = controlKey + "@LifeCycle"
	const Data_controlKey = controlKey + "@Data"
	const JSON_controlKey = controlKey + "@JSON"

	const config = Property || {}
	const uiJson: any = cloneDeep(UIjson)
	const eventJson: any = cloneDeep(EventJson)
	const lifeCycleJson: any = cloneDeep(LifeCycleJson)
	const dataJson: any = cloneDeep(DataJson)
	let allFormItemConfig: any = [];
	[dataJson, uiJson, eventJson, lifeCycleJson].forEach(item => {
		if (item) {
			allFormItemConfig = allFormItemConfig.concat(item.props.formItemConfig)
		}
	})
	// 属性回填
	allFormItemConfig.forEach(item => {
		const field = item["field"]
		let value = get(config, field)
		if (value) {
			item["controlProps"]["props"]["value"] = value
			if (field === "columns" && value.length > 0) {
				item["controlProps"]["props"]["showValue"] = "已配置"
			} else if (field === "buttonConfig" && value.rowButton.length > 0) {
				item["controlProps"]["props"]["showValue"] = "已配置"
			} else if (field === "style" || field === "header" || field === "scroll" || field === "footer") {
				item["controlProps"]["props"]["showValue"] = "已配置"
			}
		}
	})
	if (!StateManage.has(JSON_controlKey)) {
		StateManage.addState(JSON_controlKey, PropertyService.getObservableObj(config))
	}

	return <div>
		<Collapse
			defaultActiveKey={["UI"]}>
			{UIjson ? <Collapse.Panel header={<strong>UI属性</strong>} key="UI" forceRender={true}>
				{PropertyService.getReactElementFromJSON(uiJson, { Service: new Service({ controlKey }), controlKey: UI_controlKey })}
			</Collapse.Panel> : null}
			{DataJson ? <Collapse.Panel header={<strong>数据属性</strong>} key="Data" forceRender={true}>
				{PropertyService.getReactElementFromJSON(dataJson, { Service: new Service({ controlKey }), controlKey: Data_controlKey })}
			</Collapse.Panel> : null}
			{EventJson ? <Collapse.Panel header={<strong>事件属性</strong>} key="Event" forceRender={true}>
				{PropertyService.getReactElementFromJSON(eventJson, { Service: new Service({ controlKey }), controlKey: Event_controlKey })}
			</Collapse.Panel> : null}
			{LifeCycleJson ? <Collapse.Panel header={<strong>生命周期</strong>} key="LifeCycle" forceRender={true}>
				{PropertyService.getReactElementFromJSON(lifeCycleJson, { Service: new Service({ controlKey }), controlKey: LifeCycle_controlKey })}
			</Collapse.Panel> : null}
		</Collapse>
	</div>
}
