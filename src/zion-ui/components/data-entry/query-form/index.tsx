/**
 * @description 查询表单(支持form形式的表单，支持自定义render的表单)
 */
import React from "react"
import { Button } from "../../common/button"
import { Form } from "../../data-entry/form"
import { StateManage } from "../../../service/state"
import { defaultClassName } from "../../../@types/QueryForm"

export const QueryForm = function (props): any {
	let formProps, mobxFormProps, FormTemplate
	if (props.formProps) {
		formProps = {
			...props.formProps,
			formConfig: { layout: "vertical", ...props.formProps.formConfig, } || {},
			formItemConfig: props.formProps.formItemConfig.map(item => ({ ...item, style: { margin: "5px 5px" } }))
		}
		const result = Form(formProps, false)
		mobxFormProps = result[0]
		FormTemplate = result[1]
	}
	if (props.render) {
		FormTemplate = props.render
	}

	const SearchButton = Button({
		text: "搜索",
		size: "small",
		type: "primary",
		style: { position: "absolute", right: "16px", bottom: "8px", padding: "30px 12px", lineHeight: "30px" },
		onClick: function () {
			const { onSearch } = props
			if (onSearch && typeof onSearch === "function") {
				if (formProps) {
					const { getFormData } = StateManage.get(mobxFormProps)
					getFormData(false).then(data => {
						onSearch(data)
					})
				}
				if (props.render) {
					onSearch()
				}
			}
		}
	}, true)
	const ResetButton = Button({
		text: "重置",
		size: "small",
		style: { position: "absolute", bottom: "8px", right: "85px", padding: "30px 12px", lineHeight: "30px" },
		onClick: function () {
			const { onReset } = props
			if (onReset && typeof onReset === "function") {
				if (formProps) {
					const { resetForm } = StateManage.get(mobxFormProps)
					resetForm().then(data => {
						onReset(data)
					})
				}
				if (props.render) {
					onReset()
				}
			}
		}
	}, true)
	const QueryFormTemplate = function () {
		return <div style={{ border: "1px solid #fff", display: "flex" }}>
			<div className={defaultClassName} style={{ flex: 1, paddingLeft: "20px", paddingTop: "0px", minHeight: "40px" }}>
				<FormTemplate />
			</div>
			< div style={{ position: "relative", width: "150px" }
			} >
				<ResetButton />
				<SearchButton />
			</div>
		</div>
	}
	if (props.render && typeof props.render === "function") return props.render()
	return <QueryFormTemplate />
}

export default QueryForm