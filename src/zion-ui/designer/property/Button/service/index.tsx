import { BaseService } from "../../Base/BaseService"
import { StateManage } from "zion-ui"

export class Service extends BaseService {
	constructor({ controlKey, FuncSetting }) {
		super({ controlKey, FuncSetting })
	}
	onClick_onClick = ({ }: any, state) => {
		if (this.FuncSetting) {
			this.FuncSetting({
				controlKey: StateManage.get(state, "value"),
				onOk: ({ config }) => {
					const { controlKey } = config || {}
					this.attr_change({ attr: "{{onClick}}", value: controlKey })
					StateManage.set(state, { value: controlKey })
				}
			})
		}
	}
}
