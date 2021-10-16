import React from "react"
import { Button, StateManage, PopMessage, Tag } from "zion-ui"
import { DownloadOutlined } from "@ant-design/icons"

export const Demo = function () {
	const tagControlKey = "Button.Demo.004.Tag"
	return <div>
		<Button
			icon={<DownloadOutlined />}
			text="下载"
			type="primary"
			observer={(count) => {
				StateManage.set(tagControlKey, { text: "按钮渲染了" + count + "次" })
			}}
			onClick={({ }, state) => {
				StateManage.set(state, { loading: true })
				const timer = setTimeout(() => {
					clearTimeout(timer)
					PopMessage({ type: "success", text: "下载成功" })
					StateManage.set(state, { loading: false })
				}, 500)
			}}
		/>
		&nbsp;&nbsp;&nbsp;
		<Tag controlKey={tagControlKey} text={"按钮渲染了1次"} />
	</div>
}

export const code = `
import React from "react"
import { Button, StateManage, PopMessage, Tag } from "zion-ui"
import { DownloadOutlined } from "@ant-design/icons"

export const Demo = function () {
	const tagControlKey = "Button.Demo.004.Tag"
	return <div>
		<Button
			icon={<DownloadOutlined />}
			text="下载"
			type="primary"
			observer={(count) => {
				StateManage.set(tagControlKey, { text: "按钮渲染了" + count + "次" })
			}}
			onClick={({ }, state) => {
				StateManage.set(state, { loading: true })
				const timer = setTimeout(() => {
					clearTimeout(timer)
					PopMessage({ type: "success", text: "下载成功" })
					StateManage.set(state, { loading: false })
				}, 500)
			}}
		/>
		&nbsp;&nbsp;&nbsp;
		<Tag controlKey={tagControlKey} text={"按钮渲染了1次"} />
	</div>
}
`