import React, { useEffect, useState } from "react"
import { PopDrawer } from "../../common/pop-drawer"
import { PopMessage } from "../../common/pop-message"
import { PopModal } from "../../common/pop-modal"
import { Form } from "../../data-entry/form"
import { StateManage } from "../../../service/state"
import { Loading } from "../../common/loading"

export const Service = {
	filterConditionMap: {},
	orderByMap: {},
	guid() {
		return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
			var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
			return v.toString(16);
		});
	},
	table_onChange: async function ({ condition, httpConfig, filterSettingControlKey }) {
		const { filterConditionMap, orderByMap } = condition
		Service.filterConditionMap = filterConditionMap
		Service.orderByMap = orderByMap
		const filterSettingMap = await Service.getFilterSettingFormData({ filterSettingControlKey })
		return httpConfig.search({
			filterConditionMap: { ...filterConditionMap, ...filterSettingMap },
			orderByMap
		})
	},
	// 新增数据
	insertForm: function ({ insertForm, httpConfig, insertModal = {}, tableControlKey, filterSettingControlKey }) {
		const [formState, FormTpl] = Form(insertForm, false)
		PopModal({
			title: "新增数据",
			content: <div>
				<FormTpl />
			</div>,
			onConfirm: async function ({ }, modalState) {
				const { getFormData } = StateManage.get(formState)
				const formData = await getFormData(true)
				const submitData = {}
				for (let key in formData) {
					submitData[key] = formData[key]["value"]
				}
				if (httpConfig.insert) {
					Loading.setGlobalLoading(true)
					const result = await httpConfig.insert({ formData: submitData })
					if (typeof result === "string") {
						PopMessage({ type: "error", title: result })
					} else if (result === true) {
						PopMessage({ type: "success", title: "新增成功" })
					} else {
						PopMessage({ type: "error", title: "新增失败" })
					}
					StateManage.set(modalState, { visible: false })
					Service.refreshTable({ tableControlKey, httpConfig, filterSettingControlKey, page: 1 })
					Loading.setGlobalLoading(false)
				}
			},
			...insertModal
		})
	},
	getFilterSettingFormData: async ({ filterSettingControlKey }) => {
		if (!StateManage.has(filterSettingControlKey)) return {}
		const { getFormData } = StateManage.get(filterSettingControlKey)
		const formData = await getFormData(false)
		const submitData = {}
		for (let key in formData) {
			submitData[key] = formData[key]["value"]
		}
		return submitData
	},
	// 更新表格数据
	refreshTable: async function ({ tableControlKey, page, filterSettingControlKey, httpConfig }) {
		if (!httpConfig.search) return
		if (page) {
			Service.filterConditionMap["@page"] = 1
		}
		const filterSettingMap = await Service.getFilterSettingFormData({ filterSettingControlKey })
		const { filterConditionMap, orderByMap } = Service
		Loading.setGlobalLoading(true)
		const result = await httpConfig.search({
			filterConditionMap: { ...filterConditionMap, ...filterSettingMap },
			orderByMap
		})
		StateManage.set(tableControlKey, {
			"pagination.page": 1,
			"pagination.total": result.total,
			"dataSource": result.data,
		})
		Loading.setGlobalLoading(false)
	},
	// 过滤数据
	filterSetting: function ({ filterForm, filterModal, httpConfig, filterSettingControlKey, tableControlKey }) {
		const modalControlKey = filterSettingControlKey + ".FilterModal"
		if (StateManage.has(modalControlKey)) {
			StateManage.set(modalControlKey, { visible: true })
			return
		}
		const FilterSettingModal = function () {
			let [FilterFormTpl, setFilterFormTpl] = useState(null) as any
			useEffect(() => {
				FilterFormTpl = Form(filterForm, true)
				setFilterFormTpl(FilterFormTpl)
			}, [])
			return (
				<div style={{ overflow: "auto" }}>
					{FilterFormTpl ? <FilterFormTpl /> : null}
				</div>
			);
		}
		const modalState = PopDrawer({
			title: "设置过滤条件",
			content: <div>
				<FilterSettingModal />
			</div>,
			onClose: async function () {
				Service.refreshTable({ tableControlKey, httpConfig, filterSettingControlKey, page: 1 })
			},
			...filterModal
		})
		StateManage.addState(modalControlKey, modalState)
	},
	// 删除数据
	deleteData: async function ({ checkedRows, tableControlKey, httpConfig, filterSettingControlKey }) {
		const result = await httpConfig.delete({ checkedRows })
		if (typeof result === "string" || result === false) {
			return {
				result: false,
				message: typeof result === "string" ? result : "删除失败"
			}
		} else if (result === true) {
			StateManage.set(tableControlKey, { "pagination.page": 1 })
			Service.refreshTable({ tableControlKey, httpConfig, filterSettingControlKey, page: 1 })
			return {
				result: true,
				message: "删除成功"
			}
		}
	},
	// 修改数据
	updateData: async function ({ record, updateModal = {}, updateForm, tableControlKey, httpConfig, filterSettingControlKey, updateFormControlKey }) {
		httpConfig.beforeUpdate({ record }).then(result => {
			const { formItemConfig } = updateForm
			formItemConfig.forEach(item => {
				const { field } = item
				if (result[field]) {
					item["controlProps"]["props"] = {
						...item["controlProps"]["props"],
						...result[field]
					}
				}
			})
			const [formState, FormTpl] = Form(updateForm, false)
			PopModal({
				title: "修改数据",
				content: <div>
					<FormTpl />
				</div>,
				onConfirm: async function ({ }, modalState) {
					const { getFormData } = StateManage.get(formState)
					const formData = await getFormData(true)
					const submitData = {}
					for (let key in formData) {
						submitData[key] = formData[key]["value"]
					}
					if (httpConfig.update) {
						Loading.setGlobalLoading(true)
						const result = await httpConfig.update({ formData: submitData, record })
						if (typeof result === "string" || result === false) {
							PopMessage({ type: "error", title: typeof result === "string" ? result : "修改失败" })
						} else if (result === true) {
							PopMessage({ type: "success", title: "修改成功" })
							Service.refreshTable({ tableControlKey, httpConfig, filterSettingControlKey, page: 1 })
							StateManage.set(modalState, { visible: false })
						}
						Loading.setGlobalLoading(false)
					}
				},
				...updateModal
			})
		})
	}
}
