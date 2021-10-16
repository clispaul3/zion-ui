import { CSSProperties, ReactNode } from 'react';
import { IObservableObject } from 'mobx';

/**
 * @description 控件的基础数据模型，建议控件(组件)的数据模型都继承该基础模型
 * @author zhangyangbin
 */
export declare interface IBaseModel {
	controlKey?: string
	size?: EnumSize
	className?: string
	show?: boolean
	observer?: (count: number, state: IObservableObject) => void
	style?: CSSProperties
	didMount?: (mobxProps: IObservableObject) => void
	extraData?: object
}

export interface EventHandlerResult extends EventHandlerParams {
	value?: any
}

export interface IValidateResult {
	status?: "error" | "success" | "validating" | "warning"
	help?: string | ReactNode
}

export interface IValidateParams {
	value?: any
	showValue?: string
	extraData?: object
}

export interface IBaseFormModel extends IBaseModel {
	value?: any
	showValue?: any
	autoFocus?: boolean
	placeholder?: string | string[]
	onChange?: (params: EventHandlerResult, mobxProps: IObservableObject) => void
	disabled?: boolean
	allowClear?: boolean

	// 表单相关的属性配置
	label?: string
	required?: boolean
	layout?: {
		wrapperCol?: { span: number },
		labelCol?: { span: number }
	}
	validateResult?: IValidateResult
	hasFeedback?: boolean
	autoValidate?: boolean
}

export interface IBaseService {
	props: IObservableObject | object
	getProps: () => object
	setProps: (nextProps: object) => void
	getId: () => string
	getClassName: (defaultClassName: string) => string[]
	eventHandler: (params: EventHandlerParams) => any
	getTemplate: () => ReactNode
	getFormItem: (Template: ReactNode) => ReactNode
}

export type EnumSize = "small" | "middle" | "large"

// 事件名
export enum MouseEventType {
	"onMouseOver" = "onMouseOver",
	"onMouseOut" = "onMouseOut",
	"onClick" = "onClick",
	"onChange" = "onChange",
	"onFocus" = "onFocus",
	"onBlur" = "onBlur",
	"onDragOver" = "onDragOver",
	"onDragStart" = "onDragStart",
	"onDrop" = "onDrop",
	"onPressEnter" = "onPressEnter",
	"onSearch" = "onSearch",
	"onEdit" = "onEdit",
	"onClear" = "onClear",
	"onFooter" = "onFooter",
	"onLoad" = "onLoad",
	"init" = "init",
	"didMount" = "didMount",
	"unMounted" = "unMounted",
	"onExpand" = "onExpand",
	"onSelect" = "onSelect",
	"onConfirm" = "onConfirm",
	"onOk" = "onOk",
	"onMenuClick" = "onMenuClick"
}

// 事件处理函数的参数
export interface EventHandlerParams {
	ev: React.MouseEvent<HTMLElement> | null
	eventName: string
	[key: string]: any
}

// 防抖时间
export const DebounceDelay = 300

// 节流时间
export const ThrottleDelay = 500

// 无边框类名
export const noBorderCalssName = "zion-ui-no-border"




