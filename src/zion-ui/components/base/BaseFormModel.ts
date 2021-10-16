/**
 * @description 表单控件数据模型
 */
import { IObservableObject } from "mobx"
import { BaseModel } from "./BaseModel"
import { IBaseFormModel, EventHandlerResult, IValidateResult } from "../../@types/Base"

export abstract class BaseFormModel extends BaseModel implements IBaseFormModel {
	value?: string | string[] | object[] | number | boolean | null | number[]
	showValue?: string | string[] | object[] | number | boolean | null | number[]
	placeholder?: string
	onChange?: (params: EventHandlerResult, mobxProps: IObservableObject) => void
	disabled?: boolean
	allowClear?: boolean
	showTitle?: boolean
	autoFocus?: boolean
	extraData?: object

	// 表单相关的属性配置
	label?: string
	required?: boolean
	layout?: {
		wrapperCol?: { span: number },
		labelCol?: { span: number }
	}
	validateResult?: IValidateResult
	autoValidate?: boolean
	hasFeedback?: boolean

	constructor(props: any) {
		super(props)
		if ((props || {}).hasOwnProperty("value")) {
			this.value = props.value
		} else {
			this.value = props.value || ""
		}
		this.placeholder = props.placeholder || ""
		this.show = props.show === false ? props.show : true
		this.onChange = props.onChange || null
		this.disabled = props.disabled === true || false
		this.allowClear = props.allowClear
		this.showTitle = props.showTitle || false
		this.label = props.label || null
		this.required = props.required
		this.layout = props.layout || null
		this.validateResult = props.validateResult || null
		this.autoValidate = props.autoValidate
		this.autoFocus = props.aotuFocus
		this.hasFeedback = props.hasFeedback
		this.extraData = props.extraData || null
	}
}

