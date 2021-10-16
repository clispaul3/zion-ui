/**
 * @description 控件数据模型
 */
import { IProps, defaultText } from "../../../@types/Tag"
import { BaseModel } from "../../base"
import { ReactNode } from 'react'
import { IObservableObject } from 'mobx'
import { EventHandlerParams } from "../../../@types/Base"

export class Model extends BaseModel implements IProps {
	text?: string
	type?: "success" | "warn" | "warning" | "processing" | "error" | "waiting"
	closable?: boolean
	closeIcon?: string
	color?: string
	icon?: ReactNode

	onClose?: (params: EventHandlerParams, state: IObservableObject) => void

	constructor(props: any = {}) {
		super(props)
		this.text = props.text || defaultText
		this.type = props.type
		this.closable = props.closable
		this.closeIcon = props.closeIcon
		this.color = props.color
		this.icon = props.icon

		this.onClose = props.onClose
	}
}
