/**
 * @description footer、pagination
 */
import React from "react";
import zh_cn from "antd/es/locale/zh_CN";
import { Tag } from "antd";
import { StateManage } from "../../../../service/state";

export const TableFooter = {
	// 渲染分页器
	renderPagination: function (this: any) {
		const { pagination: config } = this.getProps()
		const { show } = config || {}
		if (show === false) return false
		const { page = 1, pageSize = 10, total = 0, isAsync,
			showQuickJumper, showTotal, showSizeChanger, simple } = config || {}
		const { onChange } = this.getProps()
		return {
			total, current: page,
			pageSize,
			locale: zh_cn.Pagination,
			simple,
			showQuickJumper: showQuickJumper === false ? false : true,
			showTotal: (total: number) => {
				if (showTotal === false) return null
				if (typeof showTotal === "string") return showTotal
				const totalPage = Math.ceil(total / pageSize)
				return `共${totalPage}页，${total}条记录`
			},
			showSizeChanger: showSizeChanger === false ? false : true,
			pageSizeOptions: showSizeChanger !== false ? ["10", "20", "30", "40", "50", "100"] : [],
			onChange: (page: number, pageSize: number) => {
				const { pagination: { pageSize: prevPageSize = 10 } } = this.getProps()
				const action = pageSize !== prevPageSize ? "CHANGE_PAGESIZE" : "CHANGE_PAGE"
				const nextPage = pageSize === prevPageSize ? page : 1
				this.setProps({ "pagination.page": nextPage, "pagination.pageSize": pageSize })
				this.updateQueryCondition("filterCondition", "@page", nextPage)
				this.updateQueryCondition("filterCondition", "@pageSize", pageSize)
				const condition = this.getQueryCondition()
				if (onChange) {
					onChange(condition, action, this.props)
				}
				if (isAsync === false) return
				this.invokeSearch(action)
			}
		}
	},
	// 根据checkedRows渲染选中行的UI效果
	renderCheckedUIbyCheckedRows(this: any, checkedRows: any) {
		checkedRows = checkedRows.filter((item: any) => item)
		const rowKey = this.getRowKey()
		const { footer: { label } } = this.getProps()
		const checkedKeys = checkedRows.map((row: any) => row[rowKey])
		const checkedTags = checkedRows.map((item: any) => {
			return {
				key: item[rowKey],
				label: item[label]
			}
		})
		this.setProps({
			"rowSelection.checkedKeys": checkedKeys,
			"rowSelection.checkedRows": checkedRows,
			"rowSelection.checkedTags": checkedTags
		})
		return {
			checkedRows, checkedKeys, checkedTags
		}
	},
	// 展示选中数据
	renderFooter: function (this: any) {
		const { footer = {} } = this.getProps()
		if (typeof footer === "function") return footer()
		const rowKey = this.getRowKey()
		if (!footer.show) return null
		let { rowSelection: { checkedTags = [], checkedKeys, checkedRows, onClick } } = this.getProps()
		if (checkedTags.length === 0) return null
		return <div
			style={{ maxHeight: "50px", overflow: "auto" }}>
			{checkedRows.length > 0 ? <Tag color="red" style={{ cursor: "pointer" }}
				onClick={() => {
					this.renderCheckedUIbyCheckedRows([])
					if (onClick) {
						onClick({ checkedRows: [], checkedKeys: [], checkedTags: [] })
					}
				}}>清空</Tag> : null}
			{((footer.allowShowList || footer.show) && checkedRows.length > 0) ? <Tag color="#1890ff" style={{ cursor: "pointer" }}
				onClick={() => {
					StateManage.set(this.drawerModalState, { visible: true })
					StateManage.set(this.checkedDataList, { checkedData: checkedRows })
				}}>已选择<span style={{ padding: "0px 3px", color: "#fff" }}>{checkedRows.length}</span>项</Tag> : null}
			{/* {checkedRows.map((item: any) => {
				return <Tag color="#2db7f5" key={item[rowKey]} style={{ marginBottom: "5px" }}
					onClose={() => {
						checkedRows = checkedRows.filter((data: any) => data[rowKey] !== item[rowKey])
						this.renderCheckedUIbyCheckedRows(checkedRows)
						if (onClick) {
							onClick({ checkedRows, checkedKeys, checkedTags })
						}
					}}
					closable={true}>
					{footer.render ? footer.render({ record: item }) : item[footer.label]}
				</Tag>
			})} */}
		</div>
	}
}