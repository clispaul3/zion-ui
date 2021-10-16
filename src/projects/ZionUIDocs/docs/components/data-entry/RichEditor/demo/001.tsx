import React from 'react';
import { RichEditor, Button, PopMessage, StateManage } from "zion-ui";

export const Demo = function () {
	const controlKey = "RichText.Demo.001"
	return <div>
		<RichEditor controlKey={controlKey} value="<h4>这是初始化的内容</h4>" height={300} />
		<Button text="获取内容" style={{ display: "block", marginBottom: "10px" }} type="primary" onClick={() => {
			const { value } = StateManage.get(controlKey)
			PopMessage({ type: "success", text: value })
		}} />
		<Button text="设置内容" style={{ display: "block" }} type="primary" onClick={() => {
			StateManage.set(controlKey, { value: "自由设置内容" })
		}} />
	</div>
}

export const code = `
export const Demo = function () {
	const controlKey = "RichText.Demo.001"
	return <div>
		<RichEditor controlKey={controlKey} value="<h4>这是初始化的内容</h4>" height={300} />
		<Button text="获取内容" style={{ display: "block", marginBottom: "10px" }} type="primary" onClick={() => {
			const { value } = StateManage.get(controlKey)
			PopMessage({ type: "success", text: value })
		}} />
		<Button text="设置内容" style={{ display: "block" }} type="primary" onClick={() => {
			StateManage.set(controlKey, { value: "自由设置内容" })
		}} />
	</div>
}
`