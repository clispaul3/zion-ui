import React from "react"
import { EventHandlerResult, MouseEventType } from "../../../@types/Base"
import { BaseService } from "../../base"
import { defaultClassName } from "../../../@types/CodeEditor"
import { Utils } from "../../../utils"
import CodeMirror from "codemirror/lib/codemirror"
import "codemirror/lib/codemirror.js"
import "codemirror/mode/jsx/jsx.js"
import "codemirror/mode/javascript/javascript.js"
import "codemirror/mode/markdown/markdown.js"
import "codemirror/mode/sass/sass.js"
import "codemirror/mode/css/css.js"

export class Service extends BaseService {
	editor
	contentId: string
	constructor(props: Object, isPureComponent?: boolean) {
		super(props, isPureComponent)
		this.contentId = defaultClassName + "-" + Utils.uuid();
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
			this.setProps({ value })
		}
		if (onChange && typeof onChange === "function") {
			onChange({ ev: null, value, eventName: MouseEventType.onChange }, this.props)
		}
	}
	/**
	 * @description 获取组件模板
	 */
	getTemplate() {
		let { value, show, language, theme, style, readonly } = this.getProps()
		if (!show) return null
		const className = this.getClassName()
		new Promise((resolve) => {
			resolve(true)
		}).then(() => {
			const codeContainer = document.getElementById(this.contentId)
			if (codeContainer && !this.editor) {
				this.editor = CodeMirror(codeContainer, {
					value,
					mode: language,
					theme,
					readOnly: readonly
				})
			}
		})
		const Template = <div
			className={className.toString()}
			style={{ ...style || {}, overflow: "scroll", position: "relative" }}
			id={this.contentId}>
		</div>
		return this.getFormItem(Template)
	}
}
