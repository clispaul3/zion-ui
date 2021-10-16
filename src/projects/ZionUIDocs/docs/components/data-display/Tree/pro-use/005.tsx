import React from 'react';
import { Tree } from "zion-ui";
import { Row, Col, Button } from "antd";

export const Demo = function () {
	const originData: any = []
	let count = 10
	while (count-- > 0) {
		let count2 = 10
		originData.push({ id: count, title: "节点编号-" + count, uiPid: null })
		while (count2-- > 0) {
			const id = count + "-" + count2
			originData.push({ id: id, title: "节点编号-" + id, uiPid: count })
			let count3 = 1
			while (count3-- > 0) {
				const id2 = count + "-" + count2 + "-" + count3
				originData.push({ id: id2, title: "节点编号-" + id2, uiPid: id })
			}
		}
	}
	const TestTree = Tree({
		allowSearch: false,
		showFooter: true,
		mode: { isRadio: true },
		height: 500,
		originData
	}, true)
	return <Row>
		<Col span={5}></Col>
		<Col span={11} style={{ width: "300px", border: "1px solid #eee", padding: "10px", borderRadius: "3px" }}>
			<Button type="link" size="small" style={{ margin: "10px" }}>大数据量(10W)</Button>
			<TestTree />
		</Col>
	</Row>
}

export const code = `
import React from 'react';
import { Tree } from "zion-ui";
import { Row, Col, Button } from "antd";

export const Demo = function () {
	const originData: any = []
	let count = 100
	while (count-- > 0) {
		let count2 = 100
		originData.push({ id: count, title: "节点编号-" + count, uiPid: null })
		while (count2-- > 0) {
			const id = count + "-" + count2
			originData.push({ id: id, title: "节点编号-" + id, uiPid: count })
			let count3 = 10
			while (count3-- > 0) {
				const id2 = count + "-" + count2 + "-" + count3
				originData.push({ id: id2, title: "节点编号-" + id2, uiPid: id })
			}
		}
	}
	const TestTree = Tree({
		allowSearch: false,
		showFooter: true,
		mode: { isRadio: true },
		height: 500,
		originData
	}, true)
	return <Row>
		<Col span={5}></Col>
		<Col span={11} style={{ width: "300px", border: "1px solid #eee", padding: "10px", borderRadius: "3px" }}>
			<Button type="link" size="small" style={{ margin: "10px" }}>大数据量(10W)</Button>
			<TestTree />
		</Col>
	</Row>
}
`