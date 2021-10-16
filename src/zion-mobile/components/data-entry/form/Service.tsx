import { StateManage } from "../../../service/state"
import React from "react"
import { Form, Row, Col } from "antd"
import { defaultClassName, IFormItem } from "../../../@types/Form"
import { PropertyService } from "../../../service/property"
import { observer } from 'mobx-react'
import { BaseService } from "../../base"
import cloneDeep from "lodash/cloneDeep"
import { PopMessage } from "../../common/pop-message"
import { PopTip } from "../../common/pop-tip"
import { sortBy } from "lodash"
import { EventHandlerParams } from "../../../@types/Base"
import * as ZionUI from "../../../index"
import { InfoCircleOutlined } from "@ant-design/icons"

export class Service extends BaseService {
	formData: any = {}
	formControlMobxProps: any = {}
	formControlInitProps: any = {}
	formLabelMobxProps: any = {}
	formLabelInitMobxProps: any = {}
	formControlTemplate: any = {}
	defaultLabelProps: any = {}
	constructor(props: Object, isPureComponent?: boolean) {
		super(props, isPureComponent)
		this.formData = {}
		this.defaultLabelProps = {
			validateStatus: "",
			help: null,
			extra: null,
			required: false,
			label: ""
		}
		this.init()
	}
	/**
	 * @description 获取类名
	 */
	getClassName() {
		const { className } = this.getProps()
		let nextClassName = super.getClassName(defaultClassName)
		if (className) {
			nextClassName.push(className)
		}
		return nextClassName
	}
	/**
	 * @description 事件处理
	 */
	eventHandler(params: EventHandlerParams) {
		const { ev, eventName } = params
		const { disabled, loading } = this.getProps()
		ev && ev.stopPropagation && ev.stopPropagation()
		if (disabled || loading) return;
		(this as any)[eventName]({ ev, eventName })
	}
	init() {
		let { formItemConfig, formConfig, status } = this.getProps()
		// formItemConfig = formItemConfig.filter(item => item["show"] !== false)
		formItemConfig.map((item: IFormItem) => {
			let { field, labelProps = {}, controlProps: { type, props = {} } } = item as any;
			if (formConfig.layout === "inline") {
				props.style = { ...(props.style || {}), margin: "5px 5px" }
			}
			if (status === "detail") {
				props.disabled = true
			}
			const initLabelProps = { ...this.defaultLabelProps, ...labelProps }
			this.formLabelInitMobxProps[field] = PropertyService.getObservableObj(initLabelProps)
			this.formLabelMobxProps[field] = PropertyService.getObservableObj(initLabelProps)
			let TargetControl, targetProps;
			if (typeof type === "string") {
				type = ZionUI[type.replace("[[", "").replace("]]", "")]
			}
			[targetProps, TargetControl] = type(props, false);
			this.formControlInitProps[field] = {
				controlProps: cloneDeep(props),
				labelProps: cloneDeep(labelProps)
			}
			this.formControlMobxProps[field] = targetProps
			this.formControlTemplate[field] = TargetControl
			this.setProps({
				setFormControlProps: this.setFormControlProps.bind(this),
				setFormLabelProps: this.setFormLabelProps.bind(this),
				resetForm: this.resetForm.bind(this),
				getFormData: this.getFormData.bind(this),
				setFormData: this.setFormData.bind(this)
			})
		})
	}

	/**
	 * @description 设置单个控件的props
	 * @param field 
	 * @param nextProps 
	 */
	setFormControlProps(field: string, nextProps: object) {
		StateManage.set(this.formControlMobxProps[field], { ...nextProps })
	}

	/**
	 * @description 设置表单控件的label相关的props
	 * @param field 
	 * @param nextProps 
	 */
	setFormLabelProps(field: string, nextProps: object) {
		StateManage.set(this.formLabelMobxProps[field], { ...nextProps })
	}

	/**
	 * @description 重置表单，恢复表单至最初的状态
	 */
	resetForm() {
		Object.keys(this.formControlInitProps).forEach(field => {
			const initProps = this.formControlInitProps[field]["controlProps"]
			StateManage.set(this.formControlMobxProps[field], initProps)
		})
		Object.keys(this.formControlInitProps).forEach(field => {
			const initProps = this.formControlInitProps[field]["labelProps"]
			StateManage.set(this.formLabelMobxProps[field], initProps)
		})
		return this.getFormData(false)
	}

