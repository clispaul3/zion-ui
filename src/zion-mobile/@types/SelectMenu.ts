import { EventHandlerResult, IBaseFormModel } from "./Base";
import { ReactNode } from "react";
import { IObservableObject } from "mobx";

export interface IProps extends IBaseFormModel {
	type?: "link" | "button";
	placement?: "bottomLeft" | "bottomCenter" | "bottomRight" | "topLeft" | "topCenter" | "topRight"
	icon?: ReactNode;
	disabled?: boolean
	text?: string | ReactNode
	buttonType?: "default" | "primary" | "ghost" | "dashed" | "link" | "text"

	dataSource: IDataSourceItem[];

	trigger?: Array<"click" | "hover" | "contextMenu">
	onClick?: (params: EventHandlerResult, mobxProps: IObservableObject) => void
	onMenuClick?: (params: EventHandlerResult, mobxProps: IObservableObject) => void
	onVisibleChange?: (visible: boolean, mobxProps: IObservableObject) => void
}

export interface IDataSourceItem {
	key: string | number
	label: string
	uiPid?: string | number | null
	icon?: ReactNode
	disabled?: boolean
	render?: (data: IDataSourceItem) => ReactNode | string
}

export const defaultClassName = "zion-ui-select-memu"

export const defaultType = "link"

export const defaultTrigger = "hover"

export const defaultPlacement = "bottomCenter"
