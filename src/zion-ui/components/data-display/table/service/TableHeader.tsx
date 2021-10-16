/**
 * @description 表头相关的功能
 */
import React from "react"
import { Row, Col, Input, Tag, Tooltip, Popover } from "antd"
import { SortableHandle } from 'react-sortable-hoc'
import { dragVisibleClassName, defaultAlign, defaultPlaceholder, EAction } from "../../../../@types/Table"
import {
	SettingFilled, PlusOutlined, ExportOutlined,
	ImportOutlined, DeleteOutlined, DownloadOutlined,
	FilterOutlined, SettingOutlined, EditOutlined,
	HeartFilled, FullscreenExitOutlined, FullscreenOutlined,
	MenuOutlined, SyncOutlined
} from "@ant-design/icons"
import { Checkbox } from "../../../data-entry/checkbox"
import { SelectMenu } from "../../../data-entry/select-menu"
import { StateManage } from "../../../../service/state"
import { PopMessage } from "../../../common/pop-message"
import { PopModal } from "../../../common/pop-modal"

export const btncodeIconMap: any = {
	"HEADER_DELETE_BUTTON": <DeleteOutlined />,
	"ROW_DELETE_BUTTON": <DeleteOutlined />,
	"CREATE_BUTTON": <PlusOutlined />,
	"EXPORT_BUTTON": <ImportOutlined />,
	"IMPORT_BUTTON": <ExportOutlined />,
	"DOWNLOAD_BUTTON": <DownloadOutlined />,
	"EDIT_BUTTON": <EditOutlined />,
	"SETTING_BUTTON": <SettingFilled />,
	"HEART_BUTTON": <HeartFilled />
}

export const TableHeader = {
	// 搜索框
	searchInput(this: any, config: any = {}) {
		const { onChange } = this.getProps()
		const searchInput = <Input.Search
			allowClear={true}
			placeholder={config.placeholder || defaultPlaceholder}
			style={{ width: "98%", textAlign: "left" }}
			onChange={ev => {
				const searchValue = ev.target.value
				this.updateQueryCondition("filterCondition", "@searchValue", searchValue)
				const condition = this.getQueryCondition()
				if (onChange && typeof onChange === "function") {
					onChange(condition, "CHANGE_SEARCHVALUE_001")
				}
				this.invokeSearch("CHANGE_SEARCHVALUE_001")
			}}
			onSearch={value => {
				this.setProps({ "pagination.page": 1 })
				this.updateQueryCondition("filterCondition", "@searchValue", value)
				const condition = this.getQueryCondition()
				if (onChange && typeof onChange === "function") {
					onChange(condition, "CHANGE_SEARCHVALUE_002")
				}
				this.invokeSearch("CHANGE_SEARCHVALUE_002")
			}}
		/>
		return searchInput
	},
	// 全屏按钮
	fullscreenButton(this: any) {
		const { fullscreen } = this.getProps()
		return fullscreen ?
			<FullscreenExitOutlined
				onClick={this.toggleFullscreen.bind(this)}
				style={{ cursor: "pointer", fontSize: "20px", fontWeight: 600 }}
			/>
			: <FullscreenOutlined
				onClick={this.toggleFullscreen.bind(this)}
				style={{ cursor: "pointer", fontSize: "20px", fontWeight: 600 }}
			/>
	},
	// 刷新按钮
	refreshButton(this: any) {
		return <SyncOutlined style={{ cursor: "pointer", fontSize: "20px", fontWeight: 600 }} onClick={() => {
			this.invokeSearch(EAction.BUTTON_REFRESH)
		}} />
	},
	// 表头按钮
	headerButton(this: any, { button = [] }: any) {
		const nextButtonList = button.filter(item => item["show"] !== false)
		if (nextButtonList.length <= 2) {
			return nextButtonList.map((item: any) => {
				const { btnCode, text, color, onClick } = item
				if (btnCode && btnCode === "HEADER_DELETE_BUTTON") {
					const { rowSelection: { checkedRows = [] } } = this.getProps()
					return this.renderDeleteTag.call(this, checkedRows, item)
				}
				return <Tag
					// icon={item["icon"] || btncodeIconMap[item["btnCode"]]}
					key={text}
					style={{ cursor: "pointer", color: item["color"] || "#1890ff", background: "#fff", border: `1px solid #fff`, fontSize: "14px" }}
					onClick={(ev) => {
						const { rowSelection: { checkedRows } } = this.getProps()
						ev.stopPropagation()
						if (onClick) {
							onClick.call(this, { checkedRows, btnCode })
						}
					}}>
					{text || "自定义按钮"}
				</Tag>
			})
		} else {
			const firstButton = nextButtonList[0]
			return <div>
				<Tag
					// icon={firstButton["icon"] || btncodeIconMap[firstButton["btnCode"]]}
					key={firstButton}
					style={{ cursor: "pointer", color: firstButton["color"] || "#1890ff", background: "#fff", border: `1px solid #fff`, fontSize: "14px" }}
					onClick={(ev) => {
						const { rowSelection: { checkedRows } } = this.getProps()
						ev.stopPropagation()
						if (firstButton["onClick"]) {
							firstButton["onClick"].call(this, { checkedRows, btnCode: firstButton["btnCode"] })
						}
					}}>
					{firstButton["text"] || "自定义按钮"}
				</Tag>
				<SelectMenu
					text="更多"
					onMenuClick={({ data }, state) => {
						StateManage.set(state, { text: "更多" })
						const { rowSelection: { checkedRows }, httpConfig: { delete: deleteHttp } } = this.getProps()
						if (data["btnCode"] === "HEADER_DELETE_BUTTON") {
							if (checkedRows.length <= 0) {
								PopMessage({ type: "warning", text: "至少选择一条数据" })
								return
							} else {
								PopModal.confirm({
									title: "提示",
									content: "确认删除选中数据?",
									onOk: () => {
										if (deleteHttp) {
											this.deleteRows(checkedRows)
										}
										if (data["onClick"]) {
											data["onClick"].call(this, { checkedRows, btnCode: data["btnCode"] })
										}
									}
								})
								return
							}
						}
						if (data["onClick"]) {
							data["onClick"].call(this, { checkedRows, btnCode: data["btnCode"] })
						}
					}}
					dataSource={nextButtonList.filter((item, index) => index > 0).map(item => {
						return {
							...item,
							key: item["text"] || item["btnCode"],
							label: <span style={{ color: "#1890ff" }}>{item["text"]}</span>
						}
					})}
				/>
			</div>
		}
	},
	// 点击数据过滤按钮，进行数据过滤
	filterSetting(this: any, { onClick }: any) {
		return <Tooltip title="筛选">
			<FilterOutlined style={{ fontSize: "20px", fontWeight: 600 }} onClick={() => onClick(this.props)} />
		</Tooltip>
	},
	// 自定义渲染列
	customerColumnsSetting(this: any) {
		return <Popover title="自定义展示列" placement="bottom" content={this.renderCustomerColumns.call(this)}>
			<SettingOutlined style={{ fontSize: "20px", fontWeight: 600 }} />
		</Popover>
	},
	renderHeader: function (this: any) {
		const { header } = this.getProps()
		const {
			show,
			onlySearch,
			render,
			title,
			searchInput,
			headerButton = {},
			filterSetting
		} = header
		if (!show) return null;
		// 自定义渲染表头
		if (render && typeof render === "function") {
			return render()
		}
		// 仅展示搜索框
		if (onlySearch) {
			return this.searchInput(searchInput)
		}
		const headerConfigMap: any = {
			title: () => title.render ? title.render() : title.content,
			searchInput: () => this.searchInput(searchInput),
			headerButton: () => this.headerButton(headerButton),
			refreshButton: () => this.refreshButton(),
			fullscreenButton: () => this.fullscreenButton(),
			customerColumns: () => this.customerColumnsSetting(),
			filterSetting: () => this.filterSetting({ onClick: filterSetting.onClick })
		}
		return <Row>
			{Object.keys(header).filter(key => ["show", "onlySearch", "render"].includes(key) === false).map(key => {
				return <Col
					key={key}
					span={header[key]["span"]}
					style={{ padding: `${key === "headerButton" ? "1px" : "3px"} 5px 0px 5px`, textAlign: key === "headerButton" ? "right" : "center", lineHeight: "32px" }}>
					{headerConfigMap[key].call(this)}
				</Col>
			})}
		</Row>
	},
	// 渲染自定义展示列
	renderCustomerColumns(this: any) {
		if (!this.customerColumns) return null
		const { columns } = this.getProps()
		const keys = columns.filter((item: any) => item["width"] !== "0px" && item.show !== false).map((item: any) => item["key"] || item["dataIndex"] || item["title"])
		const height = this.customerColumns.length * 50
		const maxHeight = document.body.clientHeight * 0.6
		const CustomerColumns = Checkbox({
			style: {
				[height >= maxHeight ? "maxHeight" : "height"]: (height >= maxHeight ? maxHeight : height) + "px",
				overflow: "auto",
				width: "94%"
			},
			value: keys,
			placement: "vertical",
			dataSource: this.customerColumns.filter((item: any) => item["key"] !== "row-button" && item["key"] !== "row-sort").map((item: any) => {
				return {
					key: item["key"] || item["dataIndex"] || item["title"],
					label: item["title"]
				}
			}),
			onChange: (params: any) => {
				const { value } = params
				const nextColumns = this.customerColumns.filter((item: any) => value.includes(item["key"]) || value.includes(item["dataIndex"]) || value.includes(item["title"]))
				this.setProps({ columns: nextColumns.map((item: any) => ({ ...item, show: true })) })
			}
		}, true)
		return <CustomerColumns />
	},
	// 获取完整的columns
	getNewColumns: function (this: any) {
		let { columns, buttonConfig, allowDragSort } = this.getProps()
		let newColumns = columns.map((col: any, index: number) => {
			const column = {
				...col,
				// key: col["key"] || col["title"] || col["dataIndex"],
				width: col.width,
				align: col.align || defaultAlign,
				sorter: col.sorter || false,
				ellipsis: col.ellipsis === false ? false : true,
			}
			return column
		})
		if (buttonConfig && buttonConfig.rowButton) {
			newColumns = this.getColumnsByButtonConfig(buttonConfig, newColumns)
		}
		if (allowDragSort) {
			const DragHandle = SortableHandle(() => (
				<span style={{ width: "100%", textAlign: "center" }}><MenuOutlined style={{ cursor: 'move', color: '#999' }} /></span>
			));
			newColumns.unshift({
				title: '排序',
				align: defaultAlign,
				width: 50,
				key: "row-sort",
				className: dragVisibleClassName,
				render: () => <DragHandle />,
			})
		}
		return [...newColumns]
	},
	// 根据buttonConfig.rowButton修改columns
	getColumnsByButtonConfig(this: any, buttonConfig: any, prevColumns: any) {
		let { rowButton } = buttonConfig
		const { buttonConfig: { maxRowButton = 1, align = "left", width = 120 } } = this.getProps()
		const nextColumns = [...prevColumns]
		rowButton = rowButton.filter(button => button["show"] !== false)
		if (!Array.isArray(rowButton) || rowButton.length <= 0) return nextColumns
		if (prevColumns.find((item: any) => item["key"] === "row-button")) return prevColumns
		nextColumns.push({
			key: "row-button",
			width,
			title: <span style={{ paddingLeft: "10px" }}>操作</span>,
			fixed: "right",
			align,
			render: (text: any, record: any, index: number) => {
				return this.renderRowButton({ rowButton, record, index })
			}
		})
		return nextColumns
	}
}