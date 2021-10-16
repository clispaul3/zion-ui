import { IProps } from "../../../@types/RichEditor"
import { EventHandlerResult } from "../../../@types/Base"
import { IObservableObject } from "mobx"
import { BaseFormModel } from "../../base"

export class Model extends BaseFormModel implements IProps {
	className?: string;
	width?: string;
	height?: string | number;
	zIndex?: number;                    // 默认1
	value?: string;
	placeholder?: string;
	colors?: string[];
	menus?: string[];
	uploadImgConfig?: {
		url?: string
		headers?: object
		maxSize?: number                  // 默认 10 * 1024 * 1024
	}

	// 事件属性
	onChange?: (params: EventHandlerResult, mobxProps: IObservableObject) => void
	onFocus?: (params: EventHandlerResult, mobxProps: IObservableObject) => void
	onBlur?: (params: EventHandlerResult, mobxProps: IObservableObject) => void

	constructor(props: IProps) {
		super(props)
		this.className = props.className
		this.width = props.width || "100%"
		this.height = props.height || "220px"
		this.zIndex = props.zIndex || 1;
		this.value = props.value
		this.placeholder = props.placeholder
		this.colors = props.colors
		this.menus = props.menus
		this.uploadImgConfig = props.uploadImgConfig || {}
		this.onChange = props.onChange
		this.onBlur = props.onBlur
		this.onFocus = props.onFocus
	}
}
