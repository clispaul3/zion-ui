import { IBaseModel } from "./Base";
import { ReactNode } from "react";

export interface IProps extends IBaseModel {
	title?: string | ReactNode
	text?: string | ReactNode
	type?: "info" | "warn" | "warning" | "success" | "error"
	duration?: number
	onClose?: () => void
}

export const defaultClassName = "zion-ui-pop-message"

export const defaultDuration = 0.8

export const defaultType = "info"


