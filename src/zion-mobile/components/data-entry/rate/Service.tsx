import React from "react"
import { Rate } from "antd"
import { StarFilled } from '@ant-design/icons'
import { BaseService } from '../../base'
import { defaultClassName } from "../../../@types/Rate"
import { EventHandlerResult, MouseEventType } from "../../../@types/Base"

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
	onHoverChange(value) {
		const { onHoverChange } = this.getProps()
		if (onHoverChange && typeof onHoverChange === "function") {
			onHoverChange(value, this.props)
		}
	}
	/**
	 * @description 获取组件模板
	 */
	getTemplate() {
		let { disabled, allowHalf, color,
			value, count, character, allowClear, tooltips, show, style
		} = this.getProps()
		if (!show) return null
		const className = this.getClassName()
		const Template = <Rate
			value={value}
			onChange={this.onChange.bind(this)}
			style={{ ...style, color }}
			allowHalf={allowHalf}
			allowClear={allowClear}
			count={count}
			className={className.join(" ")}
			tooltips={tooltips}
			disabled={disabled}
			onHoverChange={this.onHoverChange.bind(this)}
			character={character || <StarFilled />}
		/>
		return this.getFormItem(Template)
	}
}
