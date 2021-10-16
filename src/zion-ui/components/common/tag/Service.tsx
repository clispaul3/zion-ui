import React from "react"
import { defaultClassName, tagTypeArr, TtagType } from "../../../@types/Tag"
import { MouseEventType, EventHandlerParams } from "../../../@types/Base"
import { Tag } from "antd"
import { BaseService } from "../../base"
import {
	CheckCircleOutlined,
	SyncOutlined,
	CloseCircleOutlined,
	ExclamationCircleOutlined,
	ClockCircleOutlined,
} from '@ant-design/icons';

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
		const { ev, eventName } = params as any
		const { disabled, loading } = this.getProps()
		ev.stopPropagation()
		if (disabled || loading) return
		const { onClick } = this.getProps()
		if (eventName === MouseEventType.onClick) {
			onClick && onClick({ ev, eventName }, this.props)
		}
	}
	/**
	 * @description getTagType
	 */
	private getTagType() {
		let type: TtagType
		type = this.getProps()["type"]
		const tagTypeMap = {
			"success": ["success", <CheckCircleOutlined />],
			"warn": ["warning", <ExclamationCircleOutlined />],
			"warning": ["warning", <ExclamationCircleOutlined />],
			"processing": ["processing", <SyncOutlined spin />],
			"error": ["error", <CloseCircleOutlined />],
			"waiting": ["default", <ClockCircleOutlined />],
		}
		if (tagTypeArr.includes(type)) {
			return tagTypeMap[type]
		}
		return null
	}

	/**
	 * @description 获取组件模板
	 */
	getTemplate() {
		let { closable, closeIcon, color, icon, text, style } = this.getProps()
		const className = this.getClassName()
		const tagTypeResult = this.getTagType()
		return <Tag
			className={className.join(" ")}
			style={style}
			closable={closeIcon ? true : closable}
			closeIcon={closeIcon}
			color={tagTypeResult ? tagTypeResult[0] : color}
			icon={tagTypeResult ? tagTypeResult[1] : icon}
		>
			{text}
		</Tag>
	}
}
