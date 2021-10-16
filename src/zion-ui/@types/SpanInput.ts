import { IBaseFormModel, EventHandlerResult } from "./Base"
import { IObservableObject } from "mobx"
import { CSSProperties } from "react"

export interface IProps extends IBaseFormModel {
	value?: string
	maxLength?: number
	showEdit?: boolean
	href?: string
	allowSpace?: boolean
	showInput?: boolean
	showTitle?: boolean

	onPressEnter?: (params: EventHandlerResult, mobx: IObservableObject) => void
	onBlur?: (params: EventHandlerResult, mobx: IObservableObject) => void
	onEdit?: (params: EventHandlerResult, mobx: IObservableObject) => void
	onClick?: (params: EventHandlerResult, mobx: IObservableObject) => void
}

export const defaultClassName = "zion-ui-span-input"

export const spanStyle: CSSProperties = {
	position: 'relative',
	display: "inline-block",
	width: "90%",
	whiteSpace: "nowrap",
	overflow: "hidden",
	textOverflow: "ellipsis",
	padding: "0px 5px",
	textDecoration: "none",
}

export const inputStyle: CSSProperties = {
	borderBottom: '1px solid #d9d9d9',
	width: '100%',
	boxSizing: 'border-box'
}

export const clearIconStyle: CSSProperties = {
	fontSize: "10px",
	color: "#aaa",
	cursor: "pointer",
	position: "relative",
	right: "5px"
}

export const defaultPlaceholder = "请输入内容"