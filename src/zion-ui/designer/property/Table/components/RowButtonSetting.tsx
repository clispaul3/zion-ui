/**
 * @description 行按钮设置
 */
import { PopModal, Table, StateManage, ColorPicker, Input, Select, Row, Col, PopMessage, Utils } from "../../../../"
import React from "react"
import { RiDragMove2Fill } from "react-icons/ri"

export const RowButtonSetting = function (params: { onOk, config: { rowButton, align?, width?} }) {
	const { onOk, config: { rowButton = [], align = "left", width = "140px" } } = params
	const addButton = ({ text }) => {
		const dataSource = StateManage.get(state, "dataSource")
		dataSource.push({
			text,
			$$rowKey: Utils.uuid(),
			color: "#1890ff"
		})
		StateManage.set(state, { dataSource })
	}
	const updateRecordAttr = ({ record, key, value }) => {
		const dataSource = StateManage.get(state, "dataSource")
		dataSource.forEach(item => {
			if (item["$$rowKey"] === record["$$rowKey"]) {
				item[key] = value
			}
		})
		StateManage.set(state, { dataSource })
	}
	const tableProps = {
		bordered: false,
		rowKey: "$$rowKey",
		dataSource: rowButton.map(item => {
			return {
				...item,
				$$rowKey: Utils.uuid()
			}
		}),
		columns: [
			{
				title: "排序",
				width: "56px",
				align: "center",
				render: (text, record, index) => {
					return <span
						draggable={true}
						onDragStart={(ev) => {
							ev.dataTransfer.setData("sort_table_rowButton", JSON.stringify(record))
						}}
						onDragOver={(ev) => ev.preventDefault()}
						onDrop={ev => {
							let data = ev.dataTransfer.getData("sort_table_rowButton")
							data = JSON.parse(data)
							let { dataSource } = StateManage.get(state)
							const dragIndex = dataSource.findIndex(item => item["$$rowKey"] === data["$$rowKey"])
							dataSource = dataSource.filter(item => item["$$rowKey"] !== data["$$rowKey"])
							dataSource.splice(dragIndex >= index ? index + 1 : index, 0, data)
							StateManage.set(state, { dataSource })
						}}
						style={{ cursor: "move", padding: "0px 8px" }} >
						<RiDragMove2Fill />
					</span>
				}
			},
			{
				title: "按钮文字",
				dataIndex: "text",
				render: (text, record) => {
					return <Input
						value={text}
						style={{ width: "80%" }}
						onBlur={({ value }) => {
							updateRecordAttr({ record, key: "text", value })
						}}
					/>
				}
			},
			{
				title: "按钮颜色",
				show: false,
				dataIndex: "color",
				render: (text, record) => {
					return <ColorPicker
						value={text}
						onChange={({ value }) => {
							updateRecordAttr({ record, key: "color", value })
						}}
					/>
				}
			},
			{
				title: "按钮事件",
				dataIndex: "{{onClick}}",
				render: (text, record) => {
					if (record.btnCode === "ROW_DELETE_BUTTON") return null
					return <Input
						disabled={true}
						value={text}
						style={{ width: "80%" }}
						placeholder="配置按钮事件"
						onClick={() => {

						}}
					/>
				}
			},
			{ title: "按钮图标", show: false, dataIndex: "icon" },
			{
				title: "关联显示",
				dataIndex: "isRender",
				render: (text, record) => {
					return <Input
						disabled={true}
						value={text}
						style={{ width: "80%" }}
						placeholder="配置关联显示"
						onClick={() => {
						}}
					/>
				}
			}
		],
		header: {
			show: true,
			title: {
				span: 14,
				content: " "
			},
			headerButton: {
				span: 10,
				button: [
					{ text: "修改", onClick: () => addButton({ text: "修改" }) },
					{ text: "详情", onClick: () => addButton({ text: "详情" }) },
					{ text: "删除", onClick: () => addButton({ text: "删除" }) },
					{ text: "自定义", onClick: () => addButton({ text: "自定义" }) }
				]
			}
		},
		buttonConfig: {
			width: "80px",
			rowButton: [
				{
					text: "删除",
					btnCode: "ROW_DELETE_BUTTON",
					onClick: ({ record }) => {
						let dataSource = StateManage.get(state, "dataSource")
						dataSource = dataSource.filter(data => data["$$rowKey"] != record["$$rowKey"])
						StateManage.set(state, { dataSource })
					}
				}
			]
		}
	}
	const [state, Tpl] = Table(tableProps as any, false)
	const [widthState, WidthTpl] = Input({
		label: "列宽度",
		layout: { labelCol: { span: 6 } },
		placeholder: "如: 140px",
		value: width
	}, false)
	const [alignState, AlignTpl] = Select({
		label: "对齐方式",
		value: align,
		layout: { labelCol: { span: 6 } },
		dataSource: [
			{ key: "left", label: "左对齐" },
			{ key: "right", label: "右对齐" },
			{ key: "center", label: "居中" },
		]
	}, false)
	PopModal({
		title: "设置表格行按钮",
		allowFullScreen: false,
		width: "800px",
		top: "20px",
		height: "400px",
		content: <div>
			<Tpl />
			<Row>
				<Col span={12} style={{ paddingRight: "20px" }}>
					<WidthTpl />
				</Col>
				<Col span={12} >
					<AlignTpl />
				</Col>
			</Row>
		</div>,
		onOk: ({ }, modalState) => {
			const { dataSource } = StateManage.get(state)
			const rowButton = dataSource.map(item => {
				const newItem = {}
				Object.keys(item).forEach(key => {
					if (key !== "$$rowKey") {
						newItem[key] = item[key]
					}
				})
				return newItem
			})
			onOk && onOk({
				config: {
					rowButton,
					align: StateManage.get(alignState, "value"),
					width: StateManage.get(widthState, "value")
				}
			})
			StateManage.set(modalState, { visible: false })
		}
	})
}