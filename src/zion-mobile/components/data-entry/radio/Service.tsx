import React, { CSSProperties, useEffect } from "react"
import { Radio } from "antd"
import { BaseService } from "../../base"
import { defaultClassName, EventHandlerResult, IDataSourceItem } from "../../../@types/Radio"
import { MouseEventType } from "../../../@types/Base"
export class Service extends BaseService {
	verticalStyle: CSSProperties
	constructor(props: Object, isPureComponent?: boolean) {
		super(props, isPureComponent)
		this.isPureComponent = isPureComponent === true ? true : false
		this.verticalStyle = {
			display: 'block',
			height: '30px',
			lineHeight: '30px'
		}
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
	/**
	 * @description onChange事件
	 * @param ev 
	 * @param data 
	 */
	onChange(ev: any, data: IDataSourceItem) {
		ev.stopPropagation()
		const key = data.key
		const { onChange, value, allowCancel } = this.getProps()
		const checked = allowCancel ? !(value == key) : true
		if (!this.isPureComponent) {
			this.setProps({ value: checked ? key : "" })
		}
		if (onChange) {
			onChange({ ev: null, checked, eventName: MouseEventType.onChange, value: checked ? key : "", current: data }, this.props)
		}
	}
	/**
	 * @description 获取组件模板
	 */
	getTemplate() {
		let {
			dataSource,
			value,
			show,
			disabled,
			style,
			placement,
			httpConfig
		} = this.getProps()
		if (!show) return null
		const className = this.getClassName()
		useEffect(() => {
			if (httpConfig && httpConfig.init) {
				httpConfig.init().then((res: IDataSourceItem[]) => {
					this.setProps({ dataSource: res })
				})
			}
		}, [])
		const Template = dataSource.map((item: IDataSourceItem) => {
			return <Radio
				key={item.key}
				value={item.key}
				className={className.join(" ")}
				checked={value == item.key}
				disabled={disabled || item.disabled || false}
				style={placement === "vertical" && !style ? this.verticalStyle : style}
				onClick={(ev) => { this.onChange(ev, item) }}>
				{item.label}
			</Radio>
		})
		return this.getFormItem(Template)
	}
}
