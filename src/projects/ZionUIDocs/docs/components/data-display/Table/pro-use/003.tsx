import React from 'react';
import { Table, TableProps } from "zion-ui"

export const Demo = function () {
	const tableProps: TableProps = {
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
		header: {
			show: true,
			searchInput: {
				span: 20
			},
			refreshButton: {
				span: 1
			},
			customerColumns: {
				span: 1
			},
			filterSetting: {
				span: 1,
				onClick: function () {
					// do your things
				}
			},
			fullscreenButton: {
				span: 1
			}
		}
	}
	return <div>
		<Table {...tableProps} />
	</div>
}

export const code = `
import React from 'react';
import { Table, TableProps } from "zion-ui"

export const Demo = function () {
	const tableProps: TableProps = {
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
		header: {
			show: true,
			searchInput: {
				span: 20
			},
			refreshButton: {
				span: 1
			},
			customerColumns: {
				span: 1
			},
			filterSetting: {
				span: 1,
				onClick: function () {
					// do your things
				}
			},
			fullscreenButton: {
				span: 1
			}
		}
	}
	return <div>
		<Table {...tableProps} />
	</div>
}
`
