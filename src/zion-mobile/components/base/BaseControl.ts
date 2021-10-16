import { StateManage } from "../../service/state"

class BaseControl {
	initConfig: any
	private props: any
	constructor(props: {}) {
		this.props = props || {}
	}
	componentDidMount() {
		const { didMount } = StateManage.get(this.props.mobx)
		if (didMount && typeof didMount === "function") {
			didMount(this.props.mobx)
		}
	}
}

export default BaseControl