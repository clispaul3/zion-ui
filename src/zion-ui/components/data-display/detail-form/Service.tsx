import React from "react"
import { Form } from "antd"
import { BaseService } from "../../base"
import { defaultClassName, defaultItemClassName, titleStyle } from "../../../@types/DetailForm"
import { EventHandlerParams } from "../../../@types/Base"
export class Service extends BaseService {
	constructor(props: Object, isPureComponent?: boolean) {
		super(props, isPureComponent)
		this.isPureComponent = isPureComponent === true ? true : false
	}
	eventHandler(params: EventHandlerParams) { }
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
	 * @description 获取组件模板
	 */
	getTemplate() {
		let { data, rows, show, layout, style = {} } = this.getProps()
		if (!show) return null
		const className = this.getClassName()
		return <Form className={className.join(" ")} {...layout} style={{ background: "rgb(238, 238, 238)", ...style }}>
			{rows.map((row, index) => {
				return <Form.Item label={row.title} key={row.dataIndex || row.title || index}>
					<div className={defaultItemClassName} title={!row.render ? data[row.dataIndex] : ""} style={{ paddingLeft: "20px", ...titleStyle }}>
						{row.render ? row.render(data[row.dataIndex], data) : data[row.dataIndex]}
					</div>
				</Form.Item>
			})}
		</Form>
	}
}
