/**
 * @description 控件数据模型
 */
import { IProps, defaultPlacement } from "../../../@types/Divider"
import { BaseModel } from "../../base"
import { ReactNode } from 'react'

export class Model extends BaseModel implements IProps {
	content?: ReactNode | string
	dashed?: boolean
	placement?: "left" | "right" | "center"
	plain?: boolean

	constructor(props: any = {}) {
		super(props)
		this.content = props.content
		this.dashed = props.dashed
		this.placement = props.placement || defaultPlacement
		this.plain = props.plain
	}
}
