import React from 'react';
import { Tree, StateManage, PopConfirm, Loading, PopMessage } from "zion-ui";
import { Row, Col, Button } from "antd";
import { WarningTwoTone } from "@ant-design/icons"

export const Demo004 = function () {
	const [state1, TestTree] = Tree({
		showFooter: true,
		mode: { isRadio: true },
		height: 300,
		originData: [
			{ id: "001", title: "中华人民共和国", nocheck: true, uiPid: null, open: true, prefixIcon: ["buildGroupSvg"] },  // 展开该节点
			{ id: "002", title: "广东省", uiPid: "001", prefixIcon: ["buildSvg"] },
			{ id: "003", title: "江西省", uiPid: "001", prefixIcon: ["buildSvg"] },
			{ id: "004", title: "北京市", uiPid: "001", prefixIcon: ["buildSvg"] },
			{ id: "005", title: "广州市", uiPid: "002", prefixIcon: ["floorSvg"] },
			{ id: "006", title: "番禺区", uiPid: "005", prefixIcon: ["areaSvg"] },
			{ id: "007", title: "东环大街", uiPid: "006", prefixIcon: ["areaSvg"] },
			{ id: "008", title: "天安节能科技园", uiPid: "007", prefixIcon: ["pointSvg"] }
		],
	}, false)
	const [state2, IconTree] = Tree({
		showFooter: true,
		draggable: true,
		mode: { isRadio: false },
		height: 300,
		originData: [
			{ id: "001", title: "中华人民共和国", nocheck: true, uiPid: null, open: true },  // 展开该节点
			{ id: "002", title: "广东省", uiPid: "001", open: true },
			{ id: "003", title: "江西省", uiPid: "001", open: true, suffixIcon: ["plusSvg", "deleteSvg"] },
			{ id: "004", title: "北京市", uiPid: "001", open: true, suffixIcon: ["plusSvg", "deleteSvg"] },
			{ id: "005", title: "广州市", uiPid: "002", open: true, suffixIcon: ["plusSvg", "deleteSvg"] },
			{ id: "006", title: "番禺区", uiPid: "005", open: true, suffixIcon: ["plusSvg", "deleteSvg"] },
			{ id: "007", title: "东环大街", uiPid: "006", open: true, suffixIcon: ["deleteSvg"] },
			{ id: "008", title: "天安节能科技园", uiPid: "007", suffixIcon: ["plusSvg", "deleteSvg"] }
		],
		iconCallback: {
			deleteSvg: node => {
				alert("deleteSvg")
			},
			plusSvg: node => {
				alert("plusSvg")
			}
		}
	}, false)
	const DeleteNodeBtn = PopConfirm({
		title: "是否确认删除?",
		okText: "是",
		cancelText: "否",
		onConfirm: function () {
			const { deleteNodes } = StateManage.get(state2)
			Loading.setGlobalLoading(true)
			setTimeout(() => {
				deleteNodes(["008", "007"])
				Loading.setGlobalLoading(false)
				PopMessage({
					type: "success",
					title: "删除成功"
				})
			}, 800)
		},
		icon: <WarningTwoTone />,
		content: <Button type="link" size="small" style={{ margin: "10px" }}>删除节点</Button>
	}, true)
	return <Row>
		<Col span={11} style={{ width: "300px", border: "1px solid #eee", padding: "10px", borderRadius: "3px" }}>
			<DeleteNodeBtn />
			<TestTree />
		</Col>
		<Col span={2}></Col>
		<Col span={11} style={{ width: "300px", border: "1px solid #eee", padding: "10px", borderRadius: "3px" }}>
			<Button type="link" size="small" style={{ margin: "10px" }} onClick={() => {
				const { updateCheckedKeys, triggerOnSelectOption } = StateManage.get(state1)
				triggerOnSelectOption("008")
				setTimeout(() => {
					updateCheckedKeys(["008"], "replace")
				}, 300)
			}}>更新选中节点，模拟定位</Button>
			<IconTree />
		</Col>
	</Row>
}

