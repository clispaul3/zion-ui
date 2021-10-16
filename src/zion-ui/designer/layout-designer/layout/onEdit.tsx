/**
 * @description 编辑属性
 * @param config 数据格式 {type:"[[Input]]",props:{},children:[]}
 */
import React from "react"
import { StateManage, PopDrawer, Button } from "../../../"
import { CodePreview } from "../../components"
import { Property } from "../../property"
import { FormDesigner } from "../../form-designer"

export const onEdit = ({ layout, config, callback }) => {
	const target = config["children"][0]
	const type = target.type.replace("[[", "").replace("]]", "")
	const controlKey = target.props.controlKey
	// 打开表单设计器
	if (type === "Form" || type === "QueryForm") {
		let targetConfig = {}
		if (type === "Form") {
			targetConfig = target["props"]
		} else if (type === "QueryForm") {
			targetConfig = target["props"]["formProps"]
		}
		FormDesigner({
			config: targetConfig,
			onOk: ({ value: config }) => {
				const { children = [] } = layout
				children.forEach((child, idx) => {
					if (child["children"][0]["props"]["controlKey"] === controlKey) {
						if (type === "Form") {
							children[idx]["children"] = [config]
						} else if (type === "QueryForm") {
							children[idx]["children"][0]["props"]["formProps"] = config["props"]
						}
					}
				})
				layout["children"] = children
				callback({ layout })
			}
		})
		return
	}
	const [resultState, PropertyTpl]: any = Property({ type, property: target["props"] })
	PopDrawer({
		title: "属性面板",
		content: <div>
			<PropertyTpl />
		</div>,
		// 关闭属性面板时，保存配置属性 
		onClose: async () => {
			const { getResult } = StateManage.get(resultState)
			const result = await getResult()
			const { children = [] } = layout
			children.forEach((child, idx) => {
				if (child["children"][0]["props"]["controlKey"] === controlKey) {
					children[idx]["children"] = [result]
				}
			})
			layout["children"] = children
			callback({ layout })
		},
		footer: <div style={{ textAlign: "right" }}>
			<Button
				text="查看JSON"
				type="danger"
				style={{ marginRight: "5px" }}
				onClick={async () => {
					const { getResult } = StateManage.get(resultState)
					const config = await getResult()
					CodePreview({
						code: JSON.stringify(config),
						language: "json"
					})
				}}
			/>
		</div>
	})
}