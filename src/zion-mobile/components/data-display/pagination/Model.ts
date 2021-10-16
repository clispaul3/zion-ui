/**
 * @description 控件数据模型
 */
import { IProps, defaultPage, defaultPageSize, defaultPageSizeOptions } from "../../../@types/Pagination"
import { BaseModel } from "../../base"
import { ReactNode } from 'react'
import { IObservableObject } from 'mobx'
export class Model extends BaseModel implements IProps {
	page?: number
	pageSize?: number                                       // 每页条数
	disabled?: boolean                                      // 是否禁用
	pageSizeOptions?: string[]                              // 指定每页展示多少条数据
	showQuickJumper?: boolean                               // 是否支持快速跳转
	showSizeChanger?: boolean                               // 是否展示 pageSize 切换器，当 total 大于 50 时默认为 true
	total?: number                                          // 数据总数
	simple?: boolean                                        // 简易模式
	showTotal?: boolean | ((total: number) => ReactNode)    // 用于展示当前页数的条数
	onChange?: (params: ({ page: number, pageSize: number }), state: IObservableObject) => void
	onShowSizeChange?: (params: ({ page: number, pageSize: number }), state: IObservableObject) => void

	constructor(props: any = {}) {
		super(props)
		this.page = props.page || defaultPage
		this.pageSize = props.pageSize || defaultPageSize
		this.disabled = props.disabled || false
		this.pageSizeOptions = props.pageSizeOptions || defaultPageSizeOptions
		this.showQuickJumper = props.showQuickJumper || false
		this.showSizeChanger = props.showSizeChanger || null
		this.total = props.total || null
		this.simple = props.simple || null
		this.showTotal = props.showTotal || null
		this.onChange = props.onChange || null
		this.onShowSizeChange = props.onShowSizeChange || null
	}
}
