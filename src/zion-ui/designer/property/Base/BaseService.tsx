import { StateManage, PopMessage } from "../../../"
import { CodePreview, SelectIcon } from "../../components"

export class BaseService {
	controlKey: string
	controlKey_JSON: string
	constructor({ controlKey, FuncSetting }) {
		this.controlKey = controlKey
		this.controlKey_JSON = controlKey + "@JSON"
	}
	attr_change = (params: { value, attr, ignore?}) => {
		if (this.controlKey) {
			const { value, attr } = params
			if (attr.indexOf("{{") >= 0 && attr.indexOf("}}") >= 0) {
				StateManage.set(this.controlKey_JSON, { [attr]: value })
			} else if (params.ignore === true) {
				StateManage.set(this.controlKey, { [attr]: value })
			} else {
				StateManage.set(this.controlKey_JSON, { [attr]: value })
				StateManage.set(this.controlKey, { [attr]: value })
			}
		}
	}
	text_onChange = ({ value }) => {
		this.attr_change({ value: value || "按钮", attr: "text" })
	}
	size_onChange = ({ value }) => {
		this.attr_change({ value, attr: "size" })
	}
	shape_onChange = ({ value }) => {
		this.attr_change({ value, attr: "shape" })
	}
	loading_onChange = ({ value }) => {
		this.attr_change({ value, attr: "loading" })
	}
	type_onChange = ({ value }) => {
		this.attr_change({ value, attr: "type" })
	}
	className_onChange({ value }) {
		this.attr_change({ value, attr: "className" })
	}
	disabled_onChange = ({ value }) => {
		this.attr_change({ value, attr: "disabled" })
	}
	label_onChange = ({ value }) => {
		this.attr_change({ value, attr: "label" })
	}
	require_onChange = ({ value }) => {
		this.attr_change({ value, attr: "required" })
	}
	help_onChange = ({ value }) => {
		this.attr_change({ value, attr: "validateResult.help" })
	}
	allowClear_onChange = ({ value }) => {
		this.attr_change({ value, attr: "allowClear" })
	}
	allowSpace_onChange = ({ value }) => {
		this.attr_change({ value, attr: "allowSpace" })
	}
	disableOnChange_onChange = ({ value }) => {
		this.attr_change({ value, attr: "disableOnChange" })
	}
	onlyInt_onChange = ({ value }) => {
		this.attr_change({ value, attr: "onlyInt" })
	}
	max_onChange = ({ value }) => {
		this.attr_change({ value, attr: "max" })
	}
	min_onChange = ({ value }) => {
		this.attr_change({ value, attr: "min" })
	}
	maxLength_onChange = ({ value }) => {
		this.attr_change({ value, attr: "maxLength" })
	}
	addonAfter_onChange = ({ value }) => {
		this.attr_change({ value, attr: "addonAfter" })
	}
	addonBefore_onChange = ({ value }) => {
		this.attr_change({ value, attr: "addonBefore" })
	}
	visibilityToggle_onChange = ({ value }) => {
		this.attr_change({ value, attr: "visibilityToggle" })
	}
	labelCol_onChange = ({ value }) => {
		this.attr_change({ value, attr: "layout.labelCol.span" })
	}
	wrapperCol_onChange = ({ value }) => {
		this.attr_change({ value, attr: "layout.wrapperCol.span" })
	}
	autoValidate_onChange = ({ value }) => {
		this.attr_change({ value, attr: "autoValidate" })
	}
	hasFeedback_onChange = ({ value }) => {
		this.attr_change({ value, attr: "hasFeedback" })
	}
	placement_onChange = ({ value }) => {
		this.attr_change({ value, attr: "placement" })
	}
	allowCancel_onChange = ({ value }) => {
		this.attr_change({ value, attr: "allowCancel" })
	}
	value_onChange = ({ value }) => {
		this.attr_change({ value, attr: "value" })
	}
	showValue_onChange = ({ value }) => {
		this.attr_change({ value, attr: "showValue" })
	}
	placeholder_onChange = ({ value }) => {
		this.attr_change({ value, attr: "placeholder" })
	}
	href_onChange = ({ value }) => {
		this.attr_change({ value, attr: "href" })
	}
	color_onChange = ({ value }) => {
		this.attr_change({ value, attr: "color" })
	}
	style_onClick = ({ }, state) => {
		const style = StateManage.get(state, "value")
		CodePreview({
			code: style ? JSON.stringify(style) : "{}",
			language: "json",
			modalProps: {
				title: "设置样式",
				width: "600px",
				height: "70%",
				top: "20px",
				onOk: ({ value }) => {
					this.attr_change({ value: value ? JSON.parse(value) : null, attr: "style" })
					StateManage.set(state, { value: value ? JSON.parse(value) : null, showValue: value ? "已配置" : null })
				}
			}
		})
	}
	icon_onClick = ({ }, state) => {
		SelectIcon({
			onOk: ({ selectedIcon }) => {
				// if (this.controlKey) {
				// 	StateManage.set(this.controlKey, { icon: selectedIcon })
				// }
				StateManage.set(state, { value: selectedIcon })
			}
		})
	}
	didMount_onClick = ({ }, state) => {
		PopMessage({ type: "info", text: "敬请期待" })
	}
}