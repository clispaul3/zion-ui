import React from "react";
import { Slider } from "antd";
import { BaseService } from '../../base';
import { defaultClassName } from "../../../@types/Slider";
import { EventHandlerResult, MouseEventType } from "../../../@types/Base";
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
	eventHandler(params: EventHandlerResult) {
		const { ev, eventName } = params
		const { disabled, loading } = this.getProps()
		ev && ev.stopPropagation && ev.stopPropagation()
		if (disabled || loading) return;
		(this as any)[eventName]({ ev, eventName })
	}
	onChange(value) {
		const { onChange } = this.getProps()
		if (!this.isPureComponent) {
			this.setProps({ value })
		}
		if (onChange && typeof onChange === "function") {
			onChange({ ev: null, value, eventName: MouseEventType.onChange }, this.props)
		}
	}
	/**
	 * @description 获取组件模板
	 */
	getTemplate() {
		let { disabled, placement, min, max, tooltip, show, style, value } = this.getProps()
		if (!show) return null
		const className = this.getClassName()
		const nextProps: any = {
			onChange: this.onChange.bind(this),
			style,
			className: className.join(" "),
			disabled,
			tooltipPlacement: tooltip.placement,
			tipFormatter: tooltip.content,
			vertical: placement === "vertical" ? true : false,
			min,
			max,
			value,
			range: false
		}
		if (tooltip.hasOwnProperty("visible")) {
			nextProps.tooltipVisible = tooltip.visible
		}
		const Template = <Slider {...nextProps} />
		return this.getFormItem(Template)
	}
}
