import React from "react"
import { defaultClassName } from "../../../@types/Poptip"
import { MouseEventType, EventHandlerParams } from "../../../@types/Base"
import { Tooltip } from "antd"
import { BaseService } from "../../base"

export class Service extends BaseService {
	constructor(props: Object, isPureComponent?: boolean) {
		super(props, isPureComponent)
	}
	/**
	 * @description 获取类名
	 */
	getClassName() {
		const { className } = this.getProps()
		let nextClassName = super.getClassName(defaultClassName)
		if (className) {
			nextClassName.push(className)
		}
		return nextClassName
	}
	/**
	 * @description 事件处理
	 */
	eventHandler(params: EventHandlerParams) {
		const { ev, eventName } = params as any
		const { disabled, loading } = this.getProps()
		ev.stopPropagation()
		if (disabled || loading) return
		const { onClick } = this.getProps()
		if (eventName === MouseEventType.onClick) {
			onClick && onClick({ ev, eventName }, this.props)
		}
	}
	/**
	 * @description 获取组件模板
	 */
	getTemplate() {
		let { title, placement, content, trigger } = this.getProps()
		const className = this.getClassName()
		return <Tooltip
			className={className.join(" ")}
			placement={placement}
			title={title}
			trigger={trigger}
		>
			{content}
		</Tooltip>
	}
}
