import { BaseFormModel } from "../../base"
import { IProps } from "../../../@types/Slider";
import { ReactNode } from "react"

export class Model extends BaseFormModel implements IProps {
	value?: number
	placement?: "vertical" | "inline"
	min?: number
	max?: number
	tooltip?: {
		content?: (value) => ReactNode | string
		placement?: "top" | "left" | "right" | "bottom" | "topLeft" | "topRight" | "bottomLeft" | "bottomRight" | "leftTop" | "leftBottom" | "rightTop" | "rightBottom"
	}

	constructor(props: any = {}) {
		super(props)
		this.value = props.value
		this.placement = props.placement
		this.min = props.min || 0
		this.max = props.max || 100
		this.tooltip = props.tooltip || {}
	}
}
