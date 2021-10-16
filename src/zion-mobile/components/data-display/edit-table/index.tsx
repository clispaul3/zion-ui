/**
 * @description 动态表格(初始化之后，搜索，分页都是通过本地实现，不走请求)
 *   1. 搜索操作
 *   2. 通过代理对象 state 实现数据获取与设置
 *   3. 支持超大数据量，如：100万，渲染无卡顿
 */
import Service from "./Service"
import { Table } from "../table"
import { PropertyService } from "../../../service/property"
import { IProps as EditTableProps } from "../../../@types/EditTable"
import { StateManage } from "../../../service/state"
import React from "react"

interface IMobxProps {
	setDataSource: (originData: object[]) => void                   // 设置数据源
	getDataSource: () => object[]                                   // 获取数据源
	updateDataSource: (data: object | object[]) => void             // 更新数据源
	deleteData: (ids: string) => void                               // 删除数据
	addData: (params: { data: object, index: number }) => object[]  // 添加数据
}

export const EditTable = function (props: EditTableProps, bool?: boolean) {
	const { tableProps, allowEdit, searchMapFields = [], controlKey } = props
	const state = PropertyService.getObservableObj({} as IMobxProps)
	if (controlKey) {
		StateManage.addState(controlKey, state)
	}
	const service = new Service(tableProps, state, searchMapFields)
	const tableTargetProps = service.getTableProps(tableProps, allowEdit)
	const [tableMobxProps, TableTemplate] = Table(tableTargetProps, false)
	service.setTableMobxProps(tableMobxProps)
	if (bool === true) return TableTemplate
	if (typeof bool === "object") return <TableTemplate />
	return [state, TableTemplate]
}
