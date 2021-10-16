export interface IState {
	loading: boolean
	init: () => void                                                                                // 初始化树
	appendNodes: (parentId: string, treeNode: TreeNodeData | TreeNodeData[]) => void                // 追加树节点
	deleteNodes: (ids: string[]) => void                                                            // 删除树节点
	updateCheckedKeys: (checkedKeys: string[], operation: "replace" | "delete" | "add") => void     // 更新树的选中节点
	triggerOnSelectOption: (id: string) => void                                                     // 模拟触发定位事件
	expandAll: (bool?: boolean) => void                                                             // 展开/收起全部
	updateTitle: (data: { id: string, title: string }) => void                                      // 修改节点标题
}
export interface ICallbackData {
	checkedKeys: string[]
	checkedData: object[]
	selectedData: object[]
	selectedKeys: string[]
	halfCheckedKeys: string[]
	halfCheckedData: object[]
	originData: object[]
}

export enum EventType {
	"didMount" = "didMount",
	"onSelect" = "onSelect",
	"onChange" = "onChange",
	"onSelectOption" = "onSelectOption",
	"onExpand" = "onExpand"
}

export interface TreeNodeData {
	id: string
	uiPid: string | null
	title: string
	isParent?: boolean
	open?: boolean
	nocheck?: boolean
	prefixIcon?: string[]
	suffixIcon?: string[]
	checked?: boolean
	[key: string]: any
}

export interface IProps {
	// UI属性
	height?: number
	mode?: {
		isRadio?: boolean
		radioBrothers?: boolean
		isAsync?: boolean
	}
	disabled?: boolean
	draggable?: boolean
	showFooter?: boolean
	positionKey?: string
	allowSearch?: boolean

	// 数据属性
	controlKey?: string
	originData?: TreeNodeData[]

	// http属性
	httpConfig?: {
		init?: () => Promise<TreeNodeData[]>
		onSearch?: (searchValue: string) => Promise<{ key: string, label: string, [key: string]: any }[]>
		onSelectOption?: (option: { key: string, label: string, [key: string]: any }) => Promise<TreeNodeData[]>
		onExpand?: (treeNode: object) => Promise<TreeNodeData[]>
	}

	// 事件属性
	callbackConfig?: {
		onState?: (data: ICallbackData, eventType: EventType) => void
		/** 树内部拖拽 */
		onDrop?: (data: { dragNode: object, dropNode: object, dropPosition: "inner" | "up" | "down" }) => Promise<boolean>
		/** 树外部拖拽 */
		onDrop2?: (data: { ev, dragNode: object }) => void
		onDragStart?: (data: { ev, dragNode: object }) => void
		onDragMove?: (data: { ev, dragNode: object }) => void
	}
	iconCallback?: {
		[key: string]: (treeNode: object) => void
	}
}

