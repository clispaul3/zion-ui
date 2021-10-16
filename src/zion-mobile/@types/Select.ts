import { IBaseFormModel, EventHandlerResult } from "./Base"
import { ReactNode } from "react"
import { IObservableObject } from "mobx"

export interface IOnloadEventParams extends EventHandlerResult {
	length: number
}

export interface IProps extends IBaseFormModel {
	// UI属性
	mode?: "checkbox" | "radio"
	showFooter?: boolean
	maxTagCount?: number | null

	// 数据属性
	dataSource?: IDataSourceItem[]
	value?: string[] | [] | string

	// http属性
	httpConfig?: {
		init?: (params: EventHandlerResult, mobxProps: IObservableObject) => Promise<IDataSourceItem[]>
		onSearch?: (params: EventHandlerResult, mobxProps: IObservableObject) => Promise<IDataSourceItem[]>
	}

	// 事件属性
	onFocus?: (params: EventHandlerResult, mobxProps: IObservableObject) => void
	onBlur?: (params: EventHandlerResult, mobxProps: IObservableObject) => void
	onClick?: (params: EventHandlerResult, mobxProps: IObservableObject) => void
}

export interface IDataSourceItem {
	key: string
	label: string
	disabled?: boolean
	icon?: ReactNode
	render?: (data: IDataSourceItem) => ReactNode | string
}

export const defaultClassName = "zion-ui-select"

export const notFoundContent = "暂无数据"

export const defaultPlaceholder = "请选择"

export const selectAll = "1"

export const cancelAll = "0"

export const defaultMode = "radio"