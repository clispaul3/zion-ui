/**
 * @description 查询树形表通用组件
 */
import { SelectCascadeProps, TreeProps, InputProps, PopModalProps, PopDrawerProps } from "zion-ui";

export interface IProps {
	componentType: "SelectCascade" | "Tree"
	modalType?: "PopModal" | "PopDrawer"
	tableName: string
	dataKey?: string | any
	dataPid?: string | any
	dataLabel?: string | any
	fieldName?: string[]
	filterCondition?: string[][]
	orderBy?: string[][]
	mode?: "radio" | "checkbox"
	value?: string[] | [] | string
	title?: string
	filter?: (dataSource: any[]) => Promise<any[]>
	props?: SelectCascadeProps | TreeProps | InputProps
	modalProps?: PopModalProps | PopDrawerProps
	onOk?: (checkedData: object[]) => void
}