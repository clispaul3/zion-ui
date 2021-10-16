import { IBaseModel, EventHandlerParams } from "./Base";
import { ReactNode } from "react";
import { IObservableObject } from "mobx";

export type ButtonTypes = "default" | "primary" | "link" | "danger" | "dashed" | "ghost" | "warn" | "warning" | "info" | "success"

export interface IProps extends IBaseModel {
	text?: string
	type?: ButtonTypes
	disabled?: boolean
	shape?: "round" | "circle"
	href?: string
	target?: string
	loading?: boolean
	show?: boolean
	icon?: ReactNode
	onClick?: (params: EventHandlerParams, state: IObservableObject) => void
}

export const defaultClassName = "zion-mobile-button"

export const defaultButtonType = "default"

export const defaultButtonText = "按钮"

export const defaultLinkTarget = "_blank"

export const typeStyleMap = {
	"success": {
		backgroundColor: "#67c23a",
		borderColor: "#67c23a",
		color: "#fff"
	},
	"warning": {
		backgroundColor: "#e6a23c",
		borderColor: "#e6a23c",
		color: "#fff"
	},
	"info": {
		backgroundColor: "#909399",
		borderColor: "#909399",
		color: "#fff"
	}
}

