import React, { CSSProperties, ReactNode } from "react"
import { Input } from "antd"
import { FormOutlined } from '@ant-design/icons';
import { BaseService } from "../../base"
import { defaultClassName, spanStyle, inputStyle } from "../../../@types/SpanInput"
import { EventHandlerParams, MouseEventType } from "../../../@types/Base"
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
		ev && ev.stopPropagation && ev.stopPropagation();
		(this as any)[eventName]({ ev, eventName })
	}

	/** 
	 * @description 根据allowSpace配置,决定是否去除首尾空格
	 */
	trimValue(value: string) {
		const { allowSpace } = this.getProps()
		if (!allowSpace) {
			value = value.trim()
		}
		return value
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
		const { onChange, autoValidate } = this.getProps()
		value = this.trimValue(value)
		if (!this.isPureComponent) {
			this.setProps({ showValue: value, value })
			if (autoValidate) {
				this.setProps({ validate: { status: value ? "success" : "error" } })
			}
		}
		if (onChange) {
			onChange({ ev: typeof ev === "object" ? ev : null, eventName, value }, this.props)
		}
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
		this.setProps({ showInput: false })
		onPressEnter && onPressEnter({ ev: typeof ev === "object" ? ev : null, eventName, value }, this.props)
	}

	/**
	 * @description onBlur事件回调
	 * @param ev 
	 */
	onBlur(params: EventHandlerParams) {
		const { ev, eventName } = params
		const { onBlur, value } = this.getProps()
		this.setProps({ showInput: false })
		onBlur && onBlur({ ev: typeof ev === "object" ? ev : null, eventName, value }, this.props)
	}

	/**
	 * @description 点击编辑按钮事件回调
	 * @param ev 
	 */
	onEdit(params: EventHandlerParams) {
		this.setProps({ showInput: true })
		const { ev, eventName } = params
		const { onEdit, value } = this.getProps()
		onEdit && onEdit({ ev: typeof ev === "object" ? ev : null, eventName, value }, this.props);
	}

	/**
	 * @description onClick
	 */
	onClick(params: EventHandlerParams) {
		const { onClick, value, href } = this.getProps()
		if (href) return
		if (onClick) {
			const { ev, eventName } = params
			onClick({ ev: typeof ev === "object" ? ev : null, eventName, value }, this.props);
		} else {
			this.setProps({ showInput: true })
		}
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
	 * @description getSpan
	 */
	getSpan(params: { value: string, style: CSSProperties, icon: ReactNode, showEdit: boolean, href: string | undefined }) {
		const { value, style, icon, showEdit, href } = params
		const IconComponent: any = icon ? icon : FormOutlined
		return <div style={{ position: "relative", boxSizing: 'border-box', lineHeight: "24px" }}>
			<a target="_blank"
				href={href}
				onClick={ev => this.eventHandler({ ev, eventName: MouseEventType.onClick })}
				style={{
					...spanStyle,
					...style
				}} title={value} >
				{value}
			</a>
			{showEdit ? <i className="font-edit" style={{ paddingLeft: "5px", position: "absolute", top: "0px", color: "#1890ff" }}>
				<IconComponent onClick={(ev: any) => this.eventHandler({ ev, eventName: MouseEventType.onEdit })} />
			</i> : null}
		</div>
	}
	/**
	 * @description onClear
	 */
	onClear(params: EventHandlerParams) {
		this.setProps({ showInput: true, value: "" })
	}

	/** @description 获取组件模板*/
	getTemplate() {
		let { show, style = {}, maxLength, showEdit, showInput, value, icon, href, placeholder } = this.getProps()
		if (!show) return null
		const className = this.getClassName()
		let targetProps: any = { // 外层元素 props
			style: { ...style, width: "100%" },
			className,
		}

		let inputProps: any = { // input props
			maxLength,
			placeholder: this.renderPlaceholder.call(this),
			onChange: (ev: React.MouseEvent<HTMLElement>) => this.eventHandler({ ev, eventName: MouseEventType.onChange }),
			onPressEnter: (ev: React.MouseEvent<HTMLElement>) => this.eventHandler({ ev, eventName: MouseEventType.onPressEnter }),
			onBlur: (ev: React.MouseEvent<HTMLElement>) => this.eventHandler({ ev, eventName: MouseEventType.onBlur })
		}

		if (this.isPureComponent) {
			inputProps.defaultValue = !value ? "" : value
		} else {
			inputProps.value = !value ? "" : value
		}
		return (
			<div
				{...targetProps}
				className={className.join(" ")}
				onMouseOver={() => {
					this.setProps({ showEdit: true })
				}}
				onMouseLeave={() => {
					this.setProps({ showEdit: false })
				}}>
				{showInput ? <Input {...inputProps} placeholder={placeholder} autoFocus style={{ ...inputStyle, ...style }} bordered={false} /> : this.getSpan({ value, style, icon, showEdit, href })}
			</div>
		)
	}
}
