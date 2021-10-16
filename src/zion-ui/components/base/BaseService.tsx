import { IBaseService, EventHandlerParams } from "../../@types/Base"
import { IObservableObject } from "mobx"
import { StateManage } from "../../service/state"
import React, { ReactNode } from "react"
import { Form } from "antd"

export abstract class BaseService implements IBaseService {
	props: IObservableObject | object
	isPureComponent: boolean = false
	constructor(props: { mobx: IObservableObject } | object | any, isPureComponent?: boolean) {
		this.isPureComponent = isPureComponent === true ? true : false
		this.props = !isPureComponent ? props.mobx : props
	}
	// 获取属性
	getProps() {
		return !this.isPureComponent ? StateManage.get(this.props as IObservableObject) : this.props
	}

	// 设置属性
	setProps(nextProps: Object) {
		return StateManage.set(this.props as IObservableObject, nextProps);
	}
	/**
	 * @description 获取id
	 */
	getId() {
		const { id, controlKey } = this.getProps()
		return id || controlKey || null
	}

	/**
	 * @description 获取类名
	 */
	getClassName(defaultClassName: string): string[] {
		let nextClassName: string[] = [defaultClassName]
		const { size, type, className } = this.getProps()
		if (className) {
			nextClassName.push(className)
		}
		if (type) {
			nextClassName.push(defaultClassName + "-" + type)
		}
		if (size) {
			nextClassName.push(defaultClassName + "-" + size)
		}
		return nextClassName
	}

	/**
	 * @description 事件处理函数
	 */
	abstract eventHandler(params: EventHandlerParams): any

	/**
	 * @description 获取组件模板
	 */
	abstract getTemplate(): ReactNode | null

	/**
	 * @descripition getFormItem
	 */
	getFormItem(Template: ReactNode) {
		let { validateResult, label, required, value, autoValidate, validate, layout = {}, hasFeedback } = this.getProps()
		if (validateResult || label || validate || required || autoValidate || layout) {
			validateResult = validateResult || {}
			if (autoValidate) {
				validateResult = { status: (value || "").toString() ? "success" : "error" }
			}
			return <Form {...layout}>
				<Form.Item
					required={required}
					label={label}
					validateStatus={validateResult.status}
					help={validateResult.help}
					hasFeedback={hasFeedback}>
					{Template}
				</Form.Item>
			</Form>
		} else {
			return Template
		}
	}
}
