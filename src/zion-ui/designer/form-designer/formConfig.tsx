import { StateManage, Select, Input } from "../../"
import { CodePreview } from "../components"

export const formConfig = ({ controlKey, formConfig, style, className, onChangeAttr }) => ({
	"formConfig": {
		"columns": 1,
		"layout": "vertical"
	},
	"formItemConfig": [
		{
			"field": "controlKey",
			"labelProps": {
				"label": "控件编码",
			},
			"controlProps": {
				"type": Input,
				"props": {
					"disabled": true,
					"value": controlKey
				}
			}
		},
		{
			"field": "formConfig.columns",
			"labelProps": {
				"label": "列展示"
			},
			"controlProps": {
				"type": Select,
				"props": {
					"value": formConfig["columns"] || "1",
					"dataSource": [
						{
							"key": "1",
							"label": "单列"
						},
						{
							"key": "2",
							"label": "双列"
						},
						{
							"key": "3",
							"label": "三列"
						}
					],
					"onChange": ({ value }, state) => {
						onChangeAttr({ key: "formConfig.columns", value })
					}
				}
			}
		},
		{
			"field": "formConfig.layout",
			"labelProps": {
				"label": "标签文本布局"
			},
			"controlProps": {
				"type": Select,
				"props": {
					"value": formConfig["layout"] || "vertical",
					"dataSource": [
						{
							"key": "vertical",
							"label": "垂直"
						},
						{
							"key": "horizontal",
							"label": "水平"
						}
					],
					"onChange": ({ value }, state) => {
						onChangeAttr({ key: "formConfig.layout", value })
					}
				}
			}
		},
		{
			"field": "formConfig.labelCol.span",
			"labelProps": {
				"label": "标签文本栅格占比",
				"help": "最大24，最小0"
			},
			"controlProps": {
				"type": Input,
				"props": {
					"type": "number",
					"value": formConfig["labelCol"]["span"] || 24,
					"style": { "width": "100%" },
					"onChange": ({ value }, state) => {
						onChangeAttr({ key: "formConfig.labelCol.span", value })
					}
				}
			}
		},
		{
			"field": "formConfig.wrapperCol.span",
			"labelProps": {
				"label": "控件栅格占比",
				"help": "最大24，最小0"
			},
			"controlProps": {
				"type": Input,
				"props": {
					"type": "number",
					"style": { "width": "100%" },
					"value": formConfig["wrapperCol"]["span"] || 24,
					"onChange": ({ value }, state) => {
						onChangeAttr({ key: "formConfig.wrapperCol.span", value })
					}
				}
			}
		},
		{
			"field": "style",
			"labelProps": {
				"label": "样式"
			},
			"controlProps": {
				"type": Input,
				"props": {
					"onClick": ({ }, state) => {
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
									onChangeAttr({ key: "style", value: value ? JSON.parse(value) : null })
									StateManage.set(state, { value: value ? JSON.parse(value) : null, showValue: value ? "已配置" : null })
								}
							}
						})
					},
					"disableOnChange": true,
					"placeholder": "输入样式",
					"value": style,
					"showValue": style ? "已配置" : null
				}
			}
		},
		{
			"field": "className",
			"labelProps": {
				"label": "类名",
				"help": "输入类名，多个用空格隔开"
			},
			"controlProps": {
				"type": Input,
				"props": {
					"allowSpace": true,
					"type": "input",
					"placeholder": "输入类名",
					"value": className,
					"onChange": ({ value }, state) => {
						onChangeAttr({ key: "className", value })
					}
				}
			}
		}
	]
})