import { BaseFormModel } from "../../base";
import { IProps, IDataSourceItem } from "../../../@types/SelectCascade";
import { EventHandlerResult } from "../../../@types/Base";
import { IObservableObject } from "mobx";

export class Model extends BaseFormModel implements IProps {
	allowSearch?: boolean
	changeOnSelect?: boolean
	value?: string[]
	dataSource: IDataSourceItem[];

	trigger?: "click" | "hover"
	onChange?: (params: EventHandlerResult, mobxProps: IObservableObject) => void
	onExpand?: (params: EventHandlerResult, mobxProps: IObservableObject) => void

	httpConfig?: {
		init?: () => Promise<IDataSourceItem[]>
		onExpand?: (data: IDataSourceItem) => Promise<IDataSourceItem[]>
	}

	constructor(props: any = {}) {
		super(props);
		this.dataSource = props.dataSource || [];
		this.allowSearch = props.allowSearch === false ? false : true;
		this.changeOnSelect = props.changeOnSelect;
		this.value = props.value || [];
		this.trigger = props.trigger;
		this.onChange = props.onChange;
		this.onExpand = props.onExpand;
		this.onChange = props.onChange;
		this.httpConfig = props.httpConfig
	}
}

