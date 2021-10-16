import React from 'react';
import { Table, TableProps, StateManage, Button } from "zion-ui"

export const Demo006 = function () {
	// 获取数据源
	const getDataSource = function ({ count }) {
		const dataSource: any = []
		while (count-- > 0) {
			dataSource.push({
				key: "key-" + count,
				name: "项目" + count,
				manageName: "项目经理" + count,
				productName: "产品经理" + count,
				status: "未开始"
			})
		}
		return dataSource
	}
	const controlKey = "Table.Pro.Demo006"
	const tableProps: TableProps = {
		controlKey,
		columns: [
			{ title: "编号", dataIndex: "key", width: 100, align: "center" },
			{ title: "项目名称", dataIndex: "name", align: "center" },
			{ title: "项目经理", dataIndex: "manageName", width: 120, align: "center" },
			{ title: "产品经理", dataIndex: "productName", width: 120, align: "center" },
			{ title: "状态", dataIndex: "status", width: 150, align: "center" }
		],
		rowKey: "key",
		dataSource: getDataSource({ count: 23 }),
		pagination: { show: true, pageSize: 10 },
		header: {
			show: true,
			searchInput: {
				span: 20
			},
			refreshButton: {
				span: 4
			}
		},
		httpConfig: {
			onSearch: async ({ condition, action }) => {
				console.log(action)
				const { filterConditionMap } = condition
				const searchValue = filterConditionMap["@searchValue"]
				let dataSource = StateManage.get(controlKey, "dataSource")
				return new Promise((resolve) => {
					const timer = setTimeout(() => {
						clearTimeout(timer)
						if (!searchValue) {
							resolve({
								data: getDataSource({ count: 23 }),
								total: 23
							})
						} else {
							dataSource = dataSource.filter(data => data["name"].indexOf(searchValue) > 0 || data["manageName"].indexOf(searchValue) > 0 || data["productName"].indexOf(searchValue) > 0)
							resolve({
								data: dataSource,
								total: dataSource.length
							})
						}
					}, 800)
				})
			}
		}
	}
	return <div>
		<Button text="表头搜索按钮点击回车时触发，action: CHANGE_SEARCHVALUE_002" type="link" />
		<Button text="点击表头刷新按钮时触发，action: BUTTON_REFRESH" type="link" />
		<Button text="切换页码时触发, action: CHANGE_PAGE" type="link" />
		<Button text="切换每页显示数量时触发，action: CHANGE_PAGESIZE" type="link" />
		<Button text="切换列头排序时触发，action: CHANGE_ORDERBY" type="link" />
		<Table {...tableProps} />
	</div>
}

export const code006 = `
import React from 'react';
import { Table, TableProps, StateManage, Button } from "zion-ui"

export const Demo = function () {
	// 获取数据源
	const getDataSource = function ({ count }) {
		const dataSource: any = []
		while (count-- > 0) {
			dataSource.push({
				key: "key-" + count,
				name: "项目" + count,
				manageName: "项目经理" + count,
				productName: "产品经理" + count,
				status: "未开始"
			})
		}
		return dataSource
	}
	const controlKey = "Table.Pro.Demo006"
	const tableProps: TableProps = {
		controlKey,
		columns: [
			{ title: "编号", dataIndex: "key", width: 100, align: "center" },
			{ title: "项目名称", dataIndex: "name", align: "center" },
			{ title: "项目经理", dataIndex: "manageName", width: 120, align: "center" },
			{ title: "产品经理", dataIndex: "productName", width: 120, align: "center" },
			{ title: "状态", dataIndex: "status", width: 150, align: "center" }
		],
		rowKey: "key",
		dataSource: getDataSource({ count: 23 }),
		pagination: { show: true, pageSize: 10 },
		header: {
			show: true,
			searchInput: {
				span: 20
			},
			refreshButton: {
				span: 4
			}
		},
		httpConfig: {
			onSearch: async ({ condition, action }) => {
				console.log(action)
				const { filterConditionMap } = condition
				const searchValue = filterConditionMap["@searchValue"]
				let dataSource = StateManage.get(controlKey, "dataSource")
				return new Promise((resolve) => {
					const timer = setTimeout(() => {
						clearTimeout(timer)
						if (!searchValue) {
							resolve({
								data: getDataSource({ count: 23 }),
								total: 23
							})
						} else {
							dataSource = dataSource.filter(data => data["name"].indexOf(searchValue) > 0 || data["manageName"].indexOf(searchValue) > 0 || data["productName"].indexOf(searchValue) > 0)
							resolve({
								data: dataSource,
								total: dataSource.length
							})
						}
					}, 800)
				})
			}
		}
	}
	return <div>
		<Button text="表头搜索按钮点击回车时触发，action: CHANGE_SEARCHVALUE_002" type="link" />
		<Button text="点击表头刷新按钮时触发，action: BUTTON_REFRESH" type="link" />
		<Button text="切换页码时触发, action: CHANGE_PAGE" type="link" />
		<Button text="切换每页显示数量时触发，action: CHANGE_PAGESIZE" type="link" />
		<Button text="切换列头排序时触发，action: CHANGE_ORDERBY" type="link" />
		<Table {...tableProps} />
	</div>
}
`
