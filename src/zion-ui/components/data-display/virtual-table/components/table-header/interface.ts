import { ReactNode } from "react"

export interface ITableHeader {
	exchangeable?: boolean                    // 是否支持列交换
	bordered?: boolean                        // 是否显示边框
	columns: Array<{
		title: string | ReactNode
		sorter?: boolean                        // 当前列是否支持排序
		width?: string | number
		minWidth?: string | number              // 当前列最小宽度
		align?: "left" | "center" | "right"
		resizable?: boolean                     // 当前列是否支持拉伸
		tip?: string | ReactNode                // 文字提示
	}>
}