import { BaseService } from "../../Base/BaseService"
import { StateManage } from "zion-ui"

export class Service extends BaseService {
	constructor({ controlKey, FuncSetting }) {
		super({ controlKey, FuncSetting })
	}
	onClick_onClick = ({ }: any, state) => {
		if (this.FuncSetting) {
			this.FuncSetting({
				onOk: ({ value, controlKey }) => {
					this.attr_change({ attr: "{{onClick}}", value })
					StateManage.set(state, {
						value: value ? controlKey : null,
						showValue: value ? "已配置" : null
					})
				}
			})
		}
	}
}
