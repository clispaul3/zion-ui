import React from 'react';
import { CodeEditor, Button, PopMessage, StateManage } from "zion-ui";

export const Demo = function () {
	const controlKey = "RichText.Demo.001"
	const jsxCode = `const Demo = () => {}`
	return <div>
		<div style={{ width: "400px", height: "300px" }}>
			<CodeEditor
				controlKey={controlKey}
				value={jsxCode}
				language="jsx"
				readonly={false}
				style={{ width: "400px", height: "300px" }}
			/>
		</div>
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