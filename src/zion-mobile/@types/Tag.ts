import { IBaseModel, EventHandlerParams } from "./Base";
import { ReactNode } from "react";
import { IObservableObject } from 'mobx';

export type TtagType = "success" | "warn" | "warning" | "processing" | "error" | "waiting"

export interface IProps extends IBaseModel {
	text?: string
	type?: TtagType
	closable?: boolean
	closeIcon?: ReactNode
	color?: string
	icon?: ReactNode

	onClose?: (params: EventHandlerParams, state: IObservableObject) => void
}

export const defaultClassName = "zion-ui-tag"

export const defaultText = "tag"

export const tagTypeArr = ["success", "warn", "warning", "processing", "error", "waiting"]


