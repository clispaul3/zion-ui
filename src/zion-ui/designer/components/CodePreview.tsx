/**
 * @description 代码预览
 */
import React from "react"
import { PopModalProps, PopModal, StateManage, Button, PropertyService } from "zion-ui"
import Editor from "@monaco-editor/react"

const className = "zion-ui-code-container"

interface ICodePreview {
	code?: string
	modalProps?: PopModalProps
	language?: string
	allowPreview?: boolean
}

export const CodePreview = function (params: ICodePreview) {
	const { code, modalProps, language, allowPreview } = params
	const codeEleId = "zion-ui-code-container-" + ((Math.random() * 100000).toFixed(0))
	const editorOptions = {
		"fontSize": 13,
		"tabSize": 4,
		"wordWrapColumn": 400,
		"formatOnSave": true,
		"renderControlCharacters": false,
		"detectIndentation": false,
		"codeDataApiOnSave": {
			"source.fixAll.eslint": false
		},
		"formatOnPaste": true,
	}
	const editorMap: any = {
		editor: null
	}
	const footer = <div style={{ textAlign: "right" }}>
		<Button
			text="确定"
			type="primary"
			onClick={() => {
				StateManage.set(modalState, { visible: false })
				if (editorMap.editor) {
					const value = editorMap.editor.getValue()
					modalProps?.onOk && (modalProps as any).onOk({ value })
				}
			}} />
		<Button
			show={allowPreview === true}
			text="预览"
			type="danger"
			onClick={() => {
				const json = JSON.parse(editorMap.editor.getValue() || "{}")
				PopModal({
					title: "预览组件",
					width: "800px",
					height: "70%",
					top: "20px",
					allowFullScreen: false,
					content: <div>
						{PropertyService.getReactElementFromJSON(json)}
					</div>
				})
			}}
		/>
	</div>
	const modalState = PopModal({
		width: "80%",
		height: "70%",
		top: "20px",
		allowFullScreen: false,
		content: <div
			className={className}
			id={codeEleId}
			style={{ height: document.body.clientHeight * 0.7 - 20 + "px", overflow: "hidden" }}>
			<Editor
				options={editorOptions}
				height={document.body.clientHeight - 62 + "px"}
				theme="vs-dark"
				width={"100%"}
				onMount={(editor) => {
					editorMap.editor = editor
					const timer = setTimeout(() => {
						editor.setValue(code);
						editor.getAction('editor.action.formatDocument').run();
						clearTimeout(timer)
					}, 300)
				}}
				language={language || "jsx"}></Editor>
		</div>,
		...modalProps,
		footer
	})
}