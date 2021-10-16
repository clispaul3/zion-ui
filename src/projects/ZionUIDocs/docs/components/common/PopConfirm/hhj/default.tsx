export const LoadingApiData = [
  {
    parameter: "title",
    instructions: "确认提示的标题",
    default: "",
    type: "string",
    select: "-",
    isNeed: "是"
  },
  {
    parameter: "cancelText",
    instructions: "自定义取消按钮提示文字",
    default: "",
    type: "string",
    select: "-"
  },
  {
    parameter: "okText",
    instructions: "自定义确认按钮提示文字",
    default: "",
    type: "string",
    select: "-"
  },
  {
    parameter: "placement",
    instructions: "确认提示出现的位置",
    default: "",
    type: "string",
    select: `"top" | "left" | "right" | "bottom" | "topLeft" | "topRight" | "bottomLeft" | "bottomRight" | "leftTop" | "leftBottom" | "rightTop" | "rightBottom"`
  },
  {
    parameter: "trigger",
    instructions: "出现确认提示弹窗的鼠标触发方式",
    default: "",
    type: "string",
    select: `"click" | "hover" | "focus"`
  },
  {
    parameter: "icon",
    instructions: "确认提示的标题图标",
    default: "",
    type: "ReactNode",
    select: "-"
  },
  {
    parameter: "content",
    instructions: "确认提示弹窗可填充内容，例如可以填充表格、页面、超链接...",
    default: "",
    type: "ReactNode",
    select: "-",
    isNeed: "是"
  },


]
export const apiDataEvent = [
  {
    parameter: "onCancel",
    instructions: "点击确定按钮后的回调",
    default: "",
    type: "() => void",
    select: "-"
  },
  {
    parameter: "onConfirm",
    instructions: "点击取消按钮后的回调",
    default: "",
    type: "() => void",
    select: "-"
  }
]
export const code1 = `
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
	</>
}
`
export const code2 = `
import React from 'react';
import { PopConfirm, Tag } from "zion-ui"
import { WarningTwoTone, SyncOutlined } from "@ant-design/icons"

export const Demo = function () {
	const content = <button color="red" style={{ cursor: "pointer" }}>删除button</button>
	return <>
		<PopConfirm title="二次确认是否删除?" content={content} icon={<SyncOutlined spin style={{ color: "red" }} />}></PopConfirm>
	</>
}
`