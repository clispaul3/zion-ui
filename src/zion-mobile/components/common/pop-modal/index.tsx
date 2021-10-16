import { Model } from "./Model"
import { ComponentFunc } from "../../base"
import { Service } from './Service'
import { IProps, StaticFuncProps } from "../../../@types/PopModal"
import { StateManage } from "../../../service/state"
import ReactDOM from "react-dom"
import React from "react"
import { Modal } from "antd"

const PopModalFunc = function (props: IProps, bool?: boolean): any {
	return ComponentFunc({ props, bool, Model, Service })
}

export const PopModal = function (props: IProps) {
	const [state, Template] = PopModalFunc(props, false)
	const id = StateManage.get(state, "uniqId")
	ReactDOM.render(<Template />, document.getElementById(id))
	return state
}

const staticFunc = function (key: string, props: StaticFuncProps) {
	Modal[key]({
		okButtonProps: { size: "small" },
		cancelButtonProps: { size: "small" },
		okText: "确定",
		cancelText: "取消",
		...props
	})
}

PopModal.confirm = function (props: StaticFuncProps) {
	staticFunc("confirm", props)
}

PopModal.success = function (props: StaticFuncProps) {
	staticFunc("success", props)
}

PopModal.info = function (props: StaticFuncProps) {
	staticFunc("info", props)
}

PopModal.error = function (props: StaticFuncProps) {
	staticFunc("error", props)
}

PopModal.warning = function (props: StaticFuncProps) {
	staticFunc("warning", props)
}

