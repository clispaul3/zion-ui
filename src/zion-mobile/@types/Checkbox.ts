import { IObservableObject } from "mobx";
import { IBaseFormModel, EventHandlerParams } from "./Base"

export interface EventHandlerResult extends EventHandlerParams {
	value?: string[] | []
	checked?: boolean
	current?: IDataSourceItem
}

export interface IProps extends IBaseFormModel {
	dataSource?: IDataSourceItem[]
	value?: string[]
	showAll?: boolean
	placement?: "vertical" | "inline"
	onChange?: (params: EventHandlerResult, mobxState: IObservableObject) => void

	httpConfig?: {
		init?: () => Promise<IDataSourceItem[]>
	}
}

export interface IDataSourceItem {
	key: string
	label: string
	disabled?: boolean
}

export const defaultPlacement = "inline"

export const defaultClassName = "zion-ui-checkbox"