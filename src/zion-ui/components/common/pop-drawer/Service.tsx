import React, { RefObject } from "react"
import { EventHandlerParams, MouseEventType } from "../../../@types/Base"
import { defaultClassName, IProps } from "../../../@types/PopDrawer"
import { Button, Drawer } from 'antd'
import { BaseService } from "../../base"
export class Service extends BaseService {
	draggleRef: RefObject<object>
	constructor(props: IProps, isPureComponent?: boolean) {
		super(props, isPureComponent)
		this.draggleRef = React.createRef()
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
		const { ev } = params as any
		ev && ev.stopPropagation && ev.stopPropagation()
	}

	/**
	 * @description getTitle
	 */
	getTitle() {
		const { title } = this.getProps()
		if (title === null) return null
		return <div className={defaultClassName + "-header"}>
			{title}
		</div>
	}

	/**
	 * @description closeModal
	 */
	closeModal() {
		const { onCancel, onClose } = this.getProps()
		this.setProps({ visible: false })
		onCancel && onCancel()
		onClose && onClose()
	}

	/**
	 * @description onOk
	 */
	onOk(ev: React.MouseEvent<HTMLElement>) {
		const { onOk, onConfirm } = this.getProps()
		onOk && onOk({ ev, eventName: MouseEventType.onClick }, this.props)
		onConfirm && onConfirm({ ev, eventName: MouseEventType.onConfirm }, this.props)
	}

	/**
	 * @description getFooter
	 */
	getFooter() {
		const { footer, onOk, onConfirm, cancelText, okText } = this.getProps()
		if (footer === null) return null
		if (footer) return footer
		return <div style={{ textAlign: "right" }}>
			<Button onClick={() => this.closeModal()} style={{ marginRight: "5px" }}>{cancelText}</Button>
			{(onOk || onConfirm) ? <Button type="primary" onClick={(ev) => this.onOk(ev)}>{okText}</Button> : null}
		</div>
	}

	getTemplate() {
		const {
			content,
			width,
			height,
			maskStyle,
			showMask,
			uniqId,
			keyboard,
			maskClosable,
			zIndex,
			placement,
		} = this.getProps()
		let drawerProps: any = {
			placement,
			visible: true,
			keyboard,
			maskClosable,
			zIndex,
			destroyOnClose: true,
			forceRender: true,
			closable: false,
			width,
			height,
			title: this.getTitle(),
			footer: this.getFooter(),
			maskStyle,
			mask: showMask,
			onClose: this.closeModal.bind(this),
			getContainer: document.getElementById(uniqId)
		}
		return <Drawer {...drawerProps}>
			<div style={{ overflow: "auto" }} id={uniqId + "-body"}>
				{content}
			</div>
		</Drawer>
	}
}
