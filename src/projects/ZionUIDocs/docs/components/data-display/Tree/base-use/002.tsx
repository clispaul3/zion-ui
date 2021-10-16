import React from 'react';
import { Tree } from "zion-ui";
import { Row, Col, Button } from "antd";

export const Demo = function () {
	const RadioTree = Tree({
		showFooter: true,
		mode: { isRadio: false, radioBrothers: true },
		height: 300,
		originData: [
			{ id: "001", title: "中华人民共和国", nocheck: true, uiPid: null, open: true },  // 展开该节点
			{ id: "002", title: "广东省", uiPid: "001", open: true },
			{ id: "003", title: "江西省", uiPid: "001" },
			{ id: "004", title: "北京市", uiPid: "001", nocheck: true },
			{ id: "005", title: "广州市", uiPid: "002" },
			{ id: "006", title: "番禺区", uiPid: "005" },
			{ id: "007", title: "东环大街", uiPid: "006" },
			{ id: "008", title: "天安节能科技园", uiPid: "007" },
			{ id: "009", title: "千千氏", uiPid: "008", disabled: true },  // 禁用
			{ id: "010", title: "四季沐足", uiPid: "008", nocheck: true }  // 不可选
		]
	}, true)
	const DisabledTree = Tree({
		disabled: true,
		height: 300,
		mode: { isRadio: false },
		originData: [
			{ id: "001", title: "中华人民共和国", nocheck: true, uiPid: null, open: true },  // 展开该节点
			{ id: "002", title: "广东省", nocheck: true, uiPid: "001", open: true },
			{ id: "003", title: "江西省", uiPid: "001" },
			{ id: "004", title: "北京市", uiPid: "001", nocheck: true },
			{ id: "005", title: "广州市", uiPid: "002" },
			{ id: "006", title: "番禺区", uiPid: "005" },
			{ id: "007", title: "东环大街", uiPid: "006" },
			{ id: "008", title: "天安节能科技园", uiPid: "007" },
			{ id: "009", title: "千千氏", uiPid: "008" },
			{ id: "010", title: "四季沐足", uiPid: "008" }
		]
	}, true)
	return <Row>
		<Col span={11} style={{ width: "300px", border: "1px solid #eee", padding: "10px", borderRadius: "3px" }}>
			<Button type="link" size="small" style={{ margin: "10px" }}>兄弟节点单选</Button>
			<RadioTree />
		</Col>
		<Col span={2}></Col>
		<Col span={11} style={{ width: "300px", border: "1px solid #eee", padding: "10px", borderRadius: "3px" }}>
			<Button type="link" size="small" style={{ margin: "10px" }}>禁用</Button>
			<DisabledTree />
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
		mode: { isRadio: false, radioBrothers: true },
		height: 300,
		originData: [
			{ id: "001", title: "中华人民共和国", nocheck: true, uiPid: null, open: true },  // 展开该节点
			{ id: "002", title: "广东省", uiPid: "001", open: true },
			{ id: "003", title: "江西省", uiPid: "001" },
			{ id: "004", title: "北京市", uiPid: "001", nocheck: true },
			{ id: "005", title: "广州市", uiPid: "002" },
			{ id: "006", title: "番禺区", uiPid: "005" },
			{ id: "007", title: "东环大街", uiPid: "006" },
			{ id: "008", title: "天安节能科技园", uiPid: "007" },
			{ id: "009", title: "千千氏", uiPid: "008", disabled: true },  // 禁用
			{ id: "010", title: "四季沐足", uiPid: "008", nocheck: true }  // 不可选
		]
	}, true)
	const DisabledTree = Tree({
		disabled: true,
		height: 300,
		mode: { isRadio: false },
		originData: [
			{ id: "001", title: "中华人民共和国", nocheck: true, uiPid: null, open: true },  // 展开该节点
			{ id: "002", title: "广东省", nocheck: true, uiPid: "001", open: true },
			{ id: "003", title: "江西省", uiPid: "001" },
			{ id: "004", title: "北京市", uiPid: "001", nocheck: true },
			{ id: "005", title: "广州市", uiPid: "002" },
			{ id: "006", title: "番禺区", uiPid: "005" },
			{ id: "007", title: "东环大街", uiPid: "006" },
			{ id: "008", title: "天安节能科技园", uiPid: "007" },
			{ id: "009", title: "千千氏", uiPid: "008" },
			{ id: "010", title: "四季沐足", uiPid: "008" }
		]
	}, true)
	return <Row>
		<Col span={11} style={{ width: "300px", border: "1px solid #eee", padding: "10px", borderRadius: "3px" }}>
			<Button type="link" size="small" style={{ margin: "10px" }}>兄弟节点单选</Button>
			<RadioTree />
		</Col>
		<Col span={2}></Col>
		<Col span={11} style={{ width: "300px", border: "1px solid #eee", padding: "10px", borderRadius: "3px" }}>
			<Button type="link" size="small" style={{ margin: "10px" }}>禁用</Button>
			<DisabledTree />
		</Col>
	</Row>
}
`