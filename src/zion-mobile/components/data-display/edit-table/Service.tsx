import { StateManage } from "../../../service/state"

class Service {
	private originData = []
	private rowKey = ""
	private tableMobxProps
	private mobxProps
	private searchMapFields
	constructor(props, mobxProps, searchMapFields) {
		this.originData = props.dataSource || []
		this.rowKey = props.rowKey
		this.searchMapFields = searchMapFields || []
		StateManage.set(mobxProps, {
			getDataSource: () => {
				return this.originData
			},
			setDataSource: (originData) => {
				this.originData = originData
				const { data, total } = this.simulateHttp()
				let page = 1
				if (this.tableMobxProps) {
					page = StateManage.get(this.tableMobxProps, "pagination.page") || 1
				}
				StateManage.set(this.tableMobxProps, {
					dataSource: data,
					"pagination.page": page,
					"pagination.total": total,
				})
			},
			updateDataSource: (data: any) => {
				if (Array.isArray(data)) {
					const dataMap = {}
					for (let item in data) {
						dataMap[item["id"]] = item
					}
					for (let i = 0; i < this.originData.length; i++) {
						const key = this.originData[i][this.rowKey]
						if (dataMap[key]) {
							(this.originData as any)[i] = dataMap[key]
						}
					}
				} else {
					for (let i = 0; i < this.originData.length; i++) {
						if (data[this.rowKey] === this.originData[i][this.rowKey]) {
							(this.originData as any)[i] = data
							break
						}
					}
				}
				const { data: dataSource } = this.simulateHttp()
				StateManage.set(this.tableMobxProps, { dataSource })
			},
			deleteData: this.deleteData.bind(this),
			addData: this.addData.bind(this)
		})
		this.mobxProps = mobxProps
	}
	// 获取表格的配置属性，提供给 Table使用
	getTableProps(props, allowEdit?: boolean) {
		const defaultProps = {
			dataSource: [],
			header: {
				show: true,
				searchInput: {
					span: 20,
					placeholder: "输入关键字"
				},
				headerButton: {
					span: allowEdit ? 4 : 0,
					button: [
						{
							text: "批量删除", btnCode: "HEADER_DELETE_BUTTON", onClick: ({ checkedRows }) => {
								const ids = checkedRows.map(item => item[this.rowKey])
								this.deleteData(ids)
							}
						}
					]
				}
			},
			rowSelection: {
				show: true,
				mode: "checkbox"
			},
			pagination: {
				show: true
			},
			buttonConfig: {
				width: "70px",
				rowButton: allowEdit ? [
					{
						text: "删除", btnCode: "ROW_DELETE_BUTTON", onClick: ({ record }) => {
							const ids: any = [record[this.rowKey]]
							this.deleteData(ids)
						}
					}
				] : []
			},
			httpConfig: {
				search: async () => {
					return this.simulateHttp()
				}
			}
		}
		return {
			...defaultProps,
			...props
		}
	}
	setTableMobxProps(mobxProps) {
		this.tableMobxProps = mobxProps
	}
	// 模拟http请求，从oringinData中获取数据
	private simulateHttp = () => {
		let page = 1, pageSize = 10, searchValue = ""
		if (this.tableMobxProps) {
			const { getQueryCondition, pagination = {} } = StateManage.get(this.tableMobxProps)
			if (getQueryCondition) {
				const { filterConditionMap } = getQueryCondition()
				page = StateManage.get(this.tableMobxProps, "pagination.page") || 1
				pageSize = filterConditionMap["@pageSize"]
				searchValue = filterConditionMap["@searchValue"]
			}
			if (pagination.show !== true) {
				pageSize = 9999999999999999999
			}
		}
		let dataSource = [], total = 0
		const start = (page - 1) * pageSize
		const end = page * pageSize
		this.originData.forEach((item, index) => {
			if (searchValue) {
				let itemStrValue = ""
				if (this.searchMapFields.length) {
					this.searchMapFields.forEach(field => {
						itemStrValue += item[field]
					})
				} else {
					Object.keys(item).forEach(key => {
						if (typeof item[key] === "string") {
							itemStrValue += item[key]
						} else if (typeof item[key] == "number") {
							itemStrValue += item[key]
						}
					})
				}
				if (itemStrValue.indexOf(searchValue) >= 0) {
					dataSource.push(item)
					total += 1
				}
			} else {
				if (index >= start && index <= (end - 1)) {
					dataSource.push(item)
				}
				total = this.originData.length
			}
		})
		if (searchValue) {
			dataSource = dataSource.filter((data, index) => index >= start && index <= (end - 1))
		}
		return { data: dataSource, total }
	}
	// 删除数据
	private deleteData(ids: []) {
		const originData = this.originData.filter((data) => ids.includes(data[this.rowKey]) === false)
		const { setDataSource } = StateManage.get(this.mobxProps)
		setDataSource(originData)
	}
	// 添加数据
	private addData({ data, index }) {
		//@ts-ignore
		this.originData.splice(index, 0, data)
		const { data: dataSource, total } = this.simulateHttp()
		StateManage.set(this.tableMobxProps, { dataSource, "pagination.total": total })
	}
}

export default Service