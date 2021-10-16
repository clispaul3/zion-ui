import { IProps as TableProps } from "./Table"

export interface IProps {
	/** 数据唯一标识 */
	rowKey?: String
	controlKey?: string
	tableProps: TableProps
	allowEdit?: boolean
	searchMapFields?: string[]
}