/**
 * @description 表单元素的属性配置
 * @description config 数据格式: {field:"",labelProps:{}, controlProps:{}}
 */
import React from "react"
import { PopDrawer, Tabs, Form, Input, Switch, StateManage } from "../../"
import { Property } from "../property"

export const FormItem = ({ config, onOk }) => {
	const labelConfig = config["labelProps"]
	const controlProps = config["controlProps"]
	const type = controlProps["type"].replace("[[", "").replace("]]", "")
	const labelProps: any = {
		formConfig: {
			columns: 1,
			layout: "vertical",
			labelCol: {
				span: 6
			},
			wrapperCol: {
				span: 18
			}
		},
		formItemConfig: [
			{
				field: "label",
				labelProps: { label: "标签文本" },
				controlProps: {
					type: Input,
					props: {
						value: labelConfig["label"]
					}
				}
			},
			{
				field: "field",
				labelProps: { label: "字段编码" },
				controlProps: {
					type: Input,
					props: {
						value: config["field"]
					}
				}
			},
			{
				field: "help",
				labelProps: { label: "提示文字" },
				controlProps: {
					type: Input,
					props: {
						value: labelConfig["help"]
					}
				}
			},
			{
				field: "rowCol",
				labelProps: {
					label: "栅格占比",
					help: "最大24，最小0"
				},
				controlProps: {
					type: Input,
					props: {
						value: config["rowCol"],
						type: "number"
					}
				}
			},
			{
				field: "required",
				labelProps: { label: "是否必填" },
				controlProps: {
					type: Switch,
					props: {
						value: labelConfig["required"]
					}
				}
			}
		]
	}
	const [formState, FormTpl] = Form(labelProps, false)
	const [state, PropertyTpl]: any = Property({ property: controlProps["props"], type })
	PopDrawer({
		title: "属性配置",
		width: "400px",
		placement: "right",
		content: <div>
			<Tabs >
				<Tabs.TabPane tab="标签属性" key="labelProps">
					<FormTpl />
				</Tabs.TabPane>
				<Tabs.TabPane tab="控件属性" key="controlProps" forceRender={true}>
					<div style={{ height: document.body.clientHeight * 0.7 - 10 + "px", overflow: "auto" }}>
						<PropertyTpl />
					</div>
				</Tabs.TabPane>
			</Tabs>
		</div>,
		onClose: async () => {
			const getResult = StateManage.get(state, "getResult")
			const result = await getResult()
			const { getFormData } = StateManage.get(formState)
			const formData = await getFormData(true)
			const labelProps: any = {}
			Object.keys(formData).forEach(key => {
				if (key === "rowCol") {
					if (formData[key]["value"] > 0) {
						config["rowCol"] = formData[key]["value"]
					}
				} else if (key == "field") {
					config["field"] = formData[key]["value"]
				} else {
					labelProps[key] = formData[key]["value"]
				}
			})
			Object.assign(config, { labelProps, controlProps: result })
			onOk && onOk({ value: config })
		}
	})
}