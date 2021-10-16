import React from 'react';
import { Tree } from "zion-ui";
import { Row, Col, Button } from "antd";

export const Demo = function () {
	const RadioTree = Tree({
		showFooter: true,
		mode: { isRadio: true },
		height: 400,
		originData: [
			{ id: "001", title: "中华人民共和国", uiPid: null, open: true }, // 展开该节点
			{ id: "002", title: "广东省", uiPid: "001" },
			{ id: "003", title: "江西省", uiPid: "001" },
			{ id: "004", title: "北京市", uiPid: "001" },
			{ id: "005", title: "广州市", uiPid: "002" },
			{ id: "006", title: "番禺区", uiPid: "005" },
			{ id: "007", title: "东环大街", uiPid: "006" },
			{ id: "008", title: "天安节能科技园", uiPid: "007" }
		]
	}, true)
	const MultipeTree = Tree({
		showFooter: true,
		height: 400,
		mode: { isRadio: false },
		originData: [
			{ id: "001", title: "中华人民共和国", uiPid: null, open: true },  // 展开该节点
			{ id: "002", title: "广东省", uiPid: "001" },
			{ id: "003", title: "江西省", uiPid: "001" },
			{ id: "004", title: "北京市", uiPid: "001" },
			{ id: "005", title: "广州市", uiPid: "002" },
			{ id: "006", title: "番禺区", uiPid: "005" },
			{ id: "007", title: "东环大街", uiPid: "006" },
			{ id: "008", title: "天安节能科技园", uiPid: "007" }
		]
	}, true)
	return <Row>
		<Col span={11} style={{ width: "300px", border: "1px solid #eee", padding: "10px", borderRadius: "3px" }}>
			<Button type="link" size="small" style={{ margin: "10px" }}>单选</Button>
			<RadioTree />
		</Col>
		<Col span={2}></Col>
		<Col span={11} style={{ width: "300px", border: "1px solid #eee", padding: "10px", borderRadius: "3px" }}>
			<Button type="link" size="small" style={{ margin: "10px" }}>多选</Button>
			<MultipeTree />
		</Col>
	</Row>
}

export const code = `
import React from 'react';
import { Tree } from "zion-ui";
import { Row, Col, Button } from "antd";

export const Demo = function () {
	const RadioTree = Tree({
		showFooter: true,
		mode: { isRadio: true },
		height: 400,
		originData: [
			{ id: "001", title: "中华人民共和国", uiPid: null, open: true }, // 展开该节点
			{ id: "002", title: "广东省", uiPid: "001" },
			{ id: "003", title: "江西省", uiPid: "001" },
			{ id: "004", title: "北京市", uiPid: "001" },
			{ id: "005", title: "广州市", uiPid: "002" },
			{ id: "006", title: "番禺区", uiPid: "005" },
			{ id: "007", title: "东环大街", uiPid: "006" },
			{ id: "008", title: "天安节能科技园", uiPid: "007" }
		]
	}, true)
	const MultipeTree = Tree({
		showFooter: true,
		height: 400,
		mode: { isRadio: false },
		originData: [
			{ id: "001", title: "中华人民共和国", uiPid: null, open: true },  // 展开该节点
			{ id: "002", title: "广东省", uiPid: "001" },
			{ id: "003", title: "江西省", uiPid: "001" },
			{ id: "004", title: "北京市", uiPid: "001" },
			{ id: "005", title: "广州市", uiPid: "002" },
			{ id: "006", title: "番禺区", uiPid: "005" },
			{ id: "007", title: "东环大街", uiPid: "006" },
			{ id: "008", title: "天安节能科技园", uiPid: "007" }
		]
	}, true)
	return <Row>
		<Col span={11} style={{ width: "300px", border: "1px solid #eee", padding: "10px", borderRadius: "3px" }}>
			<Button type="link" size="small" style={{ margin: "10px" }}>单选</Button>
			<RadioTree />
		</Col>
		<Col span={2}></Col>
		<Col span={11} style={{ width: "300px", border: "1px solid #eee", padding: "10px", borderRadius: "3px" }}>
			<Button type="link" size="small" style={{ margin: "10px" }}>多选</Button>
			<MultipeTree />
		</Col>
	</Row>
}
`