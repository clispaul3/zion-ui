import { IObservableObject } from "mobx";
import { BaseFormModel } from "../../base";
import { IDataSourceItem, EventHandlerResult, IProps, defaultPlacement } from "../../../@types/Checkbox"

export class Model extends BaseFormModel implements IProps {
	dataSource?: IDataSourceItem[]
	value?: string[]
	showAll?: boolean
	placement?: "vertical" | "inline"
	onChange?: (params: EventHandlerResult, mobxState: IObservableObject) => void

	httpConfig?: {
		init?: () => Promise<IDataSourceItem[]>
	}
	constructor(props: any = {}) {
		super(props)
		this.dataSource = props.dataSource || []
		this.value = props.value || []
		this.showAll = props.showAll === false ? false : true
		this.onChange = props.onChange
		this.placement = props.placement || defaultPlacement
		this.httpConfig = props.httpConfig
	}
}

export default Model