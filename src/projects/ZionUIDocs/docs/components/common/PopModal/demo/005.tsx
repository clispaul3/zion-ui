import React from "react"
import { Button, PopModal } from "zion-ui"

export const Demo = function () {
	const warningModal = function () {
		PopModal.warning({
			title: "warning",
			content: "是否确认删除?",
			onOk: function () {
				console.log("ok...")
			}
		})
	}
	const successModal = function () {
		PopModal.success({
			title: "success",
			content: "操作成功",
			onOk: function () {
				console.log("ok...")
			}
		})
	}
	const infoModal = function () {
		PopModal.info({
			title: "info",
			content: "温馨提示",
			onOk: function () {
				console.log("ok...")
			}
		})
	}
	const errorModal = function () {
		PopModal.error({
			title: "error",
			content: "不可删除",
			onOk: function () {
				console.log("ok...")
			}
		})
	}
	const confirmModal = function () {
		PopModal.confirm({
			title: "confirm",
			content: "再次确认",
			onOk: function () {
				console.log("ok...")
			}
		})
	}
	return <div>
		<Button text="PopModal.warning" style={{ marginRight: "10px" }} type="warning" onClick={warningModal} />
		<Button text="PopModal.info" style={{ marginRight: "10px" }} type="info" onClick={infoModal} />
		<Button text="PopModal.error" style={{ marginRight: "10px" }} type="danger" onClick={errorModal} />
		<Button text="PopModal.success" style={{ marginRight: "10px" }} type="success" onClick={successModal} />
		<Button text="PopModal.confirm" style={{ marginRight: "10px" }} onClick={confirmModal} />
	</div>
}

export const code = `
import React from "react"
import { Button, PopModal } from "zion-ui"

export const Demo = function () {
	const warningModal = function () {
		PopModal.warning({
			title: "warning",
			content: "是否确认删除?",
			onOk: function () {
				console.log("ok...")
			}
		})
	}
	const successModal = function () {
		PopModal.success({
			title: "success",
			content: "操作成功",
			onOk: function () {
				console.log("ok...")
			}
		})
	}
	const infoModal = function () {
		PopModal.info({
			title: "info",
			content: "温馨提示",
			onOk: function () {
				console.log("ok...")
			}
		})
	}
	const errorModal = function () {
		PopModal.error({
			title: "error",
			content: "不可删除",
			onOk: function () {
				console.log("ok...")
			}
		})
	}
	const confirmModal = function () {
		PopModal.confirm({
			title: "confirm",
			content: "再次确认",
			onOk: function () {
				console.log("ok...")
			}
		})
	}
	return <div>
		<Button text="PopModal.warning" style={{ marginRight: "10px" }} type="warning" onClick={warningModal} />
		<Button text="PopModal.info" style={{ marginRight: "10px" }} type="info" onClick={infoModal} />
		<Button text="PopModal.error" style={{ marginRight: "10px" }} type="danger" onClick={errorModal} />
		<Button text="PopModal.success" style={{ marginRight: "10px" }} type="success" onClick={successModal} />
		<Button text="PopModal.confirm" style={{ marginRight: "10px" }} onClick={confirmModal} />
	</div>
}
`