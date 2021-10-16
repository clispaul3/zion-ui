/**
 * @description 表单组件设计
 * @param config  表单的配置对象，如: {controlKey:"Form$12345",formConfig:{},formItemConfig:[]}
 */
import React from "react"
import { PopModal, StateManage, Button } from "../../"
import { Content } from "./Content"
import { CodePreview } from "../components"

export const FormDesigner = ({ onOk, config }) => {
	const [state, Tpl]: any = Content({ config })
	const modalState = PopModal({
		title: "表单设计器",
		width: "80%",
		height: "70%",
		allowFullScreen: false,
		top: "20px",
		content: <Tpl />,
		footer: <div style={{ textAlign: "right" }}>
			<Button
				text="查看JSON"
				type="danger"
				style={{ marginRight: "5px" }}
				onClick={() => {
					const config = StateManage.get(state)
					CodePreview({
						code: JSON.stringify(config),
						language: "json",
						allowPreview: true
					})
				}}
			/>
			<Button
				text="确定"
				type="primary"
				onClick={() => {
					const config = StateManage.get(state)
					StateManage.set(modalState, { visible: false })
					const { props } = config
					onOk && onOk({ value: config })
				}}
			/>
		</div>
	})
}