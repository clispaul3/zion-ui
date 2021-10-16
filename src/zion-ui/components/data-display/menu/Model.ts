import { IProps, IMenuItem, OnClickEventHandlerParams } from "../../../@types/Menu"
import { BaseModel } from "../../base";
import { IObservableObject } from 'mobx';

export class Model extends BaseModel implements IProps {
	layout?: "vertical" | "horizontal" | "inline"
	theme?: "light" | "dark"
	selectedKeys?: string[]
	openKeys?: string[]
	dataSource?: IMenuItem[]
	onClick?: (params: OnClickEventHandlerParams, state: IObservableObject) => void  // 点击 MenuItem 调用此函数
	onOpenChange?: (params: { openKeys: string[] }, state: IObservableObject) => void

	constructor(props: any = {}) {
		super(props)
		this.dataSource = props.dataSource || []
		this.selectedKeys = props.selectedKeys || []
		this.openKeys = props.openKeys || []
		this.onClick = props.onClick || null
		this.layout = props.layout || "vertical"
		this.theme = props.theme || "light"
		this.onOpenChange = props.onOpenChange || null
	}
}
