import { MenuProps, Menu, Button, StateManage } from "zion-ui"
import { Row, Col } from "antd"
import React from "react"
import { UsbTwoTone, BugFilled } from "@ant-design/icons"

const controlKey = "Menu.Demo.003"

const config: MenuProps = {
	controlKey,
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
const Service = {
	// 添加节点
	addNode: function () {
		const { dataSource } = StateManage.get(controlKey)
		dataSource.push({
			key: "random-" + (Math.random() * 1000).toFixed(0),
			label: "随机节点"
		})
		StateManage.set(controlKey, { dataSource })
	},
	// 收起节点
	packUpNode: function () {
		StateManage.set(controlKey, { openKeys: [] })
	},
	// 展开节点
	openNode: function () {
		StateManage.set(controlKey, { openKeys: ["common", "data-entry"] })
	},
	// 修改节点
	updateNode: function () {
		const { dataSource } = StateManage.get(controlKey)
		dataSource[0]["label"] = "修改后的label"
		StateManage.set(controlKey, { dataSource })
	},
	// 选中节点
	selectNode: function () {
		StateManage.set(controlKey, { selectedKeys: ["Button"] })
	}
}
export const Demo003 = function () {
	return <Row>
		<Col span={11}>
			<Button text="添加节点" type="primary" style={{ margin: "10px", display: "block" }} onClick={Service.addNode} />
			<Button text="收起节点" type="primary" style={{ margin: "10px", display: "block" }} onClick={Service.packUpNode} />
			<Button text="展开节点" type="primary" style={{ margin: "10px", display: "block" }} onClick={Service.openNode} />
			<Button text="修改节点" type="primary" style={{ margin: "10px", display: "block" }} onClick={Service.updateNode} />
			<Button text="选中节点" type="primary" style={{ margin: "10px", display: "block" }} onClick={Service.selectNode} />
		</Col>
		<Col span={2}></Col>
		<Col span={11}>
			<Menu {...config} theme="dark" layout="inline" />
		</Col>
	</Row>
}

export const code003 = `
import { MenuProps, Menu, Button, StateManage } from "zion-ui"
import { Row, Col } from "antd"
import React from "react"
import { UsbTwoTone, BugFilled } from "@ant-design/icons"

const controlKey = "Menu.Demo.003"

const config: MenuProps = {
	controlKey,
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
const Service = {
	// 添加节点
	addNode: function () {
		const { dataSource } = StateManage.get(controlKey)
		dataSource.push({
			key: "random-" + (Math.random() * 1000).toFixed(0),
			label: "随机节点"
		})
		StateManage.set(controlKey, { dataSource })
	},
	// 收起节点
	packUpNode: function () {
		StateManage.set(controlKey, { openKeys: [] })
	},
	// 展开节点
	openNode: function () {
		StateManage.set(controlKey, { openKeys: ["common", "data-entry"] })
	},
	// 修改节点
	updateNode: function () {
		const { dataSource } = StateManage.get(controlKey)
		dataSource[0]["label"] = "修改后的label"
		StateManage.set(controlKey, { dataSource })
	},
	// 选中节点
	selectNode: function () {
		StateManage.set(controlKey, { selectedKeys: ["Button"] })
	}
}
export const Demo = function () {
	return <Row>
		<Col span={11}>
			<Button text="添加节点" type="primary" style={{ margin: "10px", display: "block" }} onClick={Service.addNode} />
			<Button text="收起节点" type="primary" style={{ margin: "10px", display: "block" }} onClick={Service.packUpNode} />
			<Button text="展开节点" type="primary" style={{ margin: "10px", display: "block" }} onClick={Service.openNode} />
			<Button text="修改节点" type="primary" style={{ margin: "10px", display: "block" }} onClick={Service.updateNode} />
			<Button text="选中节点" type="primary" style={{ margin: "10px", display: "block" }} onClick={Service.selectNode} />
		</Col>
		<Col span={2}></Col>
		<Col span={11}>
			<Menu {...config} theme="dark" layout="inline" />
		</Col>
	</Row>
}
`