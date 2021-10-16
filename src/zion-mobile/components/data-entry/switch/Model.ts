import { BaseFormModel } from "../../base"
import { IProps } from "../../../@types/Switch"
import { ReactNode } from "react"

export class Model extends BaseFormModel implements IProps {
	value?: boolean
	checkedChildren?: string | ReactNode
	unCheckedChildren?: string | ReactNode

	constructor(props: any = {}) {
		super(props)
		this.value = props.value
		this.checkedChildren = props.checkedChildren
		this.unCheckedChildren = props.unCheckedChildren
	}
}
