import { BaseService } from "../../Base/BaseService"
import { StateManage } from "zion-ui"
import { FormItemConfig } from "../components/FormItemConfig"
export class Service extends BaseService {
	constructor({ controlKey, FuncSetting }) {
		super({ controlKey, FuncSetting })
	}
	formItemConfig_onClick = ({ }: any, state) => {
		console.log(StateManage.get(this.controlKey_JSON))
		FormItemConfig({
			controlKey: this.controlKey,
			config: StateManage.get(this.controlKey_JSON),
			onOk: ({ config }) => {
				console.log(config)
			}
		})
	}
	columns_onChange = ({ value }) => {
		this.attr_change({ attr: "formConfig.columns", value })
	}
	layout_onChange = ({ value }) => {
		this.attr_change({ attr: "formConfig.layout", value })
	}
	labelCol_onChange = ({ value }) => {
		this.attr_change({ attr: "formConfig.labelCol.span", value })
	}
	wrapperCol_onChange = ({ value }) => {
		this.attr_change({ attr: "formConfig.wrapperCol.span", value })
	}
}
