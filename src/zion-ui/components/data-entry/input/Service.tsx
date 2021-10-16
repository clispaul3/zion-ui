import React from "react"
import { Input, InputNumber } from "antd"
import { defaultClassName } from "../../../@types/Input"
import { BaseService } from "../../base"
import { MouseEventType, EventHandlerParams } from "../../../@types/Base"
import debounce from "lodash/debounce"

export class Service extends BaseService {
	constructor(props: Object, isPureComponent?: boolean) {
		super(props, isPureComponent)
	}
	/**
	 * @description 根据allowSpace配置,决定是否去除首尾空格
	 */
	trimValue(value: string) {
		const { allowSpace, type } = this.getProps()
		if (!allowSpace && type.toLowerCase() !== "number") {   // 是否保留首尾空格,默认false
			value = value.trim()
		}
		return value
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
		ev && ev.stopPropagation && ev.stopPropagation()
		if (disabled || loading) return;
		(this as any)[eventName]({ ev, eventName })
	}
	/**
	 * @description onChange事件
	 */
	onChange(params: EventHandlerParams) {
		const { ev, eventName } = params
		let value: any = ""
		if (typeof ev !== "object") {
			value = ev
		} else {
			value = ev ? (ev.target as any).value : null
		}
		const { onChange, disableOnChange, onlyInt, type, min } = this.getProps()
		if ((type.toLowerCase()) === "number" && onlyInt) {
			value = parseInt(value)
		}
		if ((type.toLowerCase()) === "number" && isNaN(value)) {
			value = (min && min === 0) || 1
		}
		if (disableOnChange) return
		value = this.trimValue(value)
		if (!this.isPureComponent) {
			this.setProps({ showValue: value, value })
		}
		onChange && onChange({ ev: typeof ev === "object" ? ev : null, eventName, value }, this.props)
	}
	/**
	 * @description 点击回车键时触发
	 * @param ev 
	 */
	onPressEnter(params: EventHandlerParams) {
		const { ev, eventName } = params
		let value: string = ""
		if (typeof ev !== "object") {
			value = ev
		} else {
			value = ev ? (ev.target as any).value : null
		}
		const { onPressEnter } = this.getProps()
		onPressEnter && onPressEnter({ ev: typeof ev === "object" ? ev : null, eventName, value }, this.props)
	}
	/**
	 * @description 点击搜索按钮时触发
	 * @param ev 
	 */
	onSearch(params: EventHandlerParams) {
		const { ev, eventName } = params
		let value: string = ""
		if (typeof ev !== "object") {
			value = ev
		} else {
			value = ev ? (ev.target as any).value : null
		}
		const { onSearch } = this.getProps()
		onSearch && onSearch({ ev: typeof ev === "object" ? ev : null, eventName, value }, this.props)
	}
	/**
	 * @description onClick事件回调
	 * @param ev 
	 */
	onClick(params: EventHandlerParams) {
		const { ev, eventName } = params
		const { onClick, value } = this.getProps()
		onClick && onClick({ ev: typeof ev === "object" ? ev : null, eventName, value }, this.props)
	}
	/**
	 * @description onFocus事件回调
	 * @param ev 
	 */
	onFocus(params: EventHandlerParams) {
		const { ev, eventName } = params
		const { onFocus, value } = this.getProps()
		onFocus && onFocus({ ev: typeof ev === "object" ? ev : null, eventName, value }, this.props)
	}
	/**
	 * @description onBlur事件回调
	 * @param ev 
	 */
	onBlur(params: EventHandlerParams) {
		const { ev, eventName } = params as any
		let { onBlur, value, type } = this.getProps()
		if ((type.toLowerCase()) === "number") {
			value = Number(value) * 1
			ev.target.value = value
			this.setProps({ value })
		}
		onBlur && onBlur({ ev: typeof ev === "object" ? ev : null, eventName, value }, this.props)
	}
	/**
	 * @description 渲染 placeholder
	 */
	renderPlaceholder() {
		let { placeholder, maxLength } = this.getProps()
		if (placeholder) return placeholder
		if (!!maxLength) {
			return "最多输入" + maxLength + "个字符"
		}
		return ""
	}
	/**
	 * @description 获取组件模板
	 */
	getTemplate() {
		let {
			show,
			style,
			showTitle,
			autoFocus,
			disabled,
			allowClear,
			prefix,
			addonAfter,
			showValue,
			addonBefore,
			maxLength,
			size,
			suffix,
			value,
			type = "input",
			autoSize,
			enterButton,
			loading,
			visibilityToggle,
			min,
			max,
		} = this.getProps()
		if (!show) return null
		const className = this.getClassName()
		let targetProps: any = {
			style,
			autoFocus,
			className: className.join(" "),
			placeholder: this.renderPlaceholder.call(this),
			size,
			disabled,
			allowClear,
			prefix,
			addonAfter,
			addonBefore,
			maxLength,
			suffix,
			onChange: (ev: React.MouseEvent<HTMLElement>) => this.eventHandler({ ev, eventName: MouseEventType.onChange }),
			onClick: debounce((ev: React.MouseEvent<HTMLElement>) => this.eventHandler({ ev, eventName: MouseEventType.onClick }), 300),
			onPressEnter: (ev: React.MouseEvent<HTMLElement>) => this.eventHandler({ ev, eventName: MouseEventType.onPressEnter }),
			onFocus: (ev: React.MouseEvent<HTMLElement>) => this.eventHandler({ ev, eventName: MouseEventType.onFocus }),
			onBlur: (ev: React.MouseEvent<HTMLElement>) => this.eventHandler({ ev, eventName: MouseEventType.onBlur })
		}
		if (this.isPureComponent) {
			targetProps.value = !value ? "" : (showValue || value)
		} else {
			targetProps.value = !value ? "" : (showValue || value)
		}
		let TargetControl: any
		switch (type.toLowerCase()) {
			case "textarea":
				TargetControl = Input.TextArea
				delete targetProps.addonBefore
				delete targetProps.addonAfter
				Object.assign(targetProps, {
					autoSize
				})
				break
			case "search":
				TargetControl = Input.Search
				Object.assign(targetProps, {
					onSearch: (ev: React.MouseEvent<HTMLElement>) => this.eventHandler({ ev, eventName: MouseEventType.onSearch }),
					enterButton: enterButton || true,
					loading
				})
				break
			case "password":
				TargetControl = Input.Password
				Object.assign(targetProps, {
					visibilityToggle
				})
				break
			case "number":
				TargetControl = InputNumber
				delete targetProps.addonBefore
				delete targetProps.addonAfter
				delete targetProps.allowClear
				Object.assign(targetProps, {
					min, max, value
				})
				break
			case "input":
			default:
				TargetControl = Input
		}
		if (showTitle) {
			targetProps.title = showValue || value
		}
		const InputTpl = <TargetControl {...targetProps} />
		return this.getFormItem(InputTpl)
	}
}
