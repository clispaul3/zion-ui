/**
 * @description 下拉菜单
 */
import { Model } from "./Model"
import { ComponentFunc } from "../../base"
import { Service } from './Service'
import { IProps } from "../../../@types/SelectCascade"
import React from "react"

export const SelectCascade = function (props: IProps, bool?: boolean): any {
	if (typeof bool !== "boolean") {
		const Template: any = ComponentFunc({ props, bool: true, Model, Service })
		return <Template />
	}
	return ComponentFunc({ props, bool, Model, Service })
}
