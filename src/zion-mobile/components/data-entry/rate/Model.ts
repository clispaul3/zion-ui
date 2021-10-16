import { BaseFormModel } from "../../base"
import { IProps } from "../../../@types/Rate"
import { ReactNode } from "react"

export class Model extends BaseFormModel implements IProps {
	allowClear?: boolean
	allowHalf?: boolean
	character?: ReactNode
	count?: number
	value?: number
	color?: string
	disabled?: boolean
	onHoverChange?: (value: number) => any
	tooltips?: string[]

	constructor(props: any = {}) {
		super(props)
		this.allowClear = props.allowClear === false ? false : true
		this.allowHalf = props.allowHalf || false
		this.character = props.character || null
		this.count = props.count || 5
		this.value = props.value || 0
		this.disabled = props.disabled || false
		this.onChange = props.onChange || null
		this.onHoverChange = props.onHoverChange || null
		this.color = props.color || "#fadb14"
		this.tooltips = props.tooltips || []
	}
}
