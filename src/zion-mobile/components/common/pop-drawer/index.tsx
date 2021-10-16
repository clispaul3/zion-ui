import { Model } from "./Model"
import { ComponentFunc } from "../../base"
import { Service } from './Service'
import { IProps } from "../../../@types/PopDrawer"
import { StateManage } from "../../../service/state"
import ReactDOM from "react-dom"
import React from "react"

const PopDrawerFunc = function (props: IProps, bool?: boolean): any {
	return ComponentFunc({ props, bool, Model, Service })
}

export const PopDrawer = function (props: IProps) {
	const [state, Template] = PopDrawerFunc(props, false)
	const id = StateManage.get(state, "uniqId")
	ReactDOM.render(<Template />, document.getElementById(id))
	return state
}
