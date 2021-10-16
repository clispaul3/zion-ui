import React from "react"
import { DetailForm, DetailFormProps, Button } from "zion-ui"
import { Row, Col } from "antd"

export const Demo = function () {
	const userInfo = {
		name: "zion-ui",
		version: "V2.0.1",
		desc: "前端应用类UI框架"
	}
	const props: DetailFormProps = {
		data: userInfo,
		layout: {
			labelCol: { span: 4 }
		},
		rows: [
			{ title: "名称", dataIndex: "name" },
			{ title: "版本", dataIndex: "version" },
			{ title: "描述", dataIndex: "desc" },
			{
				title: "操作", render: () => {
					return <Button text="编辑" type="info" size="small" />
				}
			}
		]
	}
	return <Row>
		<Col span={11}>
			<DetailForm {...props} />
		</Col>
		<Col span={2}></Col>
		<Col span={11}>
			<DetailForm {...props} style={{ background: "#fff", border: "1px solid red", borderRadius: "3px" }} />
		</Col>
	</Row>
}

export const code = `
import React from "react"
import { DetailForm, DetailFormProps, Button } from "zion-ui"
import { Row, Col } from "antd"

export const Demo = function () {
	const userInfo = {
		name: "zion-ui",
		version: "V2.0.1",
		desc: "前端应用类UI框架"
	}
	const props: DetailFormProps = {
		data: userInfo,
		layout: {
			labelCol: { span: 4 }
		},
		rows: [
			{ title: "名称", dataIndex: "name" },
			{ title: "版本", dataIndex: "version" },
			{ title: "描述", dataIndex: "desc" },
			{
				title: "操作", render: () => {
					return <Button text="编辑" type="info" size="small" />
				}
			}
		]
	}
	return <Row>
		<Col span={11}>
			<DetailForm {...props} />
		</Col>
		<Col span={2}></Col>
		<Col span={11}>
			<DetailForm {...props} style={{ background: "#fff", border: "1px solid red", borderRadius: "3px" }} />
		</Col>
	</Row>
}
`