/**
 * @description 内置增删改查功能的表格组件
 */
import React, { useEffect } from "react"
import { IProps } from "../../../@types/SuperTable"
import { Service } from "./Service"
import { StateManage } from "../../../service/state"
import { PropertyService } from "../../../service/property"
import { Table } from "../../data-display/table"

export const SuperTable = function (props: IProps, bool?: boolean): any {
	const {
		controlKey, tableProps, insertForm,
		insertModal, updateForm, updateModal,
		filterForm, filterModal, httpConfig
	} = props
	const tableControlKey = tableProps.controlKey || ("SuperTable.Table." + Service.guid())
	const insertFormControlKey = insertForm?.controlKey || ("SuperTable.InsertForm." + Service.guid())
	const updateFormControlKey = updateForm?.controlKey || ("SuperTable.UpdateForm." + Service.guid())
	const filterSettingControlKey = filterForm?.controlKey || ("SuperTable.FilterForm." + Service.guid())
	tableProps.controlKey = tableControlKey
	tableProps.httpConfig = {
		init: httpConfig?.init,
		onSearch: async function ({ condition }) {
			return Service.table_onChange({ condition, httpConfig, filterSettingControlKey })
		},
		delete: async function ({ checkedRows }) {
			return Service.deleteData({ checkedRows, httpConfig, tableControlKey, filterSettingControlKey }) as any
		}
	}
	if (insertForm) {
		insertForm.controlKey = insertFormControlKey
	}
	if (updateForm) {
		updateForm.controlKey = updateFormControlKey
	}
	if (httpConfig?.insert) {
		const createBtn = tableProps.header?.headerButton?.button?.find(item => item["btnCode"] === "CREATE_BUTTON")
		if (createBtn) {
			createBtn.onClick = function () {
				Service.insertForm({ insertForm, httpConfig, insertModal, filterSettingControlKey, tableControlKey })
			}
		}
	}
	if (httpConfig?.beforeUpdate) {
		const updateBtn = tableProps.buttonConfig?.rowButton?.find(item => item["btnCode"] === "EDIT_BUTTON")
		if (updateBtn) {
			updateBtn.onClick = function ({ record }) {
				Service.updateData({ record, updateForm, httpConfig, updateModal, updateFormControlKey, tableControlKey, filterSettingControlKey })
			}
		}
	}
	if (filterForm) {
		const filterSetting = tableProps.header?.filterSetting
		filterForm.controlKey = filterSettingControlKey
		if (filterSetting) {
			filterSetting.onClick = function () {
				Service.filterSetting({ filterForm, filterModal, httpConfig, filterSettingControlKey, tableControlKey })
			}
		}
	}

	const [state, Tpl] = Table(tableProps, false)
	const Template = () => {
		useEffect(() => {
			if (controlKey) {
				const mobxState = PropertyService.getObservableObj({
					refresh: function () {
						Service.refreshTable({ tableControlKey, filterSettingControlKey, page: 1, httpConfig })
					}
				})
				StateManage.addState(controlKey, mobxState)
			}
		}, [])
		return <Tpl />
	}
	if (bool === false) {
		return [state, Template]
	}
	if (bool === true) {
		return Template
	}
	return <Template />
}