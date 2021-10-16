import React from 'react';
import { Table, StateManage, Button } from "zion-ui"

export const Demo = function () {
	const [tableState, Tpl] = Table({
		columns: [
			{ title: "编号", dataIndex: "key", width: 50, align: "center" },
			{ title: "项目名称", dataIndex: "name", align: "center" },
			{ title: "项目经理", dataIndex: "manageName", width: 120, align: "center" },
			{ title: "产品经理", dataIndex: "productName", width: 120, align: "center" },
			{ title: "状态", dataIndex: "status", width: 150, align: "center" }
		],
		rowKey: "key",
		dataSource: [
			{ key: "001", name: "项目001", manageName: "项目经理001", productName: "产品经理001", status: "未开始" },
			{ key: "002", name: "项目002", manageName: "项目经理002", productName: "产品经理002", status: "未开始" },
			{ key: "003", name: "项目003", manageName: "项目经理003", productName: "产品经理003", status: "未开始" }
		],
		rowSelection: {
			show: true,
			mode: "checkbox"
		},
		header: {
			show: true,
			title: {
				span: 20,
				content: " "
			},
			headerButton: {
				span: 4,
				button: [
					{
						text: "批量删除",
						btnCode: "HEADER_DELETE_BUTTON"
					}
				]
			}
		},
		buttonConfig: {
			rowButton: [
				{
					text: "删除",
					btnCode: "ROW_DELETE_BUTTON"
				}
			]
		},
		httpConfig: {
			delete: async ({ checkedRows }) => {
				const keys = checkedRows.map(item => item["key"])
				let { dataSource } = StateManage.get(tableState)
				dataSource = dataSource.filter(data => keys.includes(data["key"]) == false)
				StateManage.set(tableState, { loading: true })
				return new Promise((resolve) => {
					const timer = setTimeout(() => {
						clearTimeout(timer)
						StateManage.set(tableState, { dataSource, loading: false })
						resolve({
							result: true,
							message: "删除成功"
						})
					}, 800)
				})
			}
		}
	}, false)
	return <div>
		<Button text="表头按钮中 btnCode 为: HEADER_DELETE_BUTTON 会触发 httpConfig.delete " type="link" />
		<Button text="行按钮中 btnCode 为: ROW_DELETE_BUTTON 会触发 httpConfig.delete " type="link" />
		<Tpl />
	</div>
}

export const code = `
import React from 'react';
import { Table, StateManage, Button } from "zion-ui"

export const Demo = function () {
	const [tableState, Tpl] = Table({
		columns: [
			{ title: "编号", dataIndex: "key", width: 50, align: "center" },
			{ title: "项目名称", dataIndex: "name", align: "center" },
			{ title: "项目经理", dataIndex: "manageName", width: 120, align: "center" },
			{ title: "产品经理", dataIndex: "productName", width: 120, align: "center" },
			{ title: "状态", dataIndex: "status", width: 150, align: "center" }
		],
		rowKey: "key",
		dataSource: [
			{ key: "001", name: "项目001", manageName: "项目经理001", productName: "产品经理001", status: "未开始" },
			{ key: "002", name: "项目002", manageName: "项目经理002", productName: "产品经理002", status: "未开始" },
			{ key: "003", name: "项目003", manageName: "项目经理003", productName: "产品经理003", status: "未开始" }
		],
		rowSelection: {
			show: true,
			mode: "checkbox"
		},
		header: {
			show: true,
			title: {
				span: 20,
				content: " "
			},
			headerButton: {
				span: 4,
				button: [
					{
						text: "批量删除",
						btnCode: "HEADER_DELETE_BUTTON"
					}
				]
			}
		},
		buttonConfig: {
			rowButton: [
				{
					text: "删除",
					btnCode: "ROW_DELETE_BUTTON"
				}
			]
		},
		httpConfig: {
			delete: async ({ checkedRows }) => {
				const keys = checkedRows.map(item => item["key"])
				let { dataSource } = StateManage.get(tableState)
				dataSource = dataSource.filter(data => keys.includes(data["key"]) == false)
				StateManage.set(tableState, { loading: true })
				return new Promise((resolve) => {
					const timer = setTimeout(() => {
						clearTimeout(timer)
						StateManage.set(tableState, { dataSource, loading: false })
						resolve({
							result: true,
							message: "删除成功"
						})
					}, 800)
				})
			}
		}
	}, false)
	return <div>
		<Button text="表头按钮中 btnCode 为: HEADER_DELETE_BUTTON 会触发 httpConfig.delete " type="link" />
		<Button text="行按钮中 btnCode 为: ROW_DELETE_BUTTON 会触发 httpConfig.delete " type="link" />
		<Tpl />
	</div>
}
`
