import { MenuProps, Menu } from "zion-ui"
import { Row, Col } from "antd"
import React from "react"
import { UsbTwoTone, BugFilled } from "@ant-design/icons"

const config: MenuProps = {
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
		<Col span={8}>
			<Menu {...config} layout="horizontal" />
		</Col>
		<Col span={1}></Col>
		<Col span={7}>
			<Menu {...config} layout="vertical" style={{ width: "200px" }} />
		</Col>
		<Col span={1}></Col>
		<Col span={7}>
			<Menu {...config} layout="inline" style={{ width: "200px" }} openKeys={["common", "data-entry"]} />
		</Col>
	</Row>
}

export const code = `
import { MenuProps, Menu } from "zion-ui"
import { Row, Col } from "antd"
import React from "react"
import { UsbTwoTone, BugFilled } from "@ant-design/icons"

const config: MenuProps = {
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
		<Col span={8}>
			<Menu {...config} layout="horizontal" />
		</Col>
		<Col span={1}></Col>
		<Col span={7}>
			<Menu {...config} layout="vertical" style={{ width: "200px" }} />
		</Col>
		<Col span={1}></Col>
		<Col span={7}>
			<Menu {...config} layout="inline" style={{ width: "200px" }} openKeys={["common", "data-entry"]} />
		</Col>
	</Row>
}
`