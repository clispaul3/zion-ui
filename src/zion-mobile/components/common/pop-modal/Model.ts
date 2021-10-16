import { BaseModel } from "../../base"
import {
  defaultClassName, defaultHeight, defaultMaskStyle, defaultModalTitile,
  defaultOkText, defaultCancelText, defaultPositionTop, defaultWidth, IProps
} from "../../../@types/PopModal"
import { EventHandlerResult } from "../../../@types/Base"
import { IObservableObject } from "mobx"
import { CSSProperties, ReactNode } from "react"

export class Model extends BaseModel implements IProps {
  // UI属性
  title?: string | ReactNode
  content?: ReactNode
  footer?: ReactNode | null
  fullScreen?: boolean
  allowDrag?: boolean
  allowResize?: boolean
  allowFullScreen?: boolean
  top?: string
  width?: string
  height?: string
  keyboard?: boolean
  maskClosable?: boolean
  showMask?: boolean
  maskStyle?: CSSProperties
  zIndex?: number
  visible?: boolean
  okText?: ReactNode | string
  cancelText?: ReactNode | string

  // 事件属性
  onOk?: (params: EventHandlerResult, state: IObservableObject) => void
  onConfirm?: (params: EventHandlerResult, state: IObservableObject) => void
  onCancel?: () => void
  onClose?: () => void

  // 其他属性
  watcher: {
    visible: (prev: boolean, next: boolean) => void
  }
  uniqId: string

  constructor(props: IProps) {
    super(props)
    this.title = props.title === null ? null : (props.title || defaultModalTitile)
    this.content = props.content || null
    this.footer = props.footer
    this.fullScreen = props.fullScreen
    this.allowDrag = props.allowDrag
    this.allowResize = props.allowResize
    this.allowFullScreen = props.fullScreen === true ? false : props.allowFullScreen
    this.top = props.top || defaultPositionTop
    this.width = props.width || defaultWidth
    this.height = props.height || defaultHeight
    this.keyboard = props.keyboard === false ? false : true
    this.maskClosable = props.maskClosable
    this.showMask = props.showMask === false ? false : true
    this.maskStyle = props.maskStyle || defaultMaskStyle
    this.zIndex = props.zIndex
    this.okText = props.okText || defaultOkText
    this.cancelText = props.cancelText || defaultCancelText
    this.uniqId = props.controlKey || defaultClassName + "-" + (Math.random() * 100000).toFixed(0)

    this.onOk = props.onOk
    this.onConfirm = props.onConfirm
    this.onCancel = props.onCancel
    this.onClose = props.onClose
    this.visible = props.visible === false ? false : true
    this.watcher = {
      visible: (prev: boolean, next: boolean) => {
        if (next === false) {
          this.removeElement(this.uniqId)
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
      const timer = setTimeout(() => {
        clearTimeout(timer)
        element.parentNode?.removeChild(element)
        element.innerHTML = ""
      }, 0)
    }
    this.uniqId = ""
  }
}
