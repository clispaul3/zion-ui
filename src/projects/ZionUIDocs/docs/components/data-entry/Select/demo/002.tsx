import React from 'react';
import { Select } from "zion-ui"
import { WarningTwoTone } from "@ant-design/icons"
import { Row, Col, Button } from "antd"

export const Demo = function () {
	const RadioStatus = Select({
		style: { width: "200px" },
		httpConfig: {
			init: async () => {
				const dataSource = [
					{ key: "1", label: "未开始" },
					{ key: "2", label: "进行中", render: (data: any) => data["label"] + "..." },
					{ key: "3", label: "已暂停", icon: <WarningTwoTone style={{ paddingRight: "5px" }} /> },
					{ key: "4", label: "已结束", disabled: true }
				]
				return new Promise((resolve) => {
					setTimeout(() => {
						resolve(dataSource)
					}, 300)
				})
			}
		}
	}, true)
	const MultipeStatus = Select({
		mode: "checkbox",
		style: { width: "200px" },
		httpConfig: {
			init: async () => {
				const dataSource = [
					{ key: "1", label: "未开始" },
					{ key: "2", label: "进行中", render: (data: any) => data["label"] + "..." },
					{ key: "3", label: "已暂停", icon: <WarningTwoTone /> },
					{ key: "4", label: "已结束", disabled: true }
				]
				return new Promise((resolve) => {
					setTimeout(() => {
						resolve(dataSource)
					}, 300)
				})
			},
			onSearch: async ({ value }: any) => {
				const dataSource = [
					{ key: "1", label: value },
				]
				return new Promise((resolve) => {
					setTimeout(() => {
						if (!value) resolve([])
						resolve(dataSource)
					}, 100)
				})
			}
		}
	}, true)

	return <Row>
		<Col span={11}>
			<p><Button type="link">初始化</Button></p>
			<RadioStatus />
		</Col>
		<Col span={2}></Col>
		<Col span={11}>
			<p><Button type="link">异步搜索(已内置防抖处理)</Button></p>
			<MultipeStatus />
		</Col>
	</Row>
}

export const code = `
import React from 'react';
import { Select } from "zion-ui"
import { WarningTwoTone } from "@ant-design/icons"
import { Row, Col, Button } from "antd"

const Demo = function () {
	const RadioStatus = Select({
		style: { width: "200px" },
		httpConfig: {
			init: async () => {
				const dataSource = [
					{ key: "1", label: "未开始" },
					{ key: "2", label: "进行中", render: (data: any) => data["label"] + "..." },
					{ key: "3", label: "已暂停", icon: <WarningTwoTone style={{ paddingRight: "5px" }} /> },
					{ key: "4", label: "已结束", disabled: true }
				]
				return new Promise((resolve) => {
					setTimeout(() => {
						resolve(dataSource)
					}, 300)
				})
			}
		}
	}, true)
	const MultipeStatus = Select({
		mode: "checkbox",
		style: { width: "200px" },
		httpConfig: {
			init: async () => {
				const dataSource = [
					{ key: "1", label: "未开始" },
					{ key: "2", label: "进行中", render: (data: any) => data["label"] + "..." },
					{ key: "3", label: "已暂停", icon: <WarningTwoTone /> },
					{ key: "4", label: "已结束", disabled: true }
				]
				return new Promise((resolve) => {
					setTimeout(() => {
						resolve(dataSource)
					}, 300)
				})
			},
			onSearch: async ({ value }: any) => {
				const dataSource = [
					{ key: "1", label: value },
				]
				return new Promise((resolve) => {
					setTimeout(() => {
						if (!value) resolve([])
						resolve(dataSource)
					}, 100)
				})
			}
		}
	}, true)

	return <Row>
		<Col span={11}>
			<p><Button type="link">初始化</Button></p>
			<RadioStatus />
		</Col>
		<Col span={2}></Col>
		<Col span={11}>
			<p><Button type="link">异步搜索(已内置防抖处理)</Button></p>
			<MultipeStatus />
		</Col>
	</Row>
}
`