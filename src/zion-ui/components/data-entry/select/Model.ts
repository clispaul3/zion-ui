import { BaseFormModel } from "../../base"
import { IDataSourceItem, IProps, defaultMode } from "../../../@types/Select"
import { IObservableObject } from "mobx"
import { EventHandlerResult } from "../../../@types/Base"

export class Model extends BaseFormModel implements IProps {
	// UI属性
	mode?: "checkbox" | "radio"
	showFooter?: boolean

	// 数据属性
	dataSource?: IDataSourceItem[]
	value?: string[] | []
	maxTagCount?: number | null

	// http属性
	httpConfig?: {
		init: (params: EventHandlerResult, mobxProps: IObservableObject) => Promise<IDataSourceItem[]>
		onSearch: (params: EventHandlerResult, mobxProps: IObservableObject) => Promise<IDataSourceItem[]>
	}

	// 事件属性
	onFocus?: (params: EventHandlerResult, mobxProps: IObservableObject) => void
	onBlur?: (params: EventHandlerResult, mobxProps: IObservableObject) => void
	onClick?: (params: EventHandlerResult, mobxProps: IObservableObject) => void

	constructor(props: any = {}) {
		super(props)
		this.dataSource = props.dataSource || []
		this.mode = props.mode || defaultMode
		this.maxTagCount = props.maxTagCount === null ? null : (props.maxTagCount || 1)
		this.value = props.value || []
		this.onFocus = props.onFocus || null
		this.onBlur = props.onBlur || null
		this.onClick = props.onClick || null
		this.showFooter = props.showFooter || null
		this.httpConfig = props.httpConfig || null
	}
}
