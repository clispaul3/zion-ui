/**
 * @description 控件数据模型
 */
import { IProps, defaultPlacement } from "../../../@types/Poptip"
import { BaseModel } from "../../base"
import { ReactNode } from 'react'

export class Model extends BaseModel implements IProps {
	title: string
	content: ReactNode
	trigger?: "click" | "hover" | "focus"
	placement?: "top" | "left" | "right" | "bottom" | "topLeft" | "topRight" | "bottomLeft" | "bottomRight" | "leftTop" | "leftBottom" | "rightTop" | "rightBottom"

	constructor(props: any = {}) {
		super(props)
		this.title = props.title || null
		this.content = props.content
		this.placement = props.placement || defaultPlacement
	}
}
