import React from 'react';
import { Table } from "zion-ui"

export const Demo004 = function () {
	// 获取数据源
	let count = 23
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
	const Tpl = Table({
		columns: [
			{ title: "编号", dataIndex: "key", width: 100, align: "center" },
			{ title: "项目名称", dataIndex: "name", align: "center" },
			{ title: "项目经理", dataIndex: "manageName", width: 120, align: "center" },
			{ title: "产品经理", dataIndex: "productName", width: 120, align: "center" },
			{ title: "状态", dataIndex: "status", width: 150, align: "center" }
		],
		rowKey: "key",
		dataSource: getDataSource({ count }),
		pagination: {
			show: true,
			pageSize: 5,
			showQuickJumper: false,
			showSizeChanger: false,
			showTotal: <span>总计 <strong>{count}</strong> 条数据</span>
		}
	}, true)
	return <div>
		<Tpl />
	</div>
}

export const code004 = `
import React from 'react';
import { Table } from "zion-ui"

export const Demo = function () {
	// 获取数据源
	let count = 23
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
	const Tpl = Table({
		columns: [
			{ title: "编号", dataIndex: "key", width: 100, align: "center" },
			{ title: "项目名称", dataIndex: "name", align: "center" },
			{ title: "项目经理", dataIndex: "manageName", width: 120, align: "center" },
			{ title: "产品经理", dataIndex: "productName", width: 120, align: "center" },
			{ title: "状态", dataIndex: "status", width: 150, align: "center" }
		],
		rowKey: "key",
		dataSource: getDataSource({ count }),
		pagination: {
			show: true,
			pageSize: 5,
			showQuickJumper: false,
			showSizeChanger: false,
			showTotal: <span>总计 <strong>{count}</strong> 条数据</span>
		}
	}, true)
	return <div>
		<Tpl />
	</div>
}
`
