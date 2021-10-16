import { IBaseFormModel, EventHandlerResult } from "./Base";
import { ReactNode } from "react";
import { IObservableObject } from "mobx";

export interface IProps extends IBaseFormModel {
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
}

export interface IDataSourceItem {
	key: string | number
	label: string
	uiPid?: string | number | null
	isLeaf?: boolean
	icon?: ReactNode
	disabled?: boolean
	render?: (data: IDataSourceItem) => ReactNode | string
}

export const defaultClassName = "zion-ui-select-cascade"

export const defaultTrigger = "hover"

export const defaultPlaceholder = "请输入"

export const defaultNotFoundContent = "暂无数据"