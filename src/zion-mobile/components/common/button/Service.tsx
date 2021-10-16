import React from "react"
import { defaultClassName, ButtonTypes, typeStyleMap } from "../../../@types/Button"
import { MouseEventType, EventHandlerParams } from "../../../@types/Base"
import { Button } from "antd"
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
		const { ev, eventName } = params
		const { disabled, loading } = this.getProps()
		ev?.stopPropagation()
		if (disabled || loading) return
		const { onClick } = this.getProps()
		if (eventName === MouseEventType.onClick) {
			onClick && onClick({ ev, eventName }, this.props)
		}
	}
	/** 
	 * @description 获取按钮类型
	 */
	private getType(type: ButtonTypes = "default"): ButtonTypes {
		if (["success", "warn", "warning", "info"].includes(type)) {
			return "default"
		}
		return type
	}
	/**
	 *@description 根据按钮类型，格式化样式
	 */
	private formatStyle(prevStyle: object = {}, type: string = "default") {
		const nextStyle = { ...prevStyle }
		if (type === "success") {
			Object.assign(nextStyle, typeStyleMap.success, prevStyle)
			return nextStyle
		}
		if (type === "warn" || type === "warning") {
			Object.assign(nextStyle, typeStyleMap.warning, prevStyle)
			return nextStyle
		}
		if (type === "info") {
			Object.assign(nextStyle, typeStyleMap.info, prevStyle)
		}
		if (JSON.stringify(nextStyle) === "{}") return prevStyle
		return nextStyle
	}
	/**
	 * @description 获取组件模板
	 */
	getTemplate() {
		let {
			text, type, size, show, style, icon, disabled,
			loading, href, target, controlKey, shape, children
		} = this.getProps()
		if (!show) return <></>
		style = this.formatStyle(style, type)
		type = this.getType(type)
		const className = this.getClassName()
		return <Button
			data-key={controlKey || null}
			size={size}
			style={style}
			disabled={disabled}
			href={href}
			target={target}
			type={type}
			shape={shape}
			icon={icon}
			loading={loading}
			onClick={(ev) => this.eventHandler({ ev, eventName: MouseEventType.onClick })}
			className={className.join(" ")}>
			{children || text}
		</Button>
	}
}
