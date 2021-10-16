import { IBaseModel, EventHandlerParams } from "./Base";
import { ReactNode } from 'react';
import { IObservableObject } from 'mobx';

export interface OnClickEventHandlerParams extends EventHandlerParams {
	current: IMenuItem
}

export interface IProps extends IBaseModel {
	layout?: "vertical" | "horizontal" | "inline"                             // 布局方式
	theme?: "light" | "dark"                                                  // 菜单主题
	selectedKeys?: string[]                                                   // 当前选中的节点
	openKeys?: string[]                                                       // 当前打开的节点
	dataSource?: IMenuItem[]                                                  // 菜单数据源
	onClick?: (params: OnClickEventHandlerParams, state: IObservableObject) => void  // 点击 MenuItem 调用此函数
	onOpenChange?: (params: { openKeys: string[] }, state: IObservableObject) => void
}

export const defaultClassName = "zion-ui-menu"

export interface IMenuItem {
	key: string,
	label: string | ReactNode,
	disabled?: boolean,
	icon?: ReactNode,
	isGroupMenu?: boolean
	isSubMenu?: boolean
	children?: IMenuItem[]
	[key: string]: any
}
