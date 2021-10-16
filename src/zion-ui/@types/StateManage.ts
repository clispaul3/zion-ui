import { IObservableObject } from "mobx"

// 状态管理服务
export interface IStateManage {
	update: (param: IStateManageUpdate[] | IStateManageUpdate, isForceUpdate?: boolean) => void // 设置多个控件/单个控件
	select: (param: IStateManageSelect[] | IStateManageSelect) => any  // 查询多个控件/单个控件
	get: (obj: IObservableObject | string, key?: string | string[]) => any   // 查询单个控件的属性
	set: (obj: IObservableObject | string, target: { [key: string]: any }, isForceUpdate?: boolean) => void    // 设置单个控件的属性
	addState: (key: string, state: IObservableObject) => void
	has: (key: string) => boolean
	clearAll: () => void
	deleteState: (key: string) => void
}
// 查找控件的属性
export interface IStateManageSelect {
	property: IObservableObject | string,
	target: string[] | string
}
// 修改控件的属性
export interface IStateManageUpdate {
	property: IObservableObject | string,
	target: {
		[key: string]: any
	}
}
