/**
 * @description 底部栏配置
 */
import React from "react"
import { PopModal, StateManage, Input } from "../../../../"

interface IFooterSetting {
	key?: string
	label?: string
	onOk?: (config: { key: string, label: string }) => void
}

export const FooterSetting = (params: IFooterSetting) => {
	const { key, label, onOk } = params || {}
	const [keyState, KeyTpl] = Input({
		label: "实际值",
		value: key
	}, false)
	const [labelState, LabelTpl] = Input({
		label: "显示值",
		value: label
	}, false)
	PopModal({
		title: "底部栏配置",
		allowFullScreen: false,
		width: "400px",
		height: "120px",
		content: <div style={{ position: "relative", overflow: "hidden" }}>
			<KeyTpl />
			<LabelTpl />
		</div>,
		onOk: ({ }, modalState) => {
			const key = StateManage.get(keyState, "value")
			const label = StateManage.get(labelState, "value")
			onOk && onOk({ key, label })
			StateManage.set(modalState, { visible: false })
		}
	})
}