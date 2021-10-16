/**
 * @description 控件数据模型
 */
import { IProps, ButtonTypes, defaultButtonType, defaultButtonText, defaultLinkTarget } from "../../../@types/Button"
import { BaseModel } from "../../base"
import { ReactNode } from 'react'
import { IObservableObject } from 'mobx'
import { EventHandlerParams } from "../../../@types/Base"
export class Model extends BaseModel implements IProps {
	text?: string
	type?: ButtonTypes
	disabled?: boolean
	shape?: "round" | "circle"
	href?: string
	target?: string
	loading?: boolean
	icon?: ReactNode
	onClick?: (params: EventHandlerParams, mobxProps: IObservableObject) => void

	constructor(props: any = {}) {
		super(props)
		this.text = props.text || defaultButtonText
		this.type = props.type || defaultButtonType
		this.disabled = props.disabled || false
		this.shape = props.shape || null
		this.href = props.href || null
		this.target = props.target || defaultLinkTarget
		this.loading = props.loading || false
		this.onClick = props.onClick || null
		this.icon = props.icon || null
	}
}
