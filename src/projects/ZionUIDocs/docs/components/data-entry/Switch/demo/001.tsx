import React from 'react';
import { Switch } from "zion-ui"
import { Row, Col } from "antd"

export const Demo = function () {
	return <Row>
		<Col span={4}>
			<Switch size="small" />
		</Col>
		<Col span={4}>
			<Switch />
		</Col>
		<Col span={4}>
			<Switch label="是否关闭" required={true} />
		</Col>
		<Col span={4}>
			<Switch label="性别" required={true} unCheckedChildren={"女"} checkedChildren="男" />
		</Col>
		<Col span={4}>
			<Switch label="性别" required={true} value={true} disabled={true} unCheckedChildren={"女"} checkedChildren="男" />
		</Col>
	</Row>
}

export const code = `
import React from 'react';
import { Switch } from "zion-ui"
import { Row, Col } from "antd"

export const Demo = function () {
	return <Row>
		<Col span={4}>
			<Switch size="small" />
		</Col>
		<Col span={4}>
			<Switch />
		</Col>
		<Col span={4}>
			<Switch label="是否关闭" required={true} />
		</Col>
		<Col span={4}>
			<Switch label="性别" required={true} unCheckedChildren={"女"} checkedChildren="男" />
		</Col>
		<Col span={4}>
			<Switch label="性别" required={true} value={true} disabled={true} unCheckedChildren={"女"} checkedChildren="男" />
		</Col>
	</Row>
}
`