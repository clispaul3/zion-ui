import { IProps, IRowItem } from "../../../@types/DetailForm"
import { BaseModel } from "../../base"

export class Model extends BaseModel implements IProps {
	data: Object
	rows: IRowItem[]
	layout: {
		wrapperCol: { span: number }
		labelCol: { span: number }
	}
	constructor(props: any = {}) {
		super(props)
		this.data = props.data || {}
		this.rows = props.rows || []
		this.layout = props.layout || {
			wrapperCol: { span: 18 },
			labelCol: { span: 6 }
		}
	}
}

export default Model