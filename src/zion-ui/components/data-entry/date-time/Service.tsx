import React from "react"
import moment from 'moment'
import { TimePicker, DatePicker } from 'antd'
import zh_cn from "antd/es/locale/zh_CN"
import { BaseService } from "../../base"
import { defaultClassName, EDateType } from "../../../@types/DateTime"
import { EventHandlerParams, MouseEventType } from "../../../@types/Base"

const { RangePicker } = DatePicker

export class Service extends BaseService {
	constructor(props: Object, isPureComponent?: boolean) {
		super(props, isPureComponent)
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
	/**
	 * @description 获取格式化类型
	 */
	getFormat = () => {
		let { type, format } = this.getProps()
		type = type.toUpperCase()
		if (type === EDateType.TIME) {
			return (format || "HH:mm:ss")
		}
		if (type === EDateType.RANGEDATE || type === EDateType.DATE) {
			return (format || "YYYY-MM-DD")
		}
		if (type === EDateType.RANGEDATETIME || type === EDateType.DATETIME) {
			return (format || "YYYY-MM-DD HH:mm:ss")
		}
		if (type === EDateType.RANGEMONTH || type === EDateType.MONTH) {
			return (format || "YYYY-MM")
		}
		if (type === EDateType.WEEK || type === EDateType.RANGEWEEK) {
			return (format || "YYYY-W[周]")
		}
	}
	/**
	 * @description 时间值的类型转换
	 * @param value 
	 */
	transformMomentValue(value: any) {
		const format = this.getFormat()
		let { type } = this.getProps()
		type = type.toUpperCase()
		let targetValue
		let isMoment = false
		if (moment.isMoment(value)) {
			isMoment = true
		}
		if (Array.isArray(value)) {
			isMoment = moment.isMoment(value[0])
		}
		if (isMoment) {
			if (["TIME", "DATE", "DATETIME", "MONTH", "WEEK"].includes(type)) {
				targetValue = value.format(format)
			}
			if (type.indexOf("RANGE") >= 0) {
				targetValue = [value[0].format(format), value[1] ? value[1].format(format) : null]
			}
			// if (type.indexOf("WEEK") >= 0) {
			// 	targetValue = value.format(format)
			// }
		} else {
			if (["TIME", "DATE", "DATETIME", "MONTH", "WEEK"].includes(type)) {
				targetValue = value ? moment(value, format) : null
			}
			if (type.indexOf("RANGE") >= 0) {
				targetValue = (value && value[0]) ? [moment(value[0], format), moment(value[1], format)] : null
			}
		}
		return targetValue
	}
	/**
	 * @description onChange事件
	 * @param value 
	 * @param valueString 
	 */
	onChange(value: moment.Moment, valueString: string) {
		let { type, onChange } = this.getProps()
		const targetValue = this.transformMomentValue(value)
		type = type.toUpperCase()
		if (!this.isPureComponent) {
			if (["RANGEMONTH"].includes(type)) {
				this.setProps({ value: targetValue, showValue: targetValue })
			} else {
				this.setProps({ value: targetValue, showValue: targetValue })
			}
		}
		if (onChange && typeof onChange === "function") {
			onChange({ value: targetValue, ev: null, eventName: MouseEventType.onChange }, this.props)
		}
	}
	/**
	 * @description 点击确定按钮触发改方法
	 * @param value 
	 */
	onOk(value: moment.Moment) {
		const targetValue = this.transformMomentValue(value)
		const { onOk } = this.getProps()
		if (onOk) {
			onOk({ value: targetValue, ev: null, eventName: MouseEventType.onOk }, this.props)
		}
	}
	/**
	 * @description 点击事件
	 * @param ev 
	 */
	onClick(ev: any) {
		const { onClick } = this.getProps()
		if (onClick) {
			onClick({ ev: null, eventName: MouseEventType.onClick }, this.props)
		}
	}
	/**
	 * @description 获取组件模板
	 */
	getTemplate() {
		let {
			type,
			show,
			style,
			value,
			disabled,
			size,
			placeholder,
			allowClear,
			disabledDate
		} = this.getProps()
		if (!show) return null
		const className = this.getClassName()
		let targetProps = {
			style,
			className: className.join(" "),
			disabled,
			onChange: this.onChange.bind(this),
			value: this.transformMomentValue(value),
			size,
			placeholder,
			allowClear: allowClear === false ? false : true,
			onOk: this.onOk.bind(this),
			format: this.getFormat(),
			locale: zh_cn.DatePicker
		}
		let TargetControl: any
		switch (type.toUpperCase()) {
			case "TIME":
				TargetControl = TimePicker
				break
			case "DATE":
				TargetControl = DatePicker
				if (disabledDate) {
					Object.assign(targetProps, { disabledDate })
				}
				break
			case "WEEK":
				TargetControl = DatePicker
				Object.assign(targetProps, { picker: "week" })
				break
			case "MONTH":
				TargetControl = DatePicker
				Object.assign(targetProps, { picker: "month" })
				break
			case "QUARTER":
				TargetControl = DatePicker
				Object.assign(targetProps, { picker: "quarter" })
				break
			case "YEAR":
				TargetControl = DatePicker
				Object.assign(targetProps, { picker: "year" })
				break
			case "DATETIME":
				TargetControl = DatePicker
				Object.assign(targetProps, { showTime: true })
				break
			case "RANGEDATE":
				TargetControl = RangePicker
				if (disabledDate) {
					Object.assign(targetProps, { disabledDate })
				}
				break
			case "RANGEWEEK":
				TargetControl = RangePicker
				Object.assign(targetProps, { picker: "week", onPanelChange: this.onChange && this.onChange.bind(this) })
				break
			case "RANGEMONTH":
				TargetControl = RangePicker
				Object.assign(targetProps, { picker: "month", onPanelChange: this.onChange && this.onChange.bind(this) })
				break
			case "RANGEQUARTER":
				TargetControl = RangePicker
				Object.assign(targetProps, { picker: "quarter", onPanelChange: this.onChange && this.onChange.bind(this) })
				break
			case "RANGEYEAR":
				TargetControl = RangePicker
				Object.assign(targetProps, { picker: "year", onPanelChange: this.onChange && this.onChange.bind(this) })
				break
			case "RANGEDATETIME":
				TargetControl = RangePicker
				Object.assign(targetProps, { showTime: true })
				break
			default:
				TargetControl = DatePicker
		}
		const Template = <TargetControl {...targetProps} />
		return this.getFormItem(Template)
	}
}
