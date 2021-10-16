import React from 'react';
import { Tree, Button, StateManage } from "zion-ui";
import { Row, Col } from "antd";

export const Demo = function () {
	const controlKey = "TreeBaseDemo003"
	const TestTree = Tree({
		controlKey: controlKey,
		showFooter: true,
		mode: { isRadio: false, radioBrothers: true },
		height: 300,
		httpConfig: {
			init: async () => {
				// 返回接口查询的数据
				return new Promise((resolve) => {
					setTimeout(() => {
						const originData = [
							{ id: "001", title: "中华人民共和国", nocheck: true, uiPid: null, open: true },  // 展开该节点
							{ id: "002", title: "广东省", uiPid: "001" },
							{ id: "003", title: "江西省", uiPid: "001" },
							{ id: "004", title: "北京市", uiPid: "001" },
							{ id: "005", title: "广州市", uiPid: "002" },
							{ id: "006", title: "番禺区", uiPid: "005" },
							{ id: "007", title: "东环大街", uiPid: "006" },
							{ id: "008", title: "天安节能科技园", uiPid: "007" },
							{ id: "009", title: "千千氏", uiPid: "008", disabled: true },
							{ id: "010", title: "四季沐足", uiPid: "008", nocheck: true }
						]
						resolve(originData)
					}, 800)
				})
			}
		}
	}, true)
	const DisabledTree = Tree({
		height: 300,
		mode: { isRadio: false, isAsync: true },
		originData: [
			{ id: "001", title: "中华人民共和国", nocheck: true, uiPid: null },  // 展开该节点
			{ id: "002", title: "广东省", nocheck: true, uiPid: "001" },
			{ id: "003", title: "江西省", uiPid: "001" },
			{ id: "004", title: "北京市", uiPid: "001" },
			{ id: "005", title: "广州市", uiPid: "002" },
			{ id: "006", title: "番禺区", uiPid: "005" },
			{ id: "007", title: "东环大街", uiPid: "006" },
			{ id: "008", title: "天安节能科技园", uiPid: "007", isParent: true },
		],
		httpConfig: {
			onSearch: async (value) => {
				// 返回接口查询的数据
				return [
					{ key: "HY001", label: "浩云科技" },
				]
			},
			onExpand: async (node) => {
				// 返回接口查询的数据
				return [
					{ id: "HY001", title: "浩云科技", uiPid: "008" },
				]
			}
		}
	}, true)
	return <Row>
		<Col span={11} style={{ width: "300px", border: "1px solid #eee", padding: "10px", borderRadius: "3px" }}>
			<Button text="httpConfig.init" type="link" size="small" style={{ margin: "10px" }} onClick={() => {
				const { init } = StateManage.get(controlKey)
				init()
			}} />
			<TestTree />
		</Col>
		<Col span={2}></Col>
		<Col span={11} style={{ width: "300px", border: "1px solid #eee", padding: "10px", borderRadius: "3px" }}>
			<Button text="httpConfig.onExpand  httpConfig.onSearch" type="link" size="small" style={{ margin: "10px" }} />
			<DisabledTree />
		</Col>
	</Row>
}

export const code = `
import React from 'react';
import { Tree, Button, StateManage } from "zion-ui";
import { Row, Col } from "antd";

export const Demo = function () {
	const controlKey = "TreeBaseDemo003"
	const TestTree = Tree({
		controlKey: controlKey,
		showFooter: true,
		mode: { isRadio: false, radioBrothers: true },
		height: 300,
		httpConfig: {
			init: async () => {
				// 返回接口查询的数据
				return new Promise((resolve) => {
					setTimeout(() => {
						const originData = [
							{ id: "001", title: "中华人民共和国", nocheck: true, uiPid: null, open: true },  // 展开该节点
							{ id: "002", title: "广东省", uiPid: "001" },
							{ id: "003", title: "江西省", uiPid: "001" },
							{ id: "004", title: "北京市", uiPid: "001" },
							{ id: "005", title: "广州市", uiPid: "002" },
							{ id: "006", title: "番禺区", uiPid: "005" },
							{ id: "007", title: "东环大街", uiPid: "006" },
							{ id: "008", title: "天安节能科技园", uiPid: "007" },
							{ id: "009", title: "千千氏", uiPid: "008", disabled: true },
							{ id: "010", title: "四季沐足", uiPid: "008", nocheck: true }
						]
						resolve(originData)
					}, 800)
				})
			}
		}
	}, true)
	const DisabledTree = Tree({
		height: 300,
		mode: { isRadio: false, isAsync: true },
		originData: [
			{ id: "001", title: "中华人民共和国", nocheck: true, uiPid: null },  // 展开该节点
			{ id: "002", title: "广东省", nocheck: true, uiPid: "001" },
			{ id: "003", title: "江西省", uiPid: "001" },
			{ id: "004", title: "北京市", uiPid: "001" },
			{ id: "005", title: "广州市", uiPid: "002" },
			{ id: "006", title: "番禺区", uiPid: "005" },
			{ id: "007", title: "东环大街", uiPid: "006" },
			{ id: "008", title: "天安节能科技园", uiPid: "007", isParent: true },
		],
		httpConfig: {
			onSearch: async (value) => {
				// 返回接口查询的数据
				return [
					{ key: "HY001", label: "浩云科技" },
				]
			},
			onExpand: async (node) => {
				// 返回接口查询的数据
				return [
					{ id: "HY001", title: "浩云科技", uiPid: "008" },
				]
			}
		}
	}, true)
	return <Row>
		<Col span={11} style={{ width: "300px", border: "1px solid #eee", padding: "10px", borderRadius: "3px" }}>
			<Button text="httpConfig.init" type="link" size="small" style={{ margin: "10px" }} onClick={() => {
				const { init } = StateManage.get(controlKey)
				init()
			}} />
			<TestTree />
		</Col>
		<Col span={2}></Col>
		<Col span={11} style={{ width: "300px", border: "1px solid #eee", padding: "10px", borderRadius: "3px" }}>
			<Button text="httpConfig.onExpand  httpConfig.onSearch" type="link" size="small" style={{ margin: "10px" }} />
			<DisabledTree />
		</Col>
	</Row>
}
`