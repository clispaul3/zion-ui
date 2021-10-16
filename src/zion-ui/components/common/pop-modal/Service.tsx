import Modal from 'antd/lib/modal/Modal'
import React, { RefObject, useEffect, useState } from "react"
import { CloseOutlined, FullscreenExitOutlined, FullscreenOutlined } from "@ant-design/icons"
import { BaseService } from "../../base"
import { EventHandlerParams, MouseEventType } from "../../../@types/Base"
import {
	defaultClassName, closeIconStyle, fullIconStyle,
	IProps, resizeIconClassName, defaultMinHeight,
	defaultMinWidth, defaultOkText
} from "../../../@types/PopModal"
import { Button } from 'antd'
import Draggable from 'react-draggable'

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
	 * @description 获取全屏样式
	 */
	getFullScreenStyle() {
		return {
			style: {
				top: "0px"
			},
			width: "100%"
		}
	}

	/**
	 * @description getTitle
	 */
	getTitle() {
		const { title, allowFullScreen, allowDrag } = this.getProps()
		const [fullScreened, setFullScreened] = useState(false)
		const TargetIcon = fullScreened ? FullscreenExitOutlined : FullscreenOutlined
		if (title === null) return null
		return <div className={defaultClassName + "-header"} style={{ position: "relative", cursor: allowDrag ? "move" : "default" }}>
			{title}
			{(allowFullScreen === true && allowDrag !== true) ? <TargetIcon style={fullIconStyle} onClick={() => {
				setFullScreened(!fullScreened)
				this.setProps({ fullScreen: !fullScreened })
			}} /> : null}
			<CloseOutlined style={closeIconStyle} onClick={() => this.closeModal()} />
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
		onOk && onOk({ ev, eventName: MouseEventType.onOk }, this.props)
		onConfirm && onConfirm({ ev, eventName: MouseEventType.onConfirm }, this.props)
	}

	/**
	 * @description getFooter
	 */
	getFooter() {
		const { footer, onOk, onConfirm, okText, cancelText } = this.getProps()
		if (footer === null) return null
		if (footer) return footer
		return <div>
			<Button onClick={() => this.closeModal()}>{cancelText}</Button>
			{(onOk || onConfirm || okText !== defaultOkText) ? <Button type="primary" onClick={(ev) => this.onOk(ev)}>{okText}</Button> : null}
		</div>
	}

	/**
	 * @description dragFunc
	 */
	dragFunc(modal: any) {
		const [bounds, setBoundes] = useState({})
		return <Draggable
			bounds={bounds}
			onStart={(event: any, uiData: any) => {
				const className = event.target.classList.toString()
				if (className.indexOf(defaultClassName + "-header") < 0) return
				const { clientWidth, clientHeight } = window?.document?.documentElement;
				const targetRect = (this.draggleRef?.current as any).getBoundingClientRect();
				setBoundes({
					left: -targetRect?.left + uiData?.x,
					right: clientWidth - (targetRect?.right - uiData?.x),
					top: -targetRect?.top + uiData?.y,
					bottom: clientHeight - (targetRect?.bottom - uiData?.y),
				})
			}}
		>
			<div ref={this.draggleRef as any}>{modal}</div>
		</Draggable>
	}

	/**
	 * @description resizeFunc
	 */

	resizeFunc() {
		const { uniqId } = this.getProps()
		useEffect(() => {
			const rootEle: any = document.getElementById(uniqId)
			const resizeEle = document.querySelector("#" + uniqId + "-resize")
			const containerEle = document.querySelector("#" + uniqId + " .ant-modal")
			const contentEle: any = document.querySelector("#" + uniqId + "-body")
			const sbox: any = resizeEle
			const box: any = containerEle
			sbox.onmousedown = function (e: any) {
				e = e || window.event;
				e.cancelBubble = true;
				const xDown = e.clientX,
					yDown = e.clientY,
					boxW = box.clientWidth,
					boxH = contentEle.clientHeight;
				rootEle.onmousemove = function (e: any) {
					e = e || window.event;
					const xMove = e.clientX,
						yMove = e.clientY,
						x_ = xMove - xDown,
						y_ = yMove - yDown,
						width = Math.max(10, x_ + boxW),
						height = Math.max(10, y_ + boxH);
					if (width <= defaultMinWidth) return
					if (height <= defaultMinHeight) return
					box.style.width = width + "px";
					contentEle.style.height = height + "px";
				}
			}
			rootEle.onmouseup = function () {
				rootEle.onmousemove = null;
			};
		}, [])
		return <span className={resizeIconClassName} id={uniqId + "-resize"}></span>
	}

	getTemplate() {
		const {
			fullScreen,
			title,
			footer,
			content,
			top,
			width,
			height,
			maskStyle,
			showMask,
			uniqId,
			visible,
			allowDrag,
			allowResize,
			keyboard,
			maskClosable,
			zIndex
		} = this.getProps()
		let modalProps: any = {
			visible,
			keyboard,
			maskClosable: maskClosable === true ? true : false,
			zIndex,
			destroyOnClose: true,
			forceRender: true,
			closable: false,
			width: fullScreen ? "100%" : width,
			height: fullScreen ? "100%" : height,
			title: this.getTitle(),
			footer: this.getFooter(),
			maskStyle,
			mask: showMask,
			style: {
				top: fullScreen ? "0px" : top
			},
			onCancel: this.closeModal.bind(this),
			getContainer: document.getElementById(uniqId)
		}
		if (allowDrag) {
			modalProps.modalRender = this.dragFunc.bind(this)
		}
		useEffect(() => {
			const bodyContainer = document.getElementById(uniqId + "-body")
			if (bodyContainer) {
				let maxHeight: any = document.body.clientHeight - (footer !== null ? 168 : 81)
				if (title === null) {
					maxHeight += 33
				}
				maxHeight = maxHeight + "px"
				if (fullScreen) {
					bodyContainer.style.height = maxHeight
				} else {
					const containerHeight = height.indexOf("%") >= 0 ? (document.body.clientHeight * Number(height.replace("%", "")) * 0.01 + "px") : height
					bodyContainer.style.height = containerHeight
					bodyContainer.style.maxHeight = maxHeight
				}
			}
		}, [fullScreen, footer, height])
		return <Modal {...modalProps}>
			<div style={{ overflow: "auto" }} id={uniqId + "-body"}>
				{visible ? content : null}
				{allowResize ? this.resizeFunc() : null}
			</div>
		</Modal>
	}
}
