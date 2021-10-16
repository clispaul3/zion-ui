import React from 'react';
import { Table, TableProps } from "zion-ui";
import { Row, Col } from "antd";

export const Demo = function () {
	// 获取数据源
	const getDataSource = function () {
		const dataSource: any = []
		let count = 23
		while (count-- > 0) {
			dataSource.push({
				key: "key-" + count,
				name: "项目" + count,
				manageName: "项目经理" + count,
			})
		}
		return dataSource
	}
	const tableProps: TableProps = {
		columns: [
			{ title: "编号", dataIndex: "key", width: 100, align: "center" },
			{ title: "项目名称", dataIndex: "name", align: "center" },
			{ title: "项目经理", dataIndex: "manageName", width: 120, align: "center" },
		],
		rowKey: "key",
		dataSource: getDataSource(),
		pagination: {
			show: true,
			pageSize: 5
		}
	}
	return <div>
		<Row>
			<Col span={11}>
				<Table {...tableProps} pagination={{ show: true, pageSize: 5 }} />
			</Col>
			<Col span={2}></Col>
			<Col span={11}>
				<Table {...tableProps} pagination={{ show: true, pageSize: 5, simple: true }} />
			</Col>
		</Row>
	</div>
}

export const code = `
import React from 'react';
import { Table, TableProps } from "zion-ui";
import { Row, Col } from "antd";

export const Demo = function () {
	// 获取数据源
	const getDataSource = function () {
		const dataSource: any = []
		let count = 23
		while (count-- > 0) {
			dataSource.push({
				key: "key-" + count,
				name: "项目" + count,
				manageName: "项目经理" + count,
			})
		}
		return dataSource
	}
	const tableProps: TableProps = {
		columns: [
			{ title: "编号", dataIndex: "key", width: 100, align: "center" },
			{ title: "项目名称", dataIndex: "name", align: "center" },
			{ title: "项目经理", dataIndex: "manageName", width: 120, align: "center" },
		],
		rowKey: "key",
		dataSource: getDataSource(),
		pagination: {
			show: true,
			pageSize: 5
		}
	}
	return <div>
		<Row>
			<Col span={11}>
				<Table {...tableProps} pagination={{ show: true, pageSize: 5 }} />
			</Col>
			<Col span={2}></Col>
			<Col span={11}>
				<Table {...tableProps} pagination={{ show: true, pageSize: 5, simple: true }} />
			</Col>
		</Row>
	</div>
}
`