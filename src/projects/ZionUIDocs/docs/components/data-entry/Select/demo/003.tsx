import React from 'react';
import { Select } from "zion-ui"
import { WarningTwoTone } from "@ant-design/icons"
import { Row, Col, Button } from "antd"

export const Demo = function () {
	const RadioStatus = Select({
		style: { width: "200px" },
		dataSource: [
			{ key: "1", label: "未开始" },
			{ key: "2", label: "进行中", render: (data) => data["label"] + "..." },
			{ key: "3", label: "已暂停", icon: <WarningTwoTone /> },
			{ key: "4", label: "已结束", disabled: true }
		],
		value: "1",
		showFooter: true
	}, true)
	const MultipeStatus = Select({
		mode: "checkbox",
		style: { width: "200px" },
		dataSource: [
			{ key: "1", label: "未开始" },
			{ key: "2", label: "进行中", render: (data) => data["label"] + "..." },
			{ key: "3", label: "已暂停", icon: <WarningTwoTone /> },
			{ key: "4", label: "已结束", disabled: true }
		],
		showFooter: true
	}, true)

	return <Row>
		<Col span={11}>
			<p><Button type="link">数据回填</Button></p>
			<RadioStatus />
		</Col>
		<Col span={2}></Col>
		<Col span={11}>
			<p><Button type="link">展示底部按钮</Button></p>
			<MultipeStatus />
		</Col>
	</Row>
}

export const code = `
import React from 'react';
import { Select } from "zion-ui"
import { WarningTwoTone } from "@ant-design/icons"
import { Row, Col, Button } from "antd"

export const Demo = function () {
	const RadioStatus = Select({
		style: { width: "200px" },
		dataSource: [
			{ key: "1", label: "未开始" },
			{ key: "2", label: "进行中", render: (data) => data["label"] + "..." },
			{ key: "3", label: "已暂停", icon: <WarningTwoTone /> },
			{ key: "4", label: "已结束", disabled: true }
		],
		value: "1",
		showFooter: true
	}, true)
	const MultipeStatus = Select({
		mode: "checkbox",
		style: { width: "200px" },
		dataSource: [
			{ key: "1", label: "未开始" },
			{ key: "2", label: "进行中", render: (data) => data["label"] + "..." },
			{ key: "3", label: "已暂停", icon: <WarningTwoTone /> },
			{ key: "4", label: "已结束", disabled: true }
		],
		showFooter: true
	}, true)

	return <Row>
		<Col span={11}>
			<p><Button type="link">数据回填</Button></p>
			<RadioStatus />
		</Col>
		<Col span={2}></Col>
		<Col span={11}>
			<p><Button type="link">展示底部按钮</Button></p>
			<MultipeStatus />
		</Col>
	</Row>
}
`
