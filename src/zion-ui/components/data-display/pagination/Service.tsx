import React from "react"
import { defaultClassName } from "../../../@types/Pagination"
import { MouseEventType, EventHandlerParams } from "../../../@types/Base"
import { Pagination } from "antd"
import { BaseService } from "../../base"
import zh_cn from "antd/es/locale/zh_CN"

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
		ev?.stopPropagation()
		if (disabled || loading) return
		const { onClick } = this.getProps()
		if (eventName === MouseEventType.onClick) {
			onClick && onClick({ ev, eventName }, this.props)
		}
	}
	/** onChange */
	onChange(page, pageSize) {
		this.setProps({ page, pageSize })
		const { onChange } = this.getProps()
		if (onChange) {
			onChange({ page, pageSize }, this.props)
		}
	}
	/**onShowSizeChange */
	onShowSizeChange(page, pageSize) {
		this.setProps({ page, pageSize })
		const { onShowSizeChange } = this.getProps()
		if (onShowSizeChange) {
			onShowSizeChange({ page, pageSize }, this.props)
		}
	}
	/**
	 * @description 获取组件模板
	 */
	getTemplate() {
		let { show, page, pageSize, disabled, pageSizeOptions, showQuickJumper, showSizeChanger, total, simple, size, showTotal } = this.getProps()
		if (!show) return <></>
		const className = this.getClassName()
		const props = {
			current: page,
			pageSize,
			disabled,
			pageSizeOptions,
			showQuickJumper,
			showSizeChanger,
			total,
			simple,
			size,
			showTotal
		}
		return <Pagination
			{...props}
			locale={zh_cn.Pagination}
			className={className.join(" ")}
			onChange={((page, pageSize) => this.onChange(page, pageSize))}
			onShowSizeChange={(page, pageSize) => this.onShowSizeChange(page, pageSize)}
		/>
	}
}
