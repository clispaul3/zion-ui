import React from 'react';
import { PopConfirm } from "zion-ui"
import { WarningTwoTone, SyncOutlined } from "@ant-design/icons"
import { Typography } from 'antd';

export const Demo = function () {
	const content = <button color="red" style={{ cursor: "pointer" }}>删除button</button>
	const DeleteConfirm = PopConfirm({
		title: "确认删除?",
		cancelText: "取消",
		trigger: "click",
		placement: "right",
		onCancel: function () { },
		onConfirm: function () { },
		icon: <WarningTwoTone style={{ color: "red" }} />,
		content
	}, true)
	return <>
		<Typography.Paragraph mark>请确保content能接受 onMouseEnter、onMouseLeave、onFocus、onClick 事件作为props</Typography.Paragraph>
		<Typography.Paragraph mark>zion-ui中的大部分组件不接受以上事件，content可以是原生标签或其他第三方支持以上事件的组件</Typography.Paragraph>
		<DeleteConfirm />
		&nbsp;
		<PopConfirm title="二次确认是否删除?" content={content} icon={<SyncOutlined spin style={{ color: "red" }} />}></PopConfirm>
	</>
}

export const code = `
import React from 'react';
import { PopConfirm, Tag } from "zion-ui"
import { WarningTwoTone, SyncOutlined } from "@ant-design/icons"

export const Demo = function () {
	const content = <button color="red" style={{ cursor: "pointer" }}>删除button</button>
	const DeleteConfirm = PopConfirm({
		title: "确认删除?",
		cancelText: "取消",
		trigger: "click",
		placement: "right",
		onCancel: function () { },
		onConfirm: function () { },
		icon: <WarningTwoTone style={{ color: "red" }} />,
		content
	}, true)
	return <>
		<DeleteConfirm />
		&nbsp;
		<PopConfirm title="二次确认是否删除?" content={content} icon={<SyncOutlined spin style={{ color: "red" }} />}></PopConfirm>
	</>
}
`
