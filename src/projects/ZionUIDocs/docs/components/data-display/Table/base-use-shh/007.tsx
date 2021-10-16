import React from 'react';
import { Table, Button } from "zion-ui"

export const Demo007 = function () {
	const Tpl = Table({
		columns: [
			{ title: "编号", dataIndex: "key", width: 50, align: "center" },
			{ title: "项目名称", dataIndex: "name", align: "center" },
			{ title: "项目经理", dataIndex: "manageName", width: 120, align: "center" },
			{ title: "产品经理", dataIndex: "productName", width: 120, align: "center" },
			{ title: "状态", dataIndex: "status", width: 150, align: "center" }
		],
		rowKey: "key",
		httpConfig: {
			init: async () => {
				return {
					data: [
						{ key: "001", name: "项目001", manageName: "项目经理001", productName: "产品经理001", status: "未开始" },
						{ key: "002", name: "项目002", manageName: "项目经理002", productName: "产品经理002", status: "未开始" },
						{ key: "003", name: "项目003", manageName: "项目经理003", productName: "产品经理003", status: "未开始" }
					],
					total: 3
				}
			}
		}
	}, true)
	return <div>
		<Tpl />
	</div>
}

export const code007 = `
import React from 'react';
import { Table, Button } from "zion-ui"

export const Demo = function () {
	const Tpl = Table({
		columns: [
			{ title: "编号", dataIndex: "key", width: 50, align: "center" },
			{ title: "项目名称", dataIndex: "name", align: "center" },
			{ title: "项目经理", dataIndex: "manageName", width: 120, align: "center" },
			{ title: "产品经理", dataIndex: "productName", width: 120, align: "center" },
			{ title: "状态", dataIndex: "status", width: 150, align: "center" }
		],
		rowKey: "key",
		httpConfig: {
			init: async () => {
				return {
					data: [
						{ key: "001", name: "项目001", manageName: "项目经理001", productName: "产品经理001", status: "未开始" },
						{ key: "002", name: "项目002", manageName: "项目经理002", productName: "产品经理002", status: "未开始" },
						{ key: "003", name: "项目003", manageName: "项目经理003", productName: "产品经理003", status: "未开始" }
					],
					total: 3
				}
			}
		}
	}, true)
	return <div>
		<Tpl />
	</div>
}
`
