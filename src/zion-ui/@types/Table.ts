import { IObservableObject } from 'mobx';
import { ReactNode } from 'react';
import { IBaseModel } from "./Base";
import { ColumnType } from "antd/lib/table"

interface IColumnType extends ColumnType<any> {
	show?: boolean
}
interface IProps extends IBaseModel {
	// UI属性
	columns?: IColumnType[]
	pagination?: IPagination
	scroll?: IScroll
	size?: "small" | "middle" | "large"
	fullscreen?: boolean
	header?: IHeader
	bordered?: boolean
	footer?: IFooter | (() => ReactNode)
	rowSelection?: IRowSelection
	allowResize?: boolean
	loading?: boolean
	buttonConfig?: IButtonConfig
	allowDragSort?: boolean
	expandedKeys?: string[]
	expandable?: {
		onExpand?: (params: { expanded: boolean, record: object }) => ReactNode
		rowExpandable?: (params) => boolean
	}
	disabled?: boolean

	// 数据属性
	dataSource?: IDataSourceItem[]
	rowKey?: string
	nestingMode?: "inherit" | "customer"

	// 事件属性
	onChange?: (condition: ICondition, action: EAction, mobxState: IObservableObject) => void         // 表格内部交互过程中产生的查询条件发生变化时触发该方法

	// Http属性
	httpConfig?: IHttpConfig
}

// 标准数据格式
interface IDataSourceItem {
	uiPid?: string | null              // 上级标识，对于树形表格有用
	hasChild?: boolean                 // 用于标识数据是否有子节点，通常需要接口提供
	[key: string]: any
}

// 分页器配置
interface IPagination {
	show?: boolean
	page?: number,
	pageSize?: number,
	total?: number,
	isAsync?: boolean,
	showQuickJumper?: boolean,
	showTotal?: boolean | string | ReactNode,
	showSizeChanger?: boolean
	simple?: boolean
}

// 滚动条配置
interface IScroll {
	x?: number,
	y?: number
}

// 表头配置
interface IHeader {
	show?: boolean
	// title?: string
	onlySearch?: boolean
	layout?: number[]                      // 布局配置，显示顺序：标题 + 搜索框 + 表头按钮 + 全屏按钮 + 设置展示列按钮, 如[6,6,6,6,0],0表示不显示                           
	render?: () => ReactNode
	title?: {
		content?: ReactNode | string
		render?: () => ReactNode
		span?: number
	},
	searchInput?: {
		span?: number
		placeholder?: string
	},
	headerButton?: {
		span?: number
		button?: {
			text?: string
			color?: string
			icon?: ReactNode
			btnCode?: EButtonCode
			onClick?: (params: { checkedRows: object[], btnCode: EButtonCode }) => void,
			show?: boolean  // 是否展示按钮，如果为 false 则不展示
		}[]
	},
	refreshButton?: {
		span?: number,
		onClick?: () => void
	},
	fullscreenButton?: {
		span?: number
	},
	filterSetting?: {
		span?: number
		onClick?: (mobxState: IObservableObject) => void
	},
	customerColumns?: {
		span?: number
	}
}

// rowSelection配置
interface IRowSelection {
	show?: boolean
	mode?: "radio" | "checkbox"
	checkedKeys?: string[] | number[]
	checkedRows?: object[]
	checkedTags?: IFooter[]
	onClick?: (data: { currentRow: object, index: number, checkedKeys: string[] | number[], checkedRows: object[], checkedTags: object[] }) => void
	onSort?: () => void
}

/**
 * @description 页脚配置,用于展示选中的数据,
 * 如：{id:"0a3456",usename:"admin"}，返回值是"id",返回文本是"username"
 */
interface IFooter {
	show?: boolean
	key: string
	label: string
	allowShowList?: boolean
	render?: (data: { record: object }) => string
}

/**
 * @description http请求相关的配置
 */
interface IHttpConfig {
	init?: (params?: { checkedKeys?: string[], rowKey?: string }, mobxState?: IObservableObject) => Promise<{ data: object[], total: number, checkedRows?: object[] | [] }>
	search?: (params: { condition: ICondition, action: EAction }, mobxState: IObservableObject) => Promise<{ data: object[], total: number }>
	onSearch?: (params: { condition: ICondition, action: EAction }, mobxState: IObservableObject) => Promise<{ data: object[], total: number }>
	delete?: (params: { checkedRows: object[] }, mobxState: IObservableObject) => Promise<{ result: boolean, message?: string }>
	expand?: (params: { expanded: boolean, record: object }, mobxState: IObservableObject) => Promise<IDataSourceItem[]>
	onExpand?: (params: { expanded: boolean, record: object }, mobxState: IObservableObject) => Promise<IDataSourceItem[]>
}

/**
 * @description 表格内部交互产生的查询条件
 */
interface ICondition {
	filterConditionMap: {
		[field: string]: {
			value: any
			showValue: any
		}
	}
	filterConditon: {
		filed: string,
		value: any
	}[],
	orderByMap: {
		[key: string]: "DESC" | "ASC"
	}
	orderBy: {
		filed: string,
		order: string
	}[]
}

// 表格内部交互的枚举值定义
enum EAction {
	"CHANGE_ORDERBY" = "CHANGE_ORDERBY",
	"CHANGE_PAGESIZE" = "CHANGE_PAGESIZE",
	"CHANGE_PAGE" = "CHANGE_PAGE",
	"CHANGE_SEARCHVALUE_001" = "CHANGE_SEARCHVALUE_001",
	"CHANGE_SEARCHVALUE_002" = "CHANGE_SEARCHVALUE_002",
	"BUTTON_REFRESH" = "BUTTON_REFRESH",
}

const TriggerHttpSearchAction = [
	EAction.CHANGE_SEARCHVALUE_002,
	EAction.CHANGE_PAGESIZE,
	EAction.CHANGE_PAGE,
	EAction.CHANGE_ORDERBY,
	EAction.BUTTON_REFRESH
]

/**
 * @description 增加按钮的配置，行按钮和表头按钮
 */
type EButtonCode =
	"HEADER_DELETE_BUTTON" | "ROW_DELETE_BUTTON" |
	"EXPORT_BUTTON" | "IMPORT_BUTTON" | "HEART_BUTTON" |
	"CREATE_BUTTON" | "DOWNLOAD_BUTTON" | "EDIT_BUTTON" | "SETTING_BUTTON"

interface IButtonConfig {
	maxRowButton?: number
	align?: "center" | "left" | "right"
	width?: number | string
	rowButton?: {
		btnCode?: EButtonCode
		text?: string | ReactNode
		icon?: ReactNode
		color?: string,
		isRender?: (record: object) => boolean  // 根据当前行的数据控制按钮是否显示
		onClick?: (params: { record: object, index: number, btnCode?: EButtonCode }) => void
		show?: boolean  // 是否展示按钮，如果为 false 则不展示
	}[]
}

const defaultClassName = "zion-ui-table"

const defaultRowKey = "id"

const dragBodyContainerClassName = defaultClassName + "-drag-body-container"

const dragVisibleClassName = "drag-visible"

const defaultAlign = "left"

const defaultPidField = "uiPid"

const defaultHasChild = "hasChild"
const defaultSize = "small"
const defaultChildrenKey = "children"
const customerChildrenKey = "@children"

const defaultPlaceholder = "请输入关键字"

export {
	IProps, IPagination, IScroll, IHeader, EAction, IDataSourceItem,
	IRowSelection, IFooter, IHttpConfig, IButtonConfig, defaultHasChild,
	defaultClassName, defaultRowKey, ICondition, defaultPidField,
	defaultAlign, dragVisibleClassName, dragBodyContainerClassName,
	defaultPlaceholder, TriggerHttpSearchAction, customerChildrenKey,
	defaultChildrenKey, defaultSize
}


/**
 * @description 嵌套模式
 *  - inherit: 继承模式
 *		- 嵌套的子表格的列配置继承父表格
 *		- 通过dataSource数据源的children字段来决定当前行是否可展开，有children字段则支持展开，无则不支持
 *		- 展开时调用 httpConfig.onExpand

 *  - customer: 自定义模式
 *		- 行展开时自定义渲染内容
 *		- 展开时调用 expandable.onExpand 返回自定义渲染的组件
 *		- 如果使用该模式，需确保dataSource数据源中的数据没有 children 字段
 */