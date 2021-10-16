import { MenuProps, Menu } from "zion-ui"
import { Row, Col } from "antd"
import React from "react"
import { UsbTwoTone, BugFilled } from "@ant-design/icons"

const config: MenuProps = {
	openKeys: ["common", "data-entry"],
	selectedKeys: [],
	style: { width: "200px" },
	dataSource: [
		{
			key: "common",
			label: "通用组件",
			isSubMenu: true,
			icon: <UsbTwoTone />,
			children: [
				{
					key: "Button",
					label: "Button 按钮",
					icon: <BugFilled />
				},
				{
					key: "Tag",
					label: "Tag 标签",
					icon: <BugFilled />
				}
			]
		},
		{
			key: "data-entry",
			label: "数据录入组件",
			isSubMenu: true,
			icon: <UsbTwoTone />,
			children: [
				{
					key: "Input",
					label: "Input 文本框"
				},
				{
					key: "DateTime",
					label: "DateTime 日期时间"
				}
			]
		}
	]
}
export const Demo001 = function () {
	return <Row style={{ margin:"0 20px 0 20px" }}>
		<Col span={11}>
			<Menu {...config} layout="inline" />
		</Col>
		<Col span={2}></Col>
		<Col span={11}>
			<Menu {...config} layout="inline" theme="dark" />
		</Col>
	</Row>
}

export const code001 = `
import { MenuProps, Menu } from "zion-ui"
import { Row, Col } from "antd"
import React from "react"
import { UsbTwoTone, BugFilled } from "@ant-design/icons"

const config: MenuProps = {
	openKeys: ["common", "data-entry"],
	selectedKeys: [],
	style: { width: "200px" },
	dataSource: [
		{
			key: "common",
			label: "通用组件",
			isSubMenu: true,
			icon: <UsbTwoTone />,
			children: [
				{
					key: "Button",
					label: "Button 按钮",
					icon: <BugFilled />
				},
				{
					key: "Tag",
					label: "Tag 标签",
					icon: <BugFilled />
				}
			]
		},
		{
			key: "data-entry",
			label: "数据录入组件",
			isSubMenu: true,
			icon: <UsbTwoTone />,
			children: [
				{
					key: "Input",
					label: "Input 文本框"
				},
				{
					key: "DateTime",
					label: "DateTime 日期时间"
				}
			]
		}
	]
}
export const Demo = function () {
	return <Row>
		<Col span={11}>
			<Menu {...config} layout="inline" />
		</Col>
		<Col span={2}></Col>
		<Col span={11}>
			<Menu {...config} layout="inline" theme="dark" />
		</Col>
	</Row>
}
`