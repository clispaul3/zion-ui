import { defaultPlacement, IDataSourceItem, IProps } from "../../../@types/Radio"
import { BaseFormModel } from "../../base"
import { IObservableObject } from "mobx"
import { EventHandlerResult } from "../../../@types/Base"
export class Model extends BaseFormModel implements IProps {
	dataSource?: IDataSourceItem[]
	value?: string
	allowCancel?: boolean
	placement?: "vertical" | "inline"
	onChange?: (params: EventHandlerResult, mobxState: IObservableObject) => void

	httpConfig?: {
		init?: () => Promise<IDataSourceItem[]>
	}
	constructor(props: any = {}) {
		super(props)
		this.dataSource = props.dataSource || []
		this.value = props.value || ""
		this.allowCancel = props.allowCancel || false
		this.onChange = props.onChange || null
		this.placement = props.placement || defaultPlacement
		this.httpConfig = props.httpConfig
	}
}

export default Model