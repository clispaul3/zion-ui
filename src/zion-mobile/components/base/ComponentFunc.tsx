/**
 * @description 组件函数
 */
import { useEffect, ReactNode } from "react"
import { observer } from "mobx-react"
import { StateManage } from "../../service/state"
import { PropertyService } from "../../service/property"
import { IObservableObject } from "mobx"

interface IProps {
	props: { controlKey?: string, namespace?: string, [key: string]: any },
	bool?: boolean
	Model: any
	Service: any
}

export const ComponentFunc = function (params: IProps): ReactNode | [IObservableObject, ReactNode] {
	const { props, bool, Model, Service } = params
	const mobxProps = PropertyService.getControlProps(Model, props)
	if (props.controlKey || props.namespace) {
		const key: any = props.controlKey || props.namespace
		StateManage.addState(key, mobxProps)
	}
	const isPureComponent = typeof bool !== "boolean"
	let _service: any
	if (isPureComponent) {
		_service = new Service(new Model(props), isPureComponent)
		return _service.getTemplate()
	}
	_service = new Service({ mobx: mobxProps }, isPureComponent)
	let renderCount = 0

	const Template = observer(() => {
		useEffect(() => {
			const { didMount } = StateManage.get(mobxProps)
			if (didMount && typeof didMount === "function") {
				didMount(mobxProps)
			}
		}, [])

		useEffect(() => {
			const { observer: observerFn } = StateManage.get(mobxProps)
			if (observerFn && typeof observerFn === "function") {
				++renderCount
				observerFn(renderCount, mobxProps)
			}
		})
		return _service.getTemplate()
	})
	if (bool === true) return Template
	if (bool === false) return [mobxProps, Template]
	return null
}
