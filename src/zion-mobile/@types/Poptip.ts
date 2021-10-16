import { IBaseModel } from "./Base";
import { ReactNode } from "react";

export interface IProps extends IBaseModel {
	title: string | ReactNode
	content: ReactNode
	trigger?: "click" | "hover" | "focus"
	placement?: "top" | "left" | "right" | "bottom" | "topLeft" | "topRight" | "bottomLeft" | "bottomRight" | "leftTop" | "leftBottom" | "rightTop" | "rightBottom"
}

export const defaultClassName = "zion-ui-pop-tip"

export const defaultPlacement = "top"




