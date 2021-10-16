import { IBaseFormModel, EventHandlerResult } from "./Base"
import { IObservableObject } from "mobx"

export interface IProps extends IBaseFormModel {
	className?: string;
	width?: string;
	height?: string | number;
	zIndex?: number;                     // 默认1
	value?: string;
	placeholder?: string;
	colors?: string[];
	menus?: string[];
	uploadImgConfig?: {
		url?: string
		headers?: object
		maxSize?: number                  // 默认10M
	}

	// 事件属性
	onChange?: (params: EventHandlerResult, mobxProps: IObservableObject) => void
	onFocus?: (params: EventHandlerResult, mobxProps: IObservableObject) => void
	onBlur?: (params: EventHandlerResult, mobxProps: IObservableObject) => void
}

export const defaultClassName = "zion-ui-rich-text"