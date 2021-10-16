import React from 'react';
import { Table, TableProps, Button } from "zion-ui"

export const Demo007 = function () {
	const getChildren = function ({ pid }) {
		const item: any = { key: "001" + "-" + pid, name: "项目001", manageName: "项目经理001", productName: "产品经理001" }
		if (pid.length <= 8) {
			item.children = []
		}
		return [item]
	}
	const tableProps: TableProps = {
		columns: [
			{ title: "编号", dataIndex: "key" },
			{ title: "项目名称", dataIndex: "name" },
			{ title: "项目经理", dataIndex: "manageName", width: 120 },
			{ title: "产品经理", dataIndex: "productName", width: 120 }
		],
		rowSelection: {
			show: true,
			mode: "checkbox",
		},
		expandable: {
			rowExpandable: (record) => record["key"].length <= 8
		},
		bordered: false,
		rowKey: "key",
		nestingMode: "inherit",
		dataSource: [
			{ key: "001", name: "项目001", manageName: "项目经理001", productName: "产品经理001", children: [] },
			{ key: "002", name: "项目002", manageName: "项目经理002", productName: "产品经理002", children: [] },
			{ key: "003", name: "项目003", manageName: "项目经理003", productName: "产品经理003", children: [] }
		],
		httpConfig: {
			onExpand: async ({ record }) => {
				return getChildren({ pid: record["key"] })
			}
		}
	}
	return <div>
		<Button text="继承模式(子表格的列和父表格一样)的树形表格, 通过 httpConfig.onExpand 获取子表格的数据，通过控制数据源的 children 字段(有无该字段)决定当前行是否可展开" type="link" />
		<Table {...tableProps} />
	</div>
}

export const code007 = `
import React from 'react';
import { Table, TableProps, Button } from "zion-ui"

export const Demo = function () {
	const getChildren = function ({ pid }) {
		const item: any = { key: "001" + "-" + pid, name: "项目001", manageName: "项目经理001", productName: "产品经理001" }
		if (pid.length <= 8) {
			item.children = []
		}
		return [item]
	}
	const tableProps: TableProps = {
		columns: [
			{ title: "编号", dataIndex: "key" },
			{ title: "项目名称", dataIndex: "name" },
			{ title: "项目经理", dataIndex: "manageName", width: 120 },
			{ title: "产品经理", dataIndex: "productName", width: 120 }
		],
		rowSelection: {
			show: true,
			mode: "checkbox",
		},
		expandable: {
			rowExpandable: (record) => record["key"].length <= 8
		},
		bordered: false,
		rowKey: "key",
		nestingMode: "inherit",
		dataSource: [
			{ key: "001", name: "项目001", manageName: "项目经理001", productName: "产品经理001", children: [] },
			{ key: "002", name: "项目002", manageName: "项目经理002", productName: "产品经理002", children: [] },
			{ key: "003", name: "项目003", manageName: "项目经理003", productName: "产品经理003", children: [] }
		],
		httpConfig: {
			onExpand: async ({ record }) => {
				return getChildren({ pid: record["key"] })
			}
		}
	}
	return <div>
		<Button text="继承模式(子表格的列和父表格一样)的树形表格, 通过 httpConfig.onExpand 获取子表格的数据，通过控制数据源的 children 字段(有无该字段)决定当前行是否可展开" type="link" />
		<Table {...tableProps} />
	</div>
}
`
