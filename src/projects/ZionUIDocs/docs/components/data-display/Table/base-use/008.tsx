import React from 'react';
import { Table, TableProps } from "zion-ui"
import { Row, Col } from "antd"

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
	const tableProps: TableProps = {
		columns: [
			{ title: "编号", dataIndex: "key", width: 100, align: "center" },
			{ title: "项目名称", dataIndex: "name", align: "center" },
			{ title: "项目经理", dataIndex: "manageName", width: 120, align: "center" },
			{ title: "产品经理", dataIndex: "productName", width: 120, align: "center" },
			{ title: "状态", dataIndex: "status", width: 150, align: "center" }
		],
		scroll: { y: 300 },
		rowKey: "key",
		dataSource: getDataSource({ count }),
	}
	return <div>
		<Row>
			<Col span={12}>
				<Table {...tableProps} scroll={{ y: 300 }} />
			</Col>
			<Col span={2}></Col>
			<Col span={10}>
				<Table {...tableProps} scroll={{ y: 300, x: 800 }} />
			</Col>
		</Row>
	</div>
}

export const code = `
import React from 'react';
import { Table, TableProps } from "zion-ui"
import { Row, Col } from "antd"

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
	const tableProps: TableProps = {
		columns: [
			{ title: "编号", dataIndex: "key", width: 100, align: "center" },
			{ title: "项目名称", dataIndex: "name", align: "center" },
			{ title: "项目经理", dataIndex: "manageName", width: 120, align: "center" },
			{ title: "产品经理", dataIndex: "productName", width: 120, align: "center" },
			{ title: "状态", dataIndex: "status", width: 150, align: "center" }
		],
		scroll: { y: 300 },
		rowKey: "key",
		dataSource: getDataSource({ count }),
	}
	return <div>
		<Row>
			<Col span={12}>
				<Table {...tableProps} scroll={{ y: 300 }} />
			</Col>
			<Col span={2}></Col>
			<Col span={10}>
				<Table {...tableProps} scroll={{ y: 300, x: 800 }} />
			</Col>
		</Row>
	</div>
}
`