export const code004 = `
import React from 'react';
import { Tree, StateManage, PopConfirm, Loading, PopMessage } from "zion-ui";
import { Row, Col, Button } from "antd";
import { WarningTwoTone } from "@ant-design/icons"

export const Demo = function () {
	const [state1, TestTree] = Tree({
		showFooter: true,
		mode: { isRadio: true },
		height: 300,
		originData: [
			{ id: "001", title: "中华人民共和国", nocheck: true, uiPid: null, open: true, prefixIcon: ["buildGroupSvg"] },  // 展开该节点
			{ id: "002", title: "广东省", uiPid: "001", prefixIcon: ["buildSvg"] },
			{ id: "003", title: "江西省", uiPid: "001", prefixIcon: ["buildSvg"] },
			{ id: "004", title: "北京市", uiPid: "001", prefixIcon: ["buildSvg"] },
			{ id: "005", title: "广州市", uiPid: "002", prefixIcon: ["floorSvg"] },
			{ id: "006", title: "番禺区", uiPid: "005", prefixIcon: ["areaSvg"] },
			{ id: "007", title: "东环大街", uiPid: "006", prefixIcon: ["areaSvg"] },
			{ id: "008", title: "天安节能科技园", uiPid: "007", prefixIcon: ["pointSvg"] }
		],
	}, false)
	const [state2, IconTree] = Tree({
		showFooter: true,
		draggable: true,
		mode: { isRadio: false },
		height: 300,
		originData: [
			{ id: "001", title: "中华人民共和国", nocheck: true, uiPid: null, open: true },  // 展开该节点
			{ id: "002", title: "广东省", uiPid: "001", open: true },
			{ id: "003", title: "江西省", uiPid: "001", open: true, suffixIcon: ["plusSvg", "deleteSvg"] },
			{ id: "004", title: "北京市", uiPid: "001", open: true, suffixIcon: ["plusSvg", "deleteSvg"] },
			{ id: "005", title: "广州市", uiPid: "002", open: true, suffixIcon: ["plusSvg", "deleteSvg"] },
			{ id: "006", title: "番禺区", uiPid: "005", open: true, suffixIcon: ["plusSvg", "deleteSvg"] },
			{ id: "007", title: "东环大街", uiPid: "006", open: true, suffixIcon: ["deleteSvg"] },
			{ id: "008", title: "天安节能科技园", uiPid: "007", suffixIcon: ["plusSvg", "deleteSvg"] }
		],
		iconCallback: {
			deleteSvg: node => {
				alert("deleteSvg")
			},
			plusSvg: node => {
				alert("plusSvg")
			}
		}
	}, false)
	const DeleteNodeBtn = PopConfirm({
		title: "是否确认删除?",
		okText: "是",
		cancelText: "否",
		onConfirm: function () {
			const { deleteNodes } = StateManage.get(state2)
			Loading.setGlobalLoading(true)
			setTimeout(() => {
				deleteNodes(["008", "007"])
				Loading.setGlobalLoading(false)
				PopMessage({
					type: "success",
					title: "删除成功"
				})
			}, 800)
		},
		icon: <WarningTwoTone />,
		content: <Button type="link" size="small" style={{ margin: "10px" }}>删除节点</Button>
	}, true)
	return <Row>
		<Col span={11} style={{ width: "300px", border: "1px solid #eee", padding: "10px", borderRadius: "3px" }}>
			<DeleteNodeBtn />
			<TestTree />
		</Col>
		<Col span={2}></Col>
		<Col span={11} style={{ width: "300px", border: "1px solid #eee", padding: "10px", borderRadius: "3px" }}>
			<Button type="link" size="small" style={{ margin: "10px" }} onClick={() => {
				const { updateCheckedKeys, triggerOnSelectOption } = StateManage.get(state1)
				triggerOnSelectOption("008")
				setTimeout(() => {
					updateCheckedKeys(["008"], "replace")
				}, 300)
			}}>更新选中节点，模拟定位</Button>
			<IconTree />
		</Col>
	</Row>
}
`