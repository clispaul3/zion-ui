import React from 'react';
import { Table, TableProps, StateManage } from "zion-ui";
import { BugFilled } from "@ant-design/icons";

export const Demo = function () {
	const controlKey = "Table.Pro.004"
	const tableProps: TableProps = {
		controlKey,
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
				span: 16,
				content: "项目列表"
			},
			headerButton: {
				span: 8,
				button: [
					{ text: "新建", btnCode: "CREATE_BUTTON" },
					{ text: "导出", btnCode: "EXPORT_BUTTON" },
					{ text: "导入", btnCode: "IMPORT_BUTTON" },
					{ text: "删除", btnCode: "HEADER_DELETE_BUTTON" },
					{
						text: "禁用",
						color: "red",
						icon: <BugFilled />,
						onClick: function () {
							StateManage.set(controlKey, { disabled: true })
						}
					}
				]
			}
		}
	}
	return <div>
		<Table {...tableProps} />
	</div>
}


export const code = `
import React from 'react';
import { Table, TableProps, StateManage } from "zion-ui";
import { BugFilled } from "@ant-design/icons";

export const Demo = function () {
	const controlKey = "Table.Pro.004"
	const tableProps: TableProps = {
		controlKey,
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
				span: 16,
				content: "项目列表"
			},
			headerButton: {
				span: 8,
				button: [
					{ text: "新建", btnCode: "CREATE_BUTTON" },
					{ text: "导出", btnCode: "EXPORT_BUTTON" },
					{ text: "导入", btnCode: "IMPORT_BUTTON" },
					{ text: "删除", btnCode: "HEADER_DELETE_BUTTON" },
					{
						text: "禁用",
						color: "red",
						icon: <BugFilled />,
						onClick: function () {
							StateManage.set(controlKey, { disabled: true })
						}
					}
				]
			}
		}
	}
	return <div>
		<Table {...tableProps} />
	</div>
}
`