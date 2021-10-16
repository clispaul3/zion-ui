import { Model } from "./Model"
import { ComponentFunc } from "../../base"
import { Service } from './Service'
import { IProps } from "../../../@types/Poptip"
import React from "react"

export const PopTip = function (props: IProps, bool?: boolean): any {
	if (typeof bool !== "boolean") {
		const Template: any = ComponentFunc({ props, bool: true, Model, Service })
		return <Template />
	}
	return ComponentFunc({ props, bool, Model, Service })
}
