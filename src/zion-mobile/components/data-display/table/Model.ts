import { defaultSize, IPagination, IScroll, IHeader, IProps, IFooter, IRowSelection, ICondition, EAction, IHttpConfig, IButtonConfig, defaultRowKey } from "../../../@types/Table"
import { BaseModel } from "../../base"
import { ReactNode } from 'react'

export class Model extends BaseModel implements IProps {
	// UI属性
	columns?: object[]
	pagination?: IPagination
	scroll?: IScroll
	size?: "small" | "middle" | "large"
	fullscreen?: boolean
	header?: IHeader
	bordered?: boolean
	footer?: IFooter
	rowSelection?: IRowSelection
	allowResize?: boolean
	loading?: boolean
	buttonConfig?: IButtonConfig
	allowDragSort?: boolean
	expandedKeys?: string[]
	expandable?: {
		onExpand: (params: { expanded: boolean, record: object }) => ReactNode
		rowExpandable: (params) => boolean
	}
	disabled?: boolean
	// 数据属性
	dataSource?: object[]
	rowKey?: string
	nestingMode?: "inherit" | "customer"

	// 事件属性
	onChange?: (condition?: ICondition, action?: EAction) => void         // 表格内部交互过程中产生的查询条件发生变化时触发该方法

	// Http属性
	httpConfig?: IHttpConfig

	constructor(props: any) {
		super(props)
		this.dataSource = props.dataSource || []
		this.columns = props.columns || []
		this.rowKey = props.rowKey || defaultRowKey
		this.pagination = props.pagination || { show: false }
		this.rowSelection = props.rowSelection || { show: false }
		this.scroll = props.scroll || {}
		this.size = props.size || defaultSize
		this.fullscreen = props.fullscreen || false
		this.header = props.header || { show: false }
		this.onChange = props.onChange || null
		this.footer = props.footer || { show: false }
		this.bordered = props.bordered === true ? true : false
		this.allowResize = props.allowResize || false
		this.loading = props.loading || false
		this.httpConfig = props.httpConfig || {}
		this.buttonConfig = props.buttonConfig || {}
		this.allowDragSort = props.allowDragSort
		this.nestingMode = props.nestingMode
		this.expandedKeys = props.expandedKeys || []
		this.expandable = props.expandable || null
		this.disabled = props.disabled
	}
}
