import { EAction, TriggerHttpSearchAction } from "../../../../@types/Table"

/**
 * @description 数据请求相关
 */
export const QueryCondition = {
	// 初始化请求参数
	getQueryCondition: function (this: any) {
		const filterConditionMap: any = {}
		const orderByMap: any = {}
		const orderByList: string[][] = []
		this.filterCondition.forEach((item: any) => {
			filterConditionMap[item["field"]] = item["value"]
		})
		this.orderBy.forEach((item: any) => {
			if (item["order"]) {
				orderByMap[item["field"]] = item["order"]
				orderByList.push([item["field"], item["order"]])
			}
		})
		const condition = {
			filterCondition: this.filterCondition,
			orderBy: this.orderBy,
			filterConditionMap,
			orderByMap,
			orderByList
		}
		return condition
	},
	// 更新查询条件
	updateQueryCondition(this: any, type: "filterCondition" | "orderBy", field: any, value: any, showValue?: string) {
		if (type.toLowerCase() === "filtercondition") {
			let flag = false
			this.filterCondition.forEach((item: any) => {
				if (item["field"] === field) {
					item["value"] = value
					if (showValue) {
						item["showValue"] = showValue
					}
					flag = true
				}
			})
			if (flag === false) {
				this.filterCondition.push({ field, value })
			}
		}
		if (type.toLowerCase() === "orderby") {
			let flag = false
			this.orderBy = []
			this.orderBy.forEach((item: any) => {
				if (item["field"] === field) {
					item["order"] = value
					flag = true
				}
			})
			if (flag === false) {
				this.orderBy.push({ field, order: value })
			}
		}
		return this.getQueryCondition()
	},
	// 触发更新请求
	invokeSearch(this: any, action: EAction) {
		const { httpConfig = {} } = this.getProps()
		const search = httpConfig.search || httpConfig.onSearch
		if (!search || typeof search !== "function") return
		const searchAction = TriggerHttpSearchAction
		if (searchAction.includes(action)) {
			const { pagination = {} } = this.getProps()
			const currentPage = pagination.page
			this.setProps({ loading: true, "pagination.page": currentPage })
			this.updateQueryCondition("filterCondition", "@page", currentPage)
			search({ condition: this.getQueryCondition(), action }, this.props).then(({ data = [], total = 0 }: any) => {
				this.setProps({
					loading: false,
					dataSource: data,
					"pagination.total": total,
				})
			})
		}
	},
	// 分页、排序、筛选变化时触发, 暂时只支持排序变化的处理，暂时仅支持单字段排序
	onChangeEvent(this: any, pagination: any, filters: any, sorter: any, params: { action: string }) {
		const { action } = params
		if (action === "sort") {
			let { field, order } = sorter
			const { onChange } = this.getProps()
			if (order === "ascend") {
				order = "ASC"
			}
			if (order === "descend") {
				order = "DESC"
			}
			this.updateQueryCondition("orderBy", field, order)
			this.invokeSearch("CHANGE_ORDERBY")
			const condition = this.getQueryCondition()
			if (onChange) {
				onChange(condition, "CHANGE_ORDERBY", this.props)
			}
		}
	}
}