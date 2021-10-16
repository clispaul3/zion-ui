import React from "react"
import { defaultClassName } from "../../../@types/Button"
import { Divider } from "antd"
import { BaseService } from "../../base"
import { EventHandlerParams } from "../../../@types/Base"
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
	eventHandler(params: EventHandlerParams) { }

	/**
	 * @description 获取组件模板
	 */
	getTemplate() {
		let { content, dashed, placement, plain, style } = this.getProps()
		const className = this.getClassName()
		return <Divider
			className={className.join(" ")}
			style={style}
			dashed={dashed}
			plain={plain}
			orientation={placement}
		>
			{content}
		</Divider>
	}
}