	/**
	 * @description 获取单个表单控件的模板
	 * @param field 
	 */
	getFormItemTemplate(field: string) {
		const self = this
		let { formConfig: { columns = 0 }, formItemConfig } = this.getProps()
		formItemConfig = formItemConfig.filter(item => item["show"] !== false)
		return observer(function () {
			const { validateStatus, help, extra, label, required, labelCol, show, tail, tip } = StateManage.get(self.formLabelMobxProps[field])
			if (show === false) return null
			const TargetControl = self.formControlTemplate[field]
			const props: any = {
				validateStatus,
				hasFeedback: true,
				extra,
				help,
				required,
				key: field || "&&KEY",
				label: tip ? <span>{label}<PopTip content={<InfoCircleOutlined style={{ position: "relative", top: "-1px", right: "-3px", color: "#000", fontSize: "12px" }} />} title={tip} /></span> : label
			}
			const { rowCol, style } = formItemConfig.find((item: any) => item["field"] === field) || {}
			if (labelCol) {
				props.labelCol = { span: labelCol }
			}
			if (columns === 0) {
				return <Form.Item {...props} style={style}>
					<TargetControl />{tail}
				</Form.Item>
			}
			let span = 24
			if (columns == 2) {
				span = 12
			}
			if (columns === 3) {
				span = 8
			}
			if (rowCol) {
				span = rowCol
			}
			return <Form.Item {...props} style={style}>
				<TargetControl />{tail}
			</Form.Item>
		})
	}
	/**
	 * @description 获取表单的数据
	 * @param callback 回调函数
	 * @param isValidate  是否校验表单
	 */
	getFormData(isValidate: boolean, isShowPopTips?: boolean) {
		let { formItemConfig } = this.getProps()
		const showFields = formItemConfig.filter(item => item["show"] !== false).map(item => item["field"])
		Object.keys(this.formControlMobxProps).filter(field => showFields.find(item => item == field)).forEach(field => {
			this.formData[field] = {
				value: StateManage.get(this.formControlMobxProps[field], "value"),
				showValue: StateManage.get(this.formControlMobxProps[field], "showValue"),
				extraData: StateManage.get(this.formControlMobxProps[field], "extraData")
			}
		})
		return new Promise((resolve, reject) => {
			if (!isValidate) {
				resolve(this.formData)
			} else {
				this.validateForm((res: any) => {
					if (res) {
						resolve(this.formData)
					}
				}, isShowPopTips)
			}
		})
	}
	/**
	 * @description 设置表单的数据
	 * @param data 
	 */
	setFormData(data: any) {
		Object.keys(data || {}).forEach(field => {
			const { value, showValue } = data[field] || {}
			this.setFormControlProps(field, { value, showValue })
		})
	}
	/**
	 * @description 校验表单
	 */
	private validateForm(callback: any, isShowPopTips?: boolean) {
		let validateResult = true
		let validateCount = 0
		const { formItemConfig } = this.getProps()
		// const allFields = Object.keys(this.formControlMobxProps)
		const allFields = formItemConfig.filter(item => item["show"] !== false).map(item => item["field"])
		allFields.forEach(field => {
			const { required, validate, show } = StateManage.get(this.formLabelMobxProps[field])
			const { value } = StateManage.get(this.formControlMobxProps[field])
			if (show === false) {
				validateCount += 1
				if (validateCount === allFields.length) {
					callback(validateResult)
				}
			} else if (validate && typeof validate === "function") {
				validate(value).then((result: any) => {
					validateCount += 1
					StateManage.set(this.formLabelMobxProps[field], result)
					if (result["validateStatus"] !== "success") {
						validateResult = false
					}
					if (validateCount === allFields.length) {
						callback(validateResult)
					}
				})
				return
			} else if (required) {
				validateCount += 1
				StateManage.set(this.formLabelMobxProps[field], {
					validateStatus: (value && value.toString()) ? "success" : "error"
				})
				if (!value || !value.toString()) {
					validateResult = false
				}
				if (validateCount === allFields.length) {
					callback(validateResult)
				}
			} else {
				validateCount += 1
				if (validateCount === allFields.length) {
					callback(validateResult)
				}
			}
		})
		if (!validateResult && isShowPopTips !== false) {
			PopMessage({ type: "error", title: "表单未填写完整，请检查" })
		}
	}
	renderFormItem() {
		let { formItemConfig, formConfig = {} } = this.getProps()
		formItemConfig = formItemConfig.filter(item => item["show"] !== false)
		if (formConfig.columns > 1) {
			formItemConfig = sortBy(formItemConfig, "order")
			const span = 24 / formConfig.columns
			return <Row>
				{formItemConfig.map((item: any) => {
					const { field } = item
					const FormItemTemplate = this.getFormItemTemplate(field)
					return <Col span={item.rowCol || span} key={field} style={{ padding: "0px 5px" }}>
						<FormItemTemplate key={field} />
					</Col>
				})}
			</Row>
		}
		return formItemConfig.map((item: any) => {
			const { field } = item
			const FormItemTemplate = this.getFormItemTemplate(field)
			return <FormItemTemplate key={field} />
		})
	}
	getTemplate() {
		let { formConfig, style, show } = this.getProps()
		if (!show) return null
		const className = this.getClassName()
		if (!formConfig.hasOwnProperty("layout")) {
			formConfig.layout = "vertical"
			formConfig.colon = true
		}
		return <Form {...formConfig} style={style} className={className.join(" ")}>
			{this.renderFormItem()}
		</Form>
	}
}
