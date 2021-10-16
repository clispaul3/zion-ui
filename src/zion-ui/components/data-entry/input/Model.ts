/**
 * @description 文本框控件数据模型
 */
import { BaseFormModel } from "../../base"
import { ReactNode } from 'react'
import { IProps } from "../../../@types/Input"
import { IObservableObject } from "mobx"
import { EventHandlerResult } from "../../../@types/Base"

export class Model extends BaseFormModel implements IProps {
	// UI属性
	type?: "input" | "textArea" | "search" | "password" | "number"
	prefix?: string | ReactNode
	suffix?: string | ReactNode
	addonAfter?: string | ReactNode
	addonBefore?: string | ReactNode
	enterButton?: boolean | ReactNode
	loading?: boolean
	visibilityToggle?: boolean
	autoSize?: boolean | { minRows?: number, maxRows?: number }
	allowSpace?: boolean
	disableOnChange?: boolean
	showTitle?: boolean
	autoFocus?: boolean

	// 数据属性
	maxLength?: number
	min?: number
	max?: number
	onlyInt?: boolean

	// 事件属性
	onPressEnter?: (params: EventHandlerResult, mobxProps: IObservableObject) => void
	onSearch?: (params: EventHandlerResult, mobxProps: IObservableObject) => void
	onFocus?: (params: EventHandlerResult, mobxProps: IObservableObject) => void
	onBlur?: (params: EventHandlerResult, mobxProps: IObservableObject) => void
	onClick?: (params: EventHandlerResult, mobxProps: IObservableObject) => void

	constructor(props: any) {
		super(props)
		this.onClick = props.onClick || null
		this.onPressEnter = props.onPressEnter || null
		this.onSearch = props.onSearch || null
		this.prefix = props.prefix || null
		this.suffix = props.suffix || null
		this.addonAfter = props.addonAfter || null
		this.addonBefore = props.addonBefore || null
		this.maxLength = props.maxLength || null
		this.type = props.type || "input"
		this.autoSize = props.autoSize === false ? false : props.autoSize
		this.loading = props.loading || false
		this.enterButton = props.enterButton || null
		this.visibilityToggle = props.visibilityToggle || false
		this.onFocus = props.onFocus || null
		this.onBlur = props.onBlur || null
		this.min = (props.min || props.min === 0) ? props.min : -Infinity
		this.max = (props.max || props.max === 0) ? props.max : Infinity
		this.disableOnChange = props.disableOnChange || false
		this.showValue = props.showValue || props.value
		this.onlyInt = props.onlyInt === false ? false : true
		if (props.allowSpace) {
			this.allowSpace = true
		} else {
			if (this.type?.toLowerCase() === "textarea") {
				this.allowSpace = true
			} else {
				this.allowSpace = false
			}
		}
		this.autoValidate = props.autoValidate
		this.autoFocus = props.autoFocus
		this.showTitle = props.showTitle
	}
}
