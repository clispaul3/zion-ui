/**
 * @description 根据表名、字段名自动生成对应的下拉框组件
 * 参数说明：
 * 	① asyncSearch = true，支持异步加载数据：不需要配置 httpInitTrigger；输入关键字时会触发接口；当value有值时，会触发接口获取value对应的详细数据 
 *  ② asyncSearch = false，不支持异步加载：需要通过配置 httpInitTrigger 设置数据初始化的时机；如果数据量较大，注意 searchPageSize 要设置大一点
 */
import { SelectProps } from "zion-ui"

export interface IBaseSelect {
	tableName: string
	fieldName: string[]
	dataKey: string
	dataLabel: string
	filterCondition?: string[][]
	orderBy?: string[][]
	searchMatchField?: string[]
	searchPageSize?: number
	asyncSearch: boolean
	mode?: "radio" | "checkbox"
	httpInitTrigger?: "onFocus" | "didMount"
	/** 数据二次过滤函数 */
	filter?: (dataSource: { [key: string]: any }[]) => Promise<{ [key: string]: any }[]>
	value?: string[] | string
	props?: SelectProps
}

export const defaultSearchPageSize = 20
