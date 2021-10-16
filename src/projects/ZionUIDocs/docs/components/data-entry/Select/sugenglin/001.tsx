import React from 'react';
import { Select } from "zion-ui"
import { WarningTwoTone } from "@ant-design/icons"
import { Row, Col, Button } from "antd"

export const Demo = function () {
  const RadioStatus = Select({
    // className: "zion-ui-no-border",
    style: { width: "200px" },
    maxTagCount: 1,
    dataSource: [
      { key: "1", label: "未开始" },
      { key: "2", label: "进行中", render: (data) => data["label"] + "..." },
      { key: "3", label: "已暂停", icon: <WarningTwoTone /> },
      { key: "4", label: "已结束", disabled: true }
    ],
    onFocus: () => {
      console.log(1111);

    }
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
  }, true)

  return <Row>
    <Col span={11}>
      <p><Button type="link">单选</Button></p>
      <RadioStatus />
    </Col>
    <Col span={2}></Col>
    <Col span={11}>
      <p><Button type="link">多选(聚焦时自动将选中数据排在下拉列表最前)</Button></p>
      <MultipeStatus />
    </Col>
  </Row>
}

export const code1_1 = `
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
	}, true)

	return <Row>
		<Col span={11}>
			<p><Button type="link">单选</Button></p>
			<RadioStatus />
		</Col>
	</Row>
}
`
export const code1_2 = `
import React from 'react';
import { Select } from "zion-ui"
import { WarningTwoTone } from "@ant-design/icons"
import { Row, Col, Button } from "antd"

export const Demo = function () {
	const MultipeStatus = Select({
		mode: "checkbox",
		style: { width: "200px" },
		dataSource: [
			{ key: "1", label: "未开始" },
			{ key: "2", label: "进行中", render: (data) => data["label"] + "..." },
			{ key: "3", label: "已暂停", icon: <WarningTwoTone /> },
			{ key: "4", label: "已结束", disabled: true }
		],
	}, true)

	return <Row>
		<Col span={11}>
			<p><Button type="link">多选(聚焦时自动将选中数据排在下拉列表最前)</Button></p>
			<MultipeStatus />
		</Col>
	</Row>
}
`

