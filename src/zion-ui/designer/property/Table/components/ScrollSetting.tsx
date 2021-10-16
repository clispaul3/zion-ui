/**
 * @description 滚动条配置
 */
import React from "react"
import { PopModal, Input, Button, PopMessage, StateManage } from "../../../../"

interface IScrollSetting {
	config?: {
		x?: string | number
		y?: string | number
	}
	onOk?: ({ config }) => void
}

export const ScrollSetting = (params: IScrollSetting) => {
	const { config, onOk } = params || {}
	const [xState, XTpl] = Input({
		label: "横向滚动",
		type: "number",
		value: config?.x,
		style: { width: "70%" }
	}, false)
	const [yState, YTpl] = Input({
		label: "纵向滚动",
		type: "number",
		value: config?.y,
		style: { width: "70%" }
	}, false)
	PopModal({
		title: "滚动条配置",
		allowFullScreen: false,
		width: "400px",
		height: "120px",
		content: <div style={{ position: "relative", overflow: "hidden" }}>
			<Button
				style={{ position: "absolute", zIndex: 100, right: "-10px", top: "0px" }}
				text="绑定函数"
				type="link"
				onClick={() => {
					PopMessage({ type: "info", text: "敬请期待..." })
				}} />
			<XTpl />
			<YTpl />
			<Button
				style={{ position: "absolute", zIndex: 100, right: "-10px", top: "55px" }}
				text="绑定函数"
				type="link"
				onClick={() => {
					PopMessage({ type: "info", text: "敬请期待..." })
				}} />
		</div>,
		onOk: ({ }, modalState) => {
			const x = StateManage.get(xState, "value")
			const y = StateManage.get(yState, "value")
			onOk && onOk({ config: (!x && !y) ? null : { x, y } })
			StateManage.set(modalState, { visible: false })
		}
	})
}