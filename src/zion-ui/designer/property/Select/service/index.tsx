import { BaseService } from "../../Base/BaseService"
import { StateManage } from "zion-ui"
import { CodePreview } from "../../../components/CodePreview"

export class Service extends BaseService {
	constructor({ controlKey }) {
		super({ controlKey })
	}
	dataSource_onClick = ({ }, state) => {
		CodePreview({
			code: StateManage.get(state, "value") || "{}",
			language: "json",
			modalProps: {
				title: "设置数据源",
				width: "600px",
				height: "70%",
				top: "20px",
				onOk: ({ value }) => {
					this.attr_change({ value: JSON.parse(value), attr: "dataSource" })
					StateManage.set(state, { value, showValue: value })
				}
			}
		})
	}
}
