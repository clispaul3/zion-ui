import { BaseModel } from "../../base"
import { IFormConfig, IProps, IFormItem } from "../../../@types/Form"

export class Model extends BaseModel implements IProps {
	formConfig?: IFormConfig | undefined;
	formItemConfig?: IFormItem[] | []
	status?: "insert" | "update" | "detail"
	constructor(props: IProps) {
		super(props)
		this.formConfig = props.formConfig || {}
		this.formItemConfig = props.formItemConfig || []
		this.status = props.status || "insert"
	}
}

export default Model