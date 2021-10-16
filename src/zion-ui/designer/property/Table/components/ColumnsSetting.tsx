/**
 * @description 列配置
 */
import React from "react"
import { PopModal, Table, StateManage, Input, Switch, Select, PopMessage, Utils } from "../../../../"
import { sortBy } from "lodash"
import { RiDragMove2Fill } from "react-icons/ri"

export const ColumnsSetting = async ({ onOk, columns = [] }) => {

	// 新增一列
	const createNewItem = () => {
		return {
			$$rowKey: Utils.uuid(),
			title: "字段名称",
			dataIndex: "field_code$" + (Math.random() * 100).toFixed(0),
			show: true,
			sorter: false,
			width: null,
			fixed: null
		}
	}
	// 修改一条数据的某个字段
	const updateRecordAttr = ({ record, state, key, value }) => {
		const dataSource = StateManage.get(state, "dataSource")
		dataSource.forEach(item => {
			if (item["$$rowKey"] === record["$$rowKey"]) {
				item[key] = value
			}
		})
		StateManage.set(state, { dataSource: sortBy(dataSource, "forceHidden") })
	}
	const dataSource = columns.map((item: any) => {
		return {
			...item,
			$$rowKey: Utils.uuid(),
		}
	})
	const tableProps: any = {
		bordered: false,
		dataSource,
		rowKey: "$$rowKey",
		rowSelection: {
			show: true,
			mode: "checkbox"
		},
		columns: [
			{
				title: "排序",
				width: "56px",
				align: "center",
				dataIndex: "dataIndex",
				render: (text, record, index) => {
					return <span
						draggable={true}
						onDragStart={(ev) => {
							ev.dataTransfer.setData("sort_table_columns", JSON.stringify(record))
						}}
						onDragOver={(ev) => ev.preventDefault()}
						onDrop={ev => {
							let data = ev.dataTransfer.getData("sort_table_columns")
							data = JSON.parse(data)
							let { dataSource } = StateManage.get(state)
							const dragIndex = dataSource.findIndex(item => item["dataIndex"] === data["dataIndex"])
							dataSource = dataSource.filter(item => item["dataIndex"] !== data["dataIndex"])
							dataSource.splice(dragIndex >= index ? index + 1 : index, 0, data)
							StateManage.set(state, { dataSource })
						}}
						style={{ cursor: "move", padding: "0px 8px" }} >
						<RiDragMove2Fill />
					</span>
				}
			},
			{
				title: <span> <i style={{ color: "red", position: "relative", top: "3px" }}>*</i> 字段名称</span>,
				dataIndex: "title",
				render: (text, record) => {
					return <Input
						value={text}
						onBlur={({ value }) => {
							updateRecordAttr({ state, record, key: "title", value })
						}}
						style={{ width: "80%" }}
					/>
				}
			},
			{
				title: "字段编码",
				dataIndex: "dataIndex",
				render: (text, record) => {
					// return text
					return <Input
						value={text}
						// disableOnChange={true}
						onBlur={({ value }) => {
							updateRecordAttr({ state, record, key: "dataIndex", value })
						}}
						style={{ width: "80%" }}
					/>
				}
			},
			{
				title: "列宽",
				width: "150px",
				dataIndex: "width",
				render: (text, record) => {
					return <Input
						onlyInt={true}
						value={text}
						onBlur={({ value }) => {
							updateRecordAttr({ state, record, key: "width", value })
						}}
						placeholder="单位:px"
					// addonAfter="px"
					/>
				}
			},
			{
				title: "默认显示",
				dataIndex: "show",
				width: "120px",
				render: (text, record) => {
					return <Switch
						value={text}
						onChange={({ value }) => {
							updateRecordAttr({ state, record, key: "show", value })
						}}
						unCheckedChildren="否"
						checkedChildren="是"
					/>
				}
			},
			{
				title: "支持排序",
				width: "120px",
				dataIndex: "sorter",
				render: (text, record) => {
					return <Switch
						value={text}
						onChange={({ value }) => {
							updateRecordAttr({ state, record, key: "sorter", value })
						}}
						unCheckedChildren="否"
						checkedChildren="是"
					/>
				}
			},
			{
				title: "冻结列",
				width: "150px",
				dataIndex: "fixed",
				render: (text, record) => {
					return <Select
						value={text}
						allowClear={true}
						onChange={({ value }) => {
							updateRecordAttr({ state, record, key: "fixed", value })
						}}
						dataSource={[
							{ key: "left", label: "左" },
							{ key: "right", label: "右" }
						]}
					/>
				}
			}
		],
		header: {
			show: true,
			title: {
				span: 18,
				content: " "
			},
			headerButton: {
				span: 6,
				button: [
					{
						text: "批量删除",
						show: true,
						btnCode: "HEADER_DELETE_BUTTON"
					}
				]
			}
		},
		httpConfig: {
			delete: async ({ checkedRows }) => {
				const keys = checkedRows.map(row => row["$$rowKey"])
				let dataSource = StateManage.get(state, "dataSource")
				dataSource = dataSource.filter(data => keys.includes(data["$$rowKey"]) == false)
				StateManage.set(state, { dataSource })
				return { result: true }
			}
		},
		buttonConfig: {
			width: "140px",
			rowButton: [
				{
					text: "新增",
					show: true,
					onClick: ({ record, index }) => {
						const dataSource = StateManage.get(state, "dataSource")
						const newItem = createNewItem()
						dataSource.splice(index + 1, 0, newItem)
						StateManage.set(state, { dataSource })
					}
				},
				{
					text: "删除",
					show: true,
					btnCode: "ROW_DELETE_BUTTON"
				}
			]
		}
	}
	const [state, Tpl] = Table(tableProps, false)
	PopModal({
		title: "列配置",
		allowFullScreen: false,
		width: "80%",
		height: "70%",
		content: <Tpl />,
		top: "20px",
		onOk: ({ }, modalState) => {
			const { dataSource } = StateManage.get(state)
			const columns = dataSource.map(item => {
				const newItem = {}
				Object.keys(item).forEach(key => {
					if (key !== "$$rowKey") {
						newItem[key] = item[key]
					}
				})
				return newItem
			})
			onOk && onOk({ columns })
			StateManage.set(modalState, { visible: false })
		}
	})
}