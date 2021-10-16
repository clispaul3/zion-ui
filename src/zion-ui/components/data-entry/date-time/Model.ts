/**
 * @description 按钮控件数据模型
 */
import { BaseFormModel } from "../../base"
import { IProps, EDateType, defaultType } from "../../../@types/DateTime"
import { EventHandlerResult } from "../../../@types/Base"
import moment from "moment"
import { IObservableObject } from "mobx"

export class Model extends BaseFormModel implements IProps {
	type?: EDateType
	format?: string

	onClick?: (params: EventHandlerResult, mobxState: IObservableObject) => void
	onFocus?: (params: EventHandlerResult, mobxState: IObservableObject) => void
	onOk?: (params: EventHandlerResult, mobxState: IObservableObject) => void
	disabledDate?: (currentDate: moment.Moment) => boolean

	constructor(props: any = {}) {
		super(props)
		this.type = props.type || defaultType
		this.format = props.format
		this.onClick = props.onClick || null
		this.onFocus = props.onFocus || null
		this.onOk = props.onOk || null
		this.disabledDate = props.disabledDate || null
	}
}
