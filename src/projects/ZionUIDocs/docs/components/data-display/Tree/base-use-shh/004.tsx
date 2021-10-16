import React from 'react';
import { Tree } from "zion-ui";
import { Row, Col, Button } from "antd";

export const Demo004 = function () {
	const TestTree = Tree({
		showFooter: true,
		mode: { isRadio: false, isAsync: true },
		height: 300,
		originData: [
			{ id: "001", title: "中华人民共和国", nocheck: true, uiPid: null, open: true },  // 展开该节点
			{ id: "002", title: "广东省", uiPid: "001" },
			{ id: "003", title: "江西省", uiPid: "001" },
			{ id: "004", title: "北京市", uiPid: "001" },
			{ id: "005", title: "广州市", uiPid: "002" },
			{ id: "006", title: "番禺区", uiPid: "005" },
			{ id: "007", title: "东环大街", uiPid: "006" },
			{ id: "008", title: "天安节能科技园", uiPid: "007" }
		],
		httpConfig: {
			onSearch: async (value) => {
				// 返回接口查询的数据
				return [
					{ key: "HY001", label: "浩云科技" },
				]
			},
			onSelectOption: async (option) => {
				// 返回接口查询的数据
				return [
					{ id: "001", title: "中华人民共和国", nocheck: true, uiPid: null, open: true },
					{ id: "002", title: "广东省", uiPid: "001" },
					{ id: "005", title: "广州市", uiPid: "002" },
					{ id: "006", title: "番禺区", uiPid: "005" },
					{ id: "007", title: "东环大街", uiPid: "006" },
					{ id: "008", title: "天安节能科技园", uiPid: "007" },
					{ id: "HY001", title: "浩云科技", uiPid: "008" }
				]
			}
		}
	}, true)
	return <Row>
		<Col span={4}></Col>
		<Col span={11} style={{ width: "300px", border: "1px solid #eee", padding: "10px", borderRadius: "3px" }}>
			<Button type="link" size="small" style={{ margin: "10px" }}>httpConfig.onSearch、httpConfig.onSelectOption</Button>
			<TestTree />
		</Col>
	</Row>
}

export const code004 = `
import React from 'react';
import { Tree } from "zion-ui";
import { Row, Col, Button } from "antd";

export const Demo = function () {
	const TestTree = Tree({
		showFooter: true,
		mode: { isRadio: false, isAsync: true },
		height: 300,
		originData: [
			{ id: "001", title: "中华人民共和国", nocheck: true, uiPid: null, open: true },  // 展开该节点
			{ id: "002", title: "广东省", uiPid: "001" },
			{ id: "003", title: "江西省", uiPid: "001" },
			{ id: "004", title: "北京市", uiPid: "001" },
			{ id: "005", title: "广州市", uiPid: "002" },
			{ id: "006", title: "番禺区", uiPid: "005" },
			{ id: "007", title: "东环大街", uiPid: "006" },
			{ id: "008", title: "天安节能科技园", uiPid: "007" }
		],
		httpConfig: {
			onSearch: async (value) => {
				// 返回接口查询的数据
				return [
					{ key: "HY001", label: "浩云科技" },
				]
			},
			onSelectOption: async (option) => {
				// 返回接口查询的数据
				return [
					{ id: "001", title: "中华人民共和国", nocheck: true, uiPid: null, open: true },
					{ id: "002", title: "广东省", uiPid: "001" },
					{ id: "005", title: "广州市", uiPid: "002" },
					{ id: "006", title: "番禺区", uiPid: "005" },
					{ id: "007", title: "东环大街", uiPid: "006" },
					{ id: "008", title: "天安节能科技园", uiPid: "007" },
					{ id: "HY001", title: "浩云科技", uiPid: "008" }
				]
			}
		}
	}, true)
	return <Row>
		<Col span={4}></Col>
		<Col span={11} style={{ width: "300px", border: "1px solid #eee", padding: "10px", borderRadius: "3px" }}>
			<Button type="link" size="small" style={{ margin: "10px" }}>httpConfig.onSearch、httpConfig.onSelectOption</Button>
			<TestTree />
		</Col>
	</Row>
}
`
