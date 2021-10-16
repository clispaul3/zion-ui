import React from 'react';
import { Table, TableProps } from "zion-ui";
import { Row, Col, Typography } from "antd";

const InnerTable = function () {
	const tableProps: TableProps = {
		columns: [
			{ title: "编号", dataIndex: "key", width: 100 },
			{ title: "bug标题", dataIndex: "name" },
			{ title: "bug处理人", dataIndex: "user", width: 120 },
		],
		dataSource: [
			{ key: "001", name: "bug001", user: "zion" },
			{ key: "002", name: "bug002", user: "zion" },
			{ key: "003", name: "bug003", user: "zion" }
		],
	}
	return <Table {...tableProps} />
}

export const Demo = function () {
	const tableProps: TableProps = {
		columns: [
			{ title: "编号", dataIndex: "key" },
			{ title: "项目名称", dataIndex: "name" },
			{ title: "项目经理", dataIndex: "manageName", width: 120 },
			{ title: "产品经理", dataIndex: "productName", width: 120 }
		],
		expandable: {
			rowExpandable: (record) => record["key"].length <= 8,
			onExpand: (params) => <Row style={{ padding: "10px 20px" }}>
				<Col span={11}><InnerTable /></Col>
				<Col span={2}></Col>
				<Col span={11}><InnerTable /></Col>
			</Row>
		},
		rowSelection: {
			show: true,
			mode: "checkbox",
		},
		bordered: false,
		rowKey: "key",
		nestingMode: "customer",
		dataSource: [
			{ key: "001", name: "项目001", manageName: "项目经理001", productName: "产品经理001" },
			{ key: "002", name: "项目002", manageName: "项目经理002", productName: "产品经理002" },
			{ key: "003", name: "项目003", manageName: "项目经理003", productName: "产品经理003" }
		],
	}
	return <div>
		<Typography.Text type="danger">
			自定义模式(子表格的列和父表格不一样)的树形表格, 展开时调用 expandable.onExpand 返回自定义渲染的组件, 如果使用该模式，需确保dataSource数据源中的数据没有 children 字段, 通过expandable.rowExpandable 决定当前行是否可展开
		</Typography.Text>
		<Table {...tableProps} />
	</div>
}

export const code = `
import React from 'react';
import { Table, TableProps } from "zion-ui";
import { Row, Col, Typography } from "antd";

const InnerTable = function () {
	const tableProps: TableProps = {
		columns: [
			{ title: "编号", dataIndex: "key", width: 100 },
			{ title: "bug标题", dataIndex: "name" },
			{ title: "bug处理人", dataIndex: "user", width: 120 },
		],
		dataSource: [
			{ key: "001", name: "bug001", user: "zion" },
			{ key: "002", name: "bug002", user: "zion" },
			{ key: "003", name: "bug003", user: "zion" }
		],
	}
	return <Table {...tableProps} />
}

export const Demo = function () {
	const tableProps: TableProps = {
		columns: [
			{ title: "编号", dataIndex: "key" },
			{ title: "项目名称", dataIndex: "name" },
			{ title: "项目经理", dataIndex: "manageName", width: 120 },
			{ title: "产品经理", dataIndex: "productName", width: 120 }
		],
		expandable: {
			rowExpandable: (record) => record["key"].length <= 8,
			onExpand: (params) => <Row style={{ padding: "10px 20px" }}>
				<Col span={11}><InnerTable /></Col>
				<Col span={2}></Col>
				<Col span={11}><InnerTable /></Col>
			</Row>
		},
		rowSelection: {
			show: true,
			mode: "checkbox",
		},
		bordered: false,
		rowKey: "key",
		nestingMode: "customer",
		dataSource: [
			{ key: "001", name: "项目001", manageName: "项目经理001", productName: "产品经理001" },
			{ key: "002", name: "项目002", manageName: "项目经理002", productName: "产品经理002" },
			{ key: "003", name: "项目003", manageName: "项目经理003", productName: "产品经理003" }
		],
	}
	return <div>
		<Typography.Text type="danger">
			自定义模式(子表格的列和父表格不一样)的树形表格, 展开时调用 expandable.onExpand 返回自定义渲染的组件, 如果使用该模式，需确保dataSource数据源中的数据没有 children 字段, 通过expandable.rowExpandable 决定当前行是否可展开
		</Typography.Text>
		<Table {...tableProps} />
	</div>
}
`