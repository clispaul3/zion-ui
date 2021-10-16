import { ReactNode } from "React"
import { IBaseFormModel, EventHandlerResult } from "./Base"
import { IObservableObject } from "mobx"

export interface IProps extends IBaseFormModel {
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
}

export const defaultClassName = "zion-ui-input"