import { BaseFormModel } from "../../base"
import { IObservableObject } from "mobx"
import { IProps } from "../../../@types/SpanInput"
import { EventHandlerResult } from "../../../@types/Base"

export class Model extends BaseFormModel implements IProps {
	value?: any
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

	constructor(props: IProps) {
		super(props)
		this.onPressEnter = props.onPressEnter
		this.onBlur = props.onBlur
		this.onClick = props.onClick
		this.onEdit = props.onEdit
		this.value = props.value || ""
		this.maxLength = props.maxLength
		this.showEdit = props.showEdit || false
		this.href = props.href
		this.allowSpace = props.allowSpace || false
		this.showInput = props.showInput || false
		this.autoValidate = props.autoValidate
		this.autoFocus = props.autoFocus
		this.showTitle = props.showTitle
	}
}
