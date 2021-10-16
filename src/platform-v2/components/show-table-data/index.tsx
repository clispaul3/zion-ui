/**
 * @description 基于showTableData接口实现的表格数据请求
 */
import Service from "./Service"

export interface IProps {
	tableControlKey: string
	filterFormControlKey?: string
	tableName: string
	fieldName?: string[]
	searchMatchField?: string[]
	filterCondition?: any[][]
	/** 字段条件映射，如:{name:"like",pid:"="} */
	fieldConditionMap?: object
	orderBy?: string[][]
	rowKey?: string
}

export const ShowTableData = Service
