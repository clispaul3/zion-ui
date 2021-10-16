/**
 * @description 控件数据模型
 */
import { IProps, defaultCancelText, defaultOkText, defaultPlacement } from "../../../@types/PopConfirm"
import { BaseModel } from "../../base"
import { ReactNode } from 'react'

export class Model extends BaseModel implements IProps {
	title: string
	content: ReactNode
	cancelText?: string
	okText?: string
	icon?: ReactNode
	placement?: "top" | "left" | "right" | "bottom" | "topLeft" | "topRight" | "bottomLeft" | "bottomRight" | "leftTop" | "leftBottom" | "rightTop" | "rightBottom"
	trigger?: "click" | "hover" | "focus"

	onCancel?: () => void
	onConfirm?: () => void

	constructor(props: any = {}) {
		super(props)
		this.cancelText = props.cancelText || defaultCancelText
		this.okText = props.okText || defaultOkText
		this.icon = props.icon || null
		this.title = props.title || null
		this.content = props.content
		this.placement = props.placement || defaultPlacement
		this.onCancel = props.onCancel
		this.onConfirm = props.onConfirm
		this.trigger = props.trigger
	}
}
