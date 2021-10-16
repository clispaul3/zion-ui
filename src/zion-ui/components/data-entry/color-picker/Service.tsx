import React, { useState } from "react"
import { BaseService } from '../../base'
import { defaultClassName } from "../../../@types/ColorPicker"
import { EventHandlerResult, MouseEventType } from "../../../@types/Base"
import { SketchPicker } from 'react-color'
import { Tooltip, Tag, Button } from "antd"

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
	onChange({ hex }) {
		const value = hex
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
		let { value, show, disabled, style } = this.getProps()
		if (!show) return null
		const [visible, setVisible] = useState(false)
		const ColorPanel = <div style={{ background: "#fff" }}>
			<SketchPicker
				color={value}
				onChangeComplete={this.onChange.bind(this)}
			/>
			<div style={{ borderTop: "1px solid #eee", textAlign: "right", padding: "5px 5px" }}>
				{/* <Button size="small" style={{ marginRight: "10px" }} onClick={() => setVisible(false)}>取消</Button> */}
				<Button size="small" type="primary" onClick={() => setVisible(false)}>确定</Button>
			</div>
		</div>
		const Template = <Tooltip visible={visible} title={ColorPanel} trigger={["click"]}>
			<Tag color={value} style={{ borderRadius: "2px", padding: "10px 15px", ...style, borderColor: value, backgroundColor: value }} onClick={() => {
				if (disabled) return
				setVisible(true)
			}}></Tag>
		</Tooltip>

		return this.getFormItem(Template)
	}
}
