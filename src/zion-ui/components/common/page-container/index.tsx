/**
 * @description 页面容器组件
 */
import React from "react"
import { Button } from "antd"
import { IProps } from "../../../@types/PopContainer"

export const PageContainer = function (props: IProps) {
	const { clientHeight } = document.body
	const modalStyle: any = {
		position: "fixed",
		top: "0px",
		bottom: "0px",
		left: "0px",
		right: "0px",
		background: "#fff",
		zIndex: "1"
	}

	const footerStyle: any = {
		position: "absolute", bottom: "0px", right: "0px",
		height: "50px", background: "#fff", width: "100%",
		borderTop: "1px solid #eee",
		lineHeight: "50px", textAlign: "right"
	}
	const { content, footer } = props
	const bodyStyle: any = {
		maxHeight: (clientHeight - (footer === null ? 0 : 50)) + "px",
		background: "#fff", width: "100%", overflow: "hidden"
	}
	const renderFooter = () => {
		const { footer, cancelText, okText } = props
		if (footer === null) return null
		if (footer) {
			return footer
		}
		const { onConfirm, onCancel, onClose } = props
		return <div>
			<Button type="primary" style={{ marginRight: "8px" }} onClick={onConfirm}>{okText || "确定"}</Button>
			<Button style={{ marginRight: "8px" }} onClick={onCancel || onClose}>{cancelText || "关闭"}</Button>
		</div>
	}

	return <div style={modalStyle}>
		<div style={bodyStyle}> {content} </div>
		{footer === null ? null : <div id="page-contianer-footer" style={footerStyle}>
			{renderFooter()}
		</div>}
	</div>
}
