import { BaseFormModel } from "../../base"
import { IProps } from "../../../@types/ColorPicker"

export class Model extends BaseFormModel implements IProps {
	value?: string

	constructor(props: any = {}) {
		super(props)
		this.value = props.value || "#eee"
	}
}
