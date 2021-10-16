import { BaseFormModel } from "../../base";
import { IProps, IDataSourceItem, defaultType, defaultTrigger, defaultPlacement } from "../../../@types/SelectMenu";
import { ReactNode } from "react";
import { EventHandlerResult } from "../../../@types/Base";
import { IObservableObject } from "mobx";

export class Model extends BaseFormModel implements IProps {
	type?: "link" | "button";
	placement?: "bottomLeft" | "bottomCenter" | "bottomRight" | "topLeft" | "topCenter" | "topRight"
	icon?: ReactNode;
	disabled?: boolean
	text?: string
	buttonType?: "default" | "primary" | "ghost" | "dashed" | "link" | "text"

	dataSource: IDataSourceItem[];

	trigger?: Array<"click" | "hover" | "contextMenu">
	onClick?: (data: any) => void
	onMenuClick?: (params: EventHandlerResult, mobxProps: IObservableObject) => void
	onVisibleChange?: (visible: boolean) => void

	overlay?: ReactNode

	constructor(props: any = {}) {
		super(props);
		this.dataSource = props.dataSource || [];
		this.placement = props.placement || defaultPlacement;
		this.type = props.type || defaultType;
		this.text = props.text || "";
		this.icon = props.icon || null
		this.trigger = props.trigger || defaultTrigger;
		this.disabled = props.disabled || false;
		this.buttonType = props.buttonType

		this.onMenuClick = props.onMenuClick || null;
		this.onVisibleChange = props.onVisibleChange || null;
		this.onClick = props.onClick || null
		this.overlay = null
	}
}

