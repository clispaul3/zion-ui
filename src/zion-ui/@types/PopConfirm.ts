import { IBaseModel } from "./Base";
import { ReactNode } from "react";

export interface IProps extends IBaseModel {
	cancelText?: string
	okText?: string
	content: ReactNode
	icon?: ReactNode
	title: string
	placement?: "top" | "left" | "right" | "bottom" | "topLeft" | "topRight" | "bottomLeft" | "bottomRight" | "leftTop" | "leftBottom" | "rightTop" | "rightBottom"
	trigger?: "click" | "hover" | "focus"

	onCancel?: () => void
	onConfirm?: () => void
}

export const defaultClassName = "zion-ui-pop-confirm"

export const defaultCancelText = "关闭"

export const defaultOkText = "确定"

export const defaultPlacement = "top"


