import { SelectCascade, StateManage, Input, Tree, PopModal, PopDrawer, PropertyService, Utils } from "zion-ui"
import { DataApiService } from "../../service"
import { IProps } from "./interface"
import React from "react"
import { IObservableObject } from "mobx"
import { ReactNode } from "react"
import { uniqBy } from "lodash"

export const SelectMenuTree = function (params: IProps): [IObservableObject, ReactNode | React.Component | any] {
	let {
		mode = "radio",
		value,
		dataKey,
		dataPid,
		tableName,
		filter,
		fieldName,
		filterCondition,
		orderBy,
		dataLabel,
		title = "请选择",
		props,
		componentType,
		modalType = "PopModal",
		modalProps = {},
		onOk
	} = params
	componentType = mode === "checkbox" ? "Tree" : (componentType || "SelectCascade")
	let radioState, inputState
	let state: IObservableObject = PropertyService.getObservableObj({
		watcher: {
			value: (prev, next) => {
				if (mode == "radio") {
					StateManage.set(radioState, { value: next || "" })
				} else {
					StateManage.set(inputState, { value: next })
				}
			},
			showValue: (prev, next) => {
				if (mode != "radio") {
					StateManage.set(inputState, { showValue: next })
				}
			}
		}
	}), Template
	// 下拉级联
	if (componentType === "SelectCascade") {
		[radioState, Template] = SelectCascade({
			dataSource: [],
			allowSearch: true,
			changeOnSelect: true,
			placeholder: title,
			style: { width: "80%" },
			onChange: (params, inputState) => {
				const { dataSource, value } = StateManage.get(inputState)
				const result: any = dataSource.find((data: any) => data["key"] === value[value.length - 1]) || {}
				StateManage.set(state, {
					value: result[dataKey],
					showValue: result[dataLabel],
					extraData: { checkedData: result }
				})
			},
			httpConfig: {
				init: async () => {
					const response = await DataApiService.selectData({
						tableName,
						fieldName,
						pageSize: 99999,
						filterCondition,
						orderBy
					})
					const dataSource = response.data.map((item: any) => {
						return {
							...item,
							key: item[dataKey],
							label: item[dataLabel],
							uiPid: item[dataPid]
						}
					})
					const result: any = dataSource.find((data: any) => data[dataKey] === (value || "").toString()) || {}
					if (result) {
						StateManage.set(state, { value: result[dataKey], showValue: result[dataLabel], extraData: { checkedData: result } })
						const currentValue = result[dataKey]
						const parents = Utils.getParents(currentValue, dataSource)
						parents.push(currentValue)
						StateManage.set(radioState, { value: parents })
					}
					if (filter) return await filter(dataSource)
					return dataSource
				}
			},
			...props as any
		}, false)
	}
	// 弹窗树
	if (componentType === "Tree") {
		[inputState, Template] = Input({
			placeholder: title,
			onChange: ({ value }) => {
				StateManage.set(state, { value: [], showValue: [], extraData: { checkedData: [] } })
			},
			onClick: function (params, inputState) {
				const value = StateManage.get(inputState, "value")
				const [treeState, TreeTemplate] = Tree({
					height: document.body.clientHeight - (modalType === "PopModal" ? 150 : 80),
					mode: { isRadio: mode === "radio" },
					positionKey: (value || "").split(",")[0],
					showFooter: true,
					httpConfig: {
						init: async () => {
							const result = await DataApiService.selectData({
								tableName,
								fieldName,
								pageSize: 99999,
								orderBy,
								filterCondition
							})
							const dataSource = result.data.map((item: any) => {
								return {
									...item,
									id: item[dataKey],
									title: item[dataLabel],
									uiPid: item[dataPid],
									checked: value.indexOf(item[dataKey]) >= 0,
									// open: !item[dataPid]
								}
							})
							if (filter) return await filter(dataSource)
							return dataSource
						}
					},
					...props as any
				}, false);
				(modalType === "PopDrawer" ? PopDrawer : PopModal)({
					width: "30%",
					height: modalType !== "PopDrawer" ? "80%" : "auto",
					title,
					allowDrag: false,
					top: "40px",
					allowResize: false,
					allowFullScreen: false,
					content: <TreeTemplate />,
					onOk: function (params, modalState) {
						const { getCallbackData } = StateManage.get(treeState)
						let { checkedData } = getCallbackData()
						checkedData = uniqBy(checkedData, dataKey).filter((item: any) => item["id"] !== "-1")
						const codes = checkedData.map((item: any) => item[dataKey])
						const names = checkedData.map((item: any) => item[dataLabel])
						StateManage.set(inputState, { value: codes.join(","), showValue: names.join(","), extraData: {} })
						StateManage.set(state, { value: codes, showValue: names, extraData: { checkedData } })
						StateManage.set(modalState, { visible: false })
						onOk && onOk(checkedData)
					},
					...modalProps as any
				})
			},
			didMount: async function (inputState) {
				if (!value || value.length <= 0) return
				const result = await DataApiService.selectData({
					tableName,
					fieldName,
					pageSize: value.length,
					filterCondition: [
						[dataKey, "in", "||", value.toString()]
					],
					orderBy
				})
				const checkedData = result.data
				const codes = checkedData.map((item: any) => item[dataKey])
				const names = checkedData.map((item: any) => item[dataLabel])
				StateManage.set(inputState, { value: codes.join(","), showValue: names.join(","), extraData: {} })
				StateManage.set(state, { value: codes, showValue: names, extraData: { checkedData } })
			},
			...props as any
		}, false)
	}
	return [state, Template]
}