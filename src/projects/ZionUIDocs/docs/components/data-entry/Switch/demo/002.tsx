import React from 'react';
import { Switch, StateManage } from "zion-ui"
import { Row, Col } from "antd"

export const Demo = function () {
	const [hobbyState, HobbyTpl] = Switch({
		label: "是否喜欢穿裙子",
		value: true,
		disabled: true,
		unCheckedChildren: "否",
		checkedChildren: "是"
	}, false)
	return <Row>
		<Col span={4}>
			<Switch
				label="性别"
				required={true}
				unCheckedChildren={"女"}
				checkedChildren="男"
				onChange={({ value }) => {
					StateManage.set(hobbyState, { value: value ? false : true })
				}}
			/>
		</Col>
		<Col span={8}>
			<HobbyTpl />
		</Col>
	</Row>
}

export const code = `
import React from 'react';
import { Switch, StateManage } from "zion-ui"
import { Row, Col } from "antd"

export const Demo = function () {
	const [hobbyState, HobbyTpl] = Switch({
		label: "是否喜欢穿裙子",
		value: true,
		disabled: true,
		unCheckedChildren: "否",
		checkedChildren: "是"
	}, false)
	return <Row>
		<Col span={4}>
			<Switch
				label="性别"
				required={true}
				unCheckedChildren={"女"}
				checkedChildren="男"
				onChange={({ value }) => {
					StateManage.set(hobbyState, { value: value ? false : true })
				}}
			/>
		</Col>
		<Col span={8}>
			<HobbyTpl />
		</Col>
	</Row>
}
`