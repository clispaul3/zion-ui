import { IBaseModel, EventHandlerResult } from "./Base"
import { CSSProperties, ReactNode } from "react"
import { IObservableObject } from "mobx"

export interface IProps extends IBaseModel {
	// UI属性
	title?: string | ReactNode
	content?: ReactNode
	footer?: ReactNode | null
	fullScreen?: boolean
	allowDrag?: boolean
	allowResize?: boolean
	allowFullScreen?: boolean
	top?: string
	width?: string
	height?: string
	keyboard?: boolean
	maskClosable?: boolean
	showMask?: boolean
	maskStyle?: CSSProperties
	zIndex?: number
	visible?: boolean
	okText?: ReactNode | string
	cancelText?: ReactNode | string

	// 事件属性
	onOk?: (params: EventHandlerResult, state: IObservableObject) => void
	onConfirm?: (params: EventHandlerResult, state: IObservableObject) => void
	onCancel?: () => void
	onClose?: () => void
}

export interface StaticFuncProps {
	title: string | ReactNode
	content: string | ReactNode
	onCancel?: () => void
	onOk?: () => void
	okText?: ReactNode | string
	cancelText?: ReactNode | string
}

export const defaultClassName = "zion-ui-popmodal"

export const resizeIconClassName = "zion-ui-popmodal-resize"

export const defaultModalTitile = "弹窗标题"

export const defaultCancelText = "关闭"

export const defaultOkText = "确定"

export const defaultPositionTop = "30px"

export const defaultWidth = "50%"

export const defaultHeight = "50%"

export const defaultMinHeight = 200

export const defaultMinWidth = 200

export const defaultMaskStyle = {
	backgroundColor: "rgba(0,0,0,0.1)"
}

export const closeIconStyle: CSSProperties = {
	position: "absolute",
	cursor: "pointer",
	right: "0px",
	top: "50%",
	fontSize: "12px",
	transform: "translateY(-50%)"
}

export const fullIconStyle: CSSProperties = {
	position: "absolute",
	cursor: "pointer",
	right: "20px",
	top: "50%",
	fontSize: "10px",
	transform: "translateY(-50%)"
}

