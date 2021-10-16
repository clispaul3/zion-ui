import { IBaseModel } from "./Base";
import { ReactNode } from "react";

export interface IProps extends IBaseModel {
	content?: ReactNode | string
	dashed?: boolean
	placement?: "left" | "right" | "center"
	plain?: boolean
}

export const defaultClassName = "zion-ui-divider"

export const defaultPlacement = "center"


