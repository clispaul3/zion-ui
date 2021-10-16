import React from "react"
import { StateManage, Collapse, PropertyService, observer, Form, Input, Utils, Switch, Button } from "../../"
import { dataSource } from "./dataSource"
import { FormItem } from "./FormItem"
import { CloseCircleFilled, EditFilled, CopyFilled } from "@ant-design/icons"
import { set, cloneDeep } from "lodash"
import { formConfig } from "./formConfig"

export const Content = ({ config }) => {
	const state = PropertyService.getObservableObj({
		type: "[[Form]]",
		props: config || {
			"controlKey": "Form$$" + Utils.uuid(),
			"formConfig": {
				"columns": 1,
				"layout": "vertical",
				"labelCol": { "span": 24 },
				"wrapperCol": { "span": 24 }
			},
			"formItemConfig": []
		}
	})
	const { controlKey, formConfig: formProps, style, className } = StateManage.get(state, "props")
	// 添加表单元素
	const addItem = (data) => {
		const { key, props = {}, label } = data
		const { formItemConfig } = StateManage.get(state, "props")
		const controlKey = key + "$$" + Utils.uuid().replace(/\-/g, "")
		formItemConfig.push({
			field: "field$" + (Math.random() * 10000).toFixed(0),
			labelProps: {
				label
			},
			controlProps: {
				type: "[[" + key + "]]",
				props: {
					controlKey,
					...props
				}
			}
		})
		StateManage.set(state, { "props.formItemConfig": formItemConfig })
	}
	// 预览区
	const PreviewForm = observer(() => {
		const config = StateManage.get(state)
		return <div style={{ flex: 1, overflow: "auto", padding: "20px 20px" }}>
			<div style={{ height: document.body.clientHeight * 0.7 - 40 + "px", overflow: "auto", border: "1px solid rgba(44,144,255,0.2)", borderRadius: "3px", padding: "8px" }}>
				{PropertyService.getReactElementFromJSON(cloneDeep(config))}
			</div>
		</div>
	})
	// 字段展示
	const FieldList = observer(() => {
		const config = StateManage.get(state)
		let formItemConfig = config["props"]["formItemConfig"]
		const onChangeAttr = ({ key, value, item }) => {
			formItemConfig.forEach(data => {
				if (data["controlProps"]["props"]["controlKey"] === item["controlProps"]["props"]["controlKey"]) {
					set(data, key, value)
				}
			})
			StateManage.set(state, { "props.formItemConfig": formItemConfig })
		}
		return <div>
			{formItemConfig.map((item, index) => {
				return <div
					style={{ backgroundColor: "rgba(44,144,255,.1)", position: "relative", cursor: "pointer", padding: "5px 8px", marginBottom: "5px" }}>
					<span style={{ height: "25px", display: "block" }}></span>
					<Input value={item.labelProps.label} label="标签文本" layout={{ labelCol: { span: 8 } }} onBlur={({ value }) => {
						onChangeAttr({ key: "labelProps.label", value, item })
					}} />
					<Input value={item.field} label="字段编码" layout={{ labelCol: { span: 8 } }} onBlur={({ value }) => {
						onChangeAttr({ key: "field", value, item })
					}} />
					<Switch value={item.labelProps.required} layout={{ labelCol: { span: 8 } }} label={"是否必填"} onChange={({ value }) => {
						onChangeAttr({ key: "labelProps.required", value, item })
					}} />
					<span>
						<CopyFilled style={{ position: "absolute", right: "50px", top: "9px", color: "rgba(44,144,255,0.5)" }}
							onClick={(ev) => {
								ev.stopPropagation()
								const newItem = cloneDeep(item)
								newItem["field"] = "field$" + (Math.random() * 10000).toFixed(0)
								const key = newItem["controlProps"]["type"].replace("[[", "").replace("]]", "")
								const controlKey = key + "$$" + Utils.uuid()
								newItem["controlProps"]["props"]["controlKey"] = controlKey
								const { formItemConfig } = StateManage.get(state, "props")
								formItemConfig.push(newItem)
								StateManage.set(state, { "props.formItemConfig": formItemConfig })
							}}
						/>
					</span>
					<span>
						<EditFilled style={{ position: "absolute", right: "30px", top: "9px", color: "rgba(44,144,255,0.5)" }}
							onClick={(ev) => {
								ev.stopPropagation()
								FormItem({
									config: item,
									onOk: ({ value }) => {
										formItemConfig[index] = value
										StateManage.set(state, { "props.formItemConfig": formItemConfig })
									}
								})
							}}
						/>
					</span>
					<span style={{ position: "absolute", right: "10px", top: "4px" }}>
						<CloseCircleFilled
							style={{ color: "rgba(44,144,255,0.5)" }}
							onClick={(ev) => {
								ev.stopPropagation()
								formItemConfig = formItemConfig.filter(data => data["field"] !== item["field"])
								StateManage.set(state, { "props.formItemConfig": formItemConfig })
							}} />
					</span>
				</div>
			})}
		</div>
	})
	// 表单属性
	const [formState, FormTpl] = Form(formConfig({
		controlKey,
		formConfig: formProps,
		style,
		className,
		onChangeAttr: ({ key, value }) => {
			const config = StateManage.get(state, "props")
			set(config, key, value)
			StateManage.set(state, { "props": config })
		}
	}) as any, false)
	const Template = () => {
		return <div style={{ height: "100%", display: "flex" }}>
			<div style={{ padding: "20px 20px", background: "#fff", width: "150px" }}>
				<div style={{ fontSize: "14px", fontWeight: 600, textAlign: "center" }}>表单控件【{dataSource.length}】</div>
				{dataSource.map((item, index) => {
					return <span
						onClick={() => addItem(item)}
						style={{ color: "#1890ff", position: "relative", display: "inline-block", padding: "3px 0px 3px 8px", width: "120px", boxSizing: "border-box", margin: "5px", background: "rgba(44,144,255,.1)", cursor: "pointer" }}
						key={item.key}>
						{item.label}
					</span>
				})}
			</div>
			<PreviewForm />
			<div style={{ width: "300px", background: "#fff", height: document.body.clientHeight * 0.7 + "px", overflow: "auto" }}>
				<Collapse defaultActiveKey={["form", "formItem"]}>
					<Collapse.Panel header="表单属性" key={"form"}>
						<FormTpl />
					</Collapse.Panel>
					<Collapse.Panel header="字段属性" key={"formItem"} >
						<FieldList />
					</Collapse.Panel>
				</Collapse>
			</div>
		</div>
	}
	// StateManage.get(state) 可获取表单设计器的返回值
	return [state, Template]
}
