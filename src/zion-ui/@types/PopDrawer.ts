import { EventHandlerResult, IBaseModel } from "./Base"
import { CSSProperties, ReactNode } from "react"
import { IObservableObject } from "mobx"

export interface IProps extends IBaseModel {
	// UI属性
	title?: string | ReactNode | null
	content?: ReactNode
	footer?: ReactNode | null
	placement?: "right" | "top" | "left" | "bottom"
	width?: string
	height?: string
	keyboard?: boolean
	maskClosable?: boolean
	showMask?: boolean
	maskStyle?: CSSProperties
	zIndex?: number
	visible?: boolean
	cancelText?: string
	okText?: string
	forceRender?: boolean

	// 事件属性
	onOk?: (params: EventHandlerResult, mobxProps: IObservableObject) => void
	onConfirm?: (params: EventHandlerResult, mobxProps: IObservableObject) => void
	onCancel?: () => void
	onClose?: () => void
}

export const defaultClassName = "zion-ui-popdrawer"

export const defaultModalTitile = "弹窗标题"

export const defaultCancelText = "关闭"

export const defaultOkText = "确定"

export const defaultWidth = "30%"

export const defaultHeight = "30%"

export const defaultMaskStyle = {
	backgroundColor: "rgba(0,0,0,0.1)"
}

