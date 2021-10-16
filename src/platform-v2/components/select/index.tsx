import { DataApiService } from "../../service"
import { IBaseSelect, defaultSearchPageSize } from "./interface"
import { StateManage, Select } from "zion-ui"
import { cloneDeep } from "lodash"

export const V2_Select = function (params: IBaseSelect) {
	const value = Array.isArray(params.value) ? params.value : (params.value ? [params.value] : [])
	const {
		mode = "radio",
		dataKey,
		dataLabel,
		tableName,
		fieldName,
		orderBy,
		filterCondition = [],
		props = {},
		searchMatchField,
		filter,
		asyncSearch,
		httpInitTrigger,
		searchPageSize = defaultSearchPageSize
	} = params
	// 数据回填
	const dataCallback = async function ({ pageSize, value = [], filterCondition: searchFilterCondition }: any) {
		let nextFilterCondition: any = []
		if (value.length > 0) {
			nextFilterCondition = [
				[dataKey, "in", "||", value.toString()],
			]
		} else if (searchFilterCondition) {
			nextFilterCondition = searchFilterCondition
		} else {
			nextFilterCondition = cloneDeep(filterCondition)
		}
		const result = await DataApiService.selectData({
			tableName,
			fieldName,
			pageSize: value.length || pageSize || searchPageSize,
			filterCondition: nextFilterCondition,
			orderBy
		})
		let dataSource = result.data.map((item: any) => {
			return {
				...item,
				key: item[dataKey],
				label: item[dataLabel]
			}
		})
		if (filter) {
			dataSource = await filter(dataSource)
		}
		return dataSource
	}
	const nextProps = {
		mode,
		value,
		onFocus: async ({ }, state) => {
			const { dataSource = [] } = StateManage.get(state)
			if (dataSource.length > 0) return
			if (httpInitTrigger === "onFocus" && asyncSearch === false) {
				StateManage.set(state, { loading: true })
				const nextDataSource = await dataCallback({ pageSize: searchPageSize })
				StateManage.set(state, { dataSource: nextDataSource, loading: false })
			}
		},
		didMount: async (state) => {
			if (value.length <= 0 && httpInitTrigger !== "didMount") return
			let reqParams = {}
			if (httpInitTrigger === "didMount" && asyncSearch === false) {
				reqParams = { pageSize: searchPageSize }
			} else if (value.length) {
				if (httpInitTrigger === "onFocus") {
					reqParams = { pageSize: searchPageSize }
				} else {
					reqParams = { value }
				}
			}
			const nextDataSource = await dataCallback(reqParams)
			StateManage.set(state, { dataSource: nextDataSource })
		},
		httpConfig: {
			onSearch: async ({ value }: any, state) => {
				const { value: checkedKeys = [] } = StateManage.get(state)
				let searchFilterCondition = cloneDeep(filterCondition)
				const filterCondition2 = (searchMatchField || [dataLabel]).map(field => [field, "like", "||", value])
				if (checkedKeys.length > 0) {
					filterCondition2.push([dataKey, "in", "||", checkedKeys.toString()])
				}
				if (searchFilterCondition.length) {
					searchFilterCondition.push([
						...filterCondition2,
						"&&"
					])
				} else {
					searchFilterCondition = filterCondition2
				}
				const nextDataSource = await dataCallback({ filterCondition: searchFilterCondition })
				return nextDataSource
			}
		},
		...props
	}
	if (asyncSearch === false && !props.httpConfig?.onSearch) {
		delete nextProps.httpConfig.onSearch
	}
	return Select(nextProps, false)
}