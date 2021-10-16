import React from "react"
import { EventHandlerResult, MouseEventType } from "../../../@types/Base"
import { BaseService } from "../../base"
import { defaultClassName } from "../../../@types/RichEditor"
import Editor from "wangeditor"
import { Utils } from "../../../utils"
import { ReactNode } from "react"

export class Service extends BaseService {
	editor
	Template: ReactNode
	contentId: string
	constructor(props: Object, isPureComponent?: boolean) {
		super(props, isPureComponent)
		const contentId = defaultClassName + "-" + Utils.uuid();
		this.contentId = contentId
		this.editor = null
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
	eventHandler(params: EventHandlerResult) {
		const { ev, eventName } = params
		const { disabled, loading } = this.getProps()
		ev && ev.stopPropagation && ev.stopPropagation()
		if (disabled || loading) return;
		(this as any)[eventName]({ ev, eventName })
	}
	onChange(value) {
		const { onChange } = this.getProps()
		if (!this.isPureComponent) {
			// this.setProps({ value })
		}
		if (onChange && typeof onChange === "function") {
			onChange({ ev: null, value, eventName: MouseEventType.onChange }, this.props)
		}
	}
	/**
	 * @description onFocus事件回调
	 * @param ev 
	 */
	onFocus(value) {
		const { onFocus } = this.getProps()
		onFocus && onFocus({ ev: null, eventName: MouseEventType.onFocus, value }, this.props)
	}
	/**
	 * @description onBlur事件回调
	 * @param ev 
	 */
	onBlur(value) {
		let { onBlur } = this.getProps()
		onBlur && onBlur({ ev: null, eventName: MouseEventType.onBlur, value }, this.props)
	}
	/**
	 * @description 创建默认配置
	 */
	createBeforeInitConfig = (target) => {
		const { uploadImgConfig: { maxSize, url, headers }, colors, placeholder, menus, height, zIndex } = this.getProps()
		target.config.colors = colors || ["#fff", "#efeff4", "#e5e5ea", "#d1d1d6", "#c7c7cc", "#8e8e93", "#4a4a4d", "#000000", "#ff3b30", "#ff9500", "#ffcc00", "#4cd964", "#5ac8fa", "#007aff", "#5856d6", "#bd10e0", "#ffd8d6", "#ffeacc", "#fff5cc", "#dbf7e0", "#def4fe", "#cce4ff", "#deddf7", "#f2cff9", "#ffb1ac", "#ffd599", "#ffeb99", "#bff1c7", "#bde9fd", "#99caff", "#bcbbef", "#e59ff3", "#ff766f", "#ffb54d", "#ffdb4d", "#82e493", "#8cd9fc", "#4da2ff", "#8a89e2", "#d158e9", "#b22922", "#b26800", "#b28e00", "#359746", "#3f8caf", "#0055b2", "#3d3c95", "#840b9c", "#661813", "#663c00", "#665200", "#1e5728", "#245064", "#003166", "#232256", "#4c065a"];
		target.config.placeholder = placeholder || "";
		target.config.height = height;
		target.config.zIndex = zIndex;
		target.config.uploadImgMaxSize = maxSize || 10 * 1024 * 1024; // 10M
		target.config.menus = menus || ["head", "bold", "fontSize", "fontName", "italic", "underline", "strikeThrough", "indent", "lineHeight", "foreColor", "backColor", "link", "list", "justify", "quote", "image", "table", "code", "splitLine", "undo", "redo"];
		target.config.uploadImgServer = url || "/ProjMgBusiness/wangeditor/image/upload";
		if (headers) {
			target.config.uploadImgHeaders = headers
		}
	};
	/**
	 * @description 获取组件模板
	 */
	getTemplate() {
		let { value, show, width, style, height } = this.getProps()
		if (!show) return null
		const contentId = this.contentId
		new Promise((resolve) => {
			resolve(true)
		}).then(() => {
			if (!this.editor) {
				this.editor = new Editor("#" + contentId)
				this.editor.config.onchange = (newHtml) => {
					this.onChange(newHtml);
				};
				this.editor.config.onblur = (newHtml) => {
					this.onBlur(newHtml)
				};
				this.editor.config.onfocus = (newHtml) => {
					this.onFocus(newHtml)
				};
				this.createBeforeInitConfig(this.editor);
				this.editor.create();
				this.editor.txt.html(value);
			} else {
				this.editor.txt.html(value);
			}
		})
		const className = this.getClassName()
		if (!this.Template) {
			this.Template = <div className={className.join(" ")} style={{ width, height, ...style }} id={contentId} />
		}
		return this.getFormItem(this.Template)
	}
}
