import React from 'react';
import { Table } from "zion-ui"

export const Demo = function () {
	const Tpl = Table({
		columns: [
			{ title: "编号", dataIndex: "key", width: 100, align: "center" },
			{ title: "项目名称", dataIndex: "name", align: "center" },
			{ title: "项目经理", dataIndex: "manageName", width: 200, align: "right" },
			{ title: "产品经理", dataIndex: "productName", width: 150 },
			{ title: "状态", dataIndex: "status", width: 150 }
		],
		rowKey: "key",
		dataSource: [
			{ key: "001", name: "项目001", manageName: "项目经理001", productName: "产品经理001", status: "未开始" },
			{ key: "002", name: "项目002", manageName: "项目经理002", productName: "产品经理002", status: "未开始" },
			{ key: "003", name: "项目003", manageName: "项目经理003", productName: "产品经理003", status: "未开始" }
		]
	}, true)
	return <div>
		<Tpl />
	</div>
}

export const code = `
import React from 'react';
import { Table } from "zion-ui"

export const Demo = function () {
	const Tpl = Table({
		columns: [
			{ title: "编号", dataIndex: "key", width: 100, align: "center" },
			{ title: "项目名称", dataIndex: "name", align: "center" },
			{ title: "项目经理", dataIndex: "manageName", width: 200, align: "right" },
			{ title: "产品经理", dataIndex: "productName", width: 150 },
			{ title: "状态", dataIndex: "status", width: 150 }
		],
		rowKey: "key",
		dataSource: [
			{ key: "001", name: "项目001", manageName: "项目经理001", productName: "产品经理001", status: "未开始" },
			{ key: "002", name: "项目002", manageName: "项目经理002", productName: "产品经理002", status: "未开始" },
			{ key: "003", name: "项目003", manageName: "项目经理003", productName: "产品经理003", status: "未开始" }
		]
	}, true)
	return <div>
		<Tpl />
	</div>
}
`