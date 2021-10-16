import { BaseModel } from "../../base"
import {
	defaultClassName, defaultHeight, defaultMaskStyle,
	defaultModalTitile, defaultWidth, IProps,
	defaultCancelText, defaultOkText
} from "../../../@types/PopDrawer"
import { EventHandlerResult } from "../../../@types/Base"
import { IObservableObject } from "mobx"
import { CSSProperties, ReactNode } from "react"

export class Model extends BaseModel implements IProps {
	// UI属性
	title?: string | ReactNode | null
	content?: ReactNode
	footer?: ReactNode | null
	placement?: "right" | "top" | "left" | "bottom"
	width?: string
	height?: string
	keyboard?: boolean
	maskClosable?: boolean
	showMask?: boolean
	maskStyle?: CSSProperties
	zIndex?: number
	visible?: boolean
	cancelText?: string
	okText?: string
	forceRender?: boolean

	// 事件属性
	onOk?: (params: EventHandlerResult, mobxProps: IObservableObject) => void
	onConfirm?: (params: EventHandlerResult, mobxProps: IObservableObject) => void
	onCancel?: () => void
	onClose?: () => void

	// 其他属性
	watcher: {
		visible: (prev: boolean, next: boolean) => void
	}
	uniqId: string

	constructor(props: IProps) {
		super(props)
		this.title = props.title !== null ? (props.title || defaultModalTitile) : null
		this.content = props.content || null
		this.footer = props.footer
		this.width = props.width || defaultWidth
		this.height = props.height || defaultHeight
		this.keyboard = props.keyboard === false ? false : true
		this.maskClosable = props.maskClosable
		this.showMask = props.showMask === false ? false : true
		this.maskStyle = props.maskStyle || defaultMaskStyle
		this.zIndex = props.zIndex
		this.placement = props.placement
		this.uniqId = defaultClassName + "-" + (Math.random() * 100000).toFixed(0)
		this.cancelText = props.cancelText || defaultCancelText
		this.okText = props.okText || defaultOkText
		this.forceRender = props.forceRender

		this.onOk = props.onOk
		this.onConfirm = props.onConfirm
		this.onCancel = props.onCancel
		this.onClose = props.onClose
		this.visible = props.visible === false ? false : true
		this.watcher = {
			visible: (prev: boolean, next: boolean) => {
				if (next === false) {
					if (props.forceRender) {
						this.removeElement(this.uniqId)
					} else {
						this.hideElement(this.uniqId)
					}
				}
				if (next === true) {
					if (!props.forceRender) {
						this.showElement(this.uniqId)
					}
				}
			}
		}
		this.createElement(this.uniqId)
	}
	private createElement(uniqId: string) {
		const ele = document.createElement("div")
		ele.id = uniqId
		ele.classList.add(defaultClassName)
		document.body.appendChild(ele)
	}
	private removeElement(uniqId: string) {
		const element = document.getElementById(uniqId)
		if (element) {
			element.innerHTML = ""
			element.parentNode?.removeChild(element)
		}
		this.uniqId = ""
	}
	private hideElement(uniqId: string) {
		const element = document.getElementById(uniqId)
		if (element) {
			element.style.display = "none"
		}
	}
	private showElement(uniqId: string) {
		const element = document.getElementById(uniqId)
		if (element) {
			element.style.display = "block"
		}
	}
}
