import React from 'react';
import { Select } from "zion-ui"
import { WarningTwoTone } from "@ant-design/icons"
import { Row, Col, Button } from "antd"

export const Demo = function () {
  const RadioStatus = Select({
    dataSource: [
      { key: "1", label: "未开始" },
      { key: "2", label: "进行中", render: (data) => data["label"] + "..." },
      { key: "3", label: "已暂停", icon: <WarningTwoTone /> },
      { key: "4", label: "已结束", disabled: true }
    ],
    autoValidate: true,
    hasFeedback: true,
    allowClear: true,
    value: "1",
    label: "状态",
    required: true,
    style: { width: "80%" },
    validateResult: { status: "success" }
  }, true)
  return <Row>
    <Col span={6}>
      <p><Button type="link">自动校验</Button></p>
      <RadioStatus />
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
		dataSource: [
			{ key: "1", label: "未开始" },
			{ key: "2", label: "进行中", render: (data) => data["label"] + "..." },
			{ key: "3", label: "已暂停", icon: <WarningTwoTone /> },
			{ key: "4", label: "已结束", disabled: true }
		],
		autoValidate: true,
		hasFeedback: true,
		allowClear: true,
		value: "1",
		label: "状态",
		required: true,
		style: { width: "80%" },
		validateResult: { status: "success" }
	}, true)
	return <Row>
		<Col span={6}>
			<p><Button type="link">自动校验</Button></p>
			<RadioStatus />
		</Col>
	</Row>
}
`