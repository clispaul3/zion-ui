/**
 * @description 表格行相关的功能
 */
import React from "react"
import { Form, Input, Tag, message, Modal, Popconfirm, Menu, Dropdown, Button } from "antd"
import uniqBy from "lodash/uniqBy"
import { btncodeIconMap } from "./TableHeader"
import { DownOutlined } from "@ant-design/icons";

function findData(dataSource, rowKey, value) {
	if (!dataSource) { return; }
	for (const item of dataSource) {
		if (item[rowKey] === value) { return item; }
		const child = findData(item.children, rowKey, value);
		if (child) { return child; }
	}
}

export const RowSelection = {
	rowSelection: function (this: any) {
		const { rowSelection: config, dataSource } = this.getProps()
		const { show } = config || {}
		const rowKey = this.getRowKey()
		if (show === false) return null
		let { mode, checkedKeys = [], onClick, checkedRows = [] } = config || {}
		if (checkedRows.length > 0) {
			checkedKeys = checkedRows.map((item: any) => item[rowKey])
		}
		return {
			type: mode || "checkbox",
			selectedRowKeys: checkedKeys,
			onSelect: (record: any, selected: boolean, selectedRows: any[]) => {
				const key = record[rowKey]
				if (mode === "radio") {
					const nextProps = { checkedKeys: [key], checkedRows: selectedRows, currentRow: record }
					const { checkedTags } = this.renderCheckedUIbyCheckedRows(selectedRows)
					if (onClick) {
						onClick.call(this, { ...nextProps, checkedTags, currentRow: nextProps.currentRow })
					}
				}
				if (mode !== "radio") {
					let { checkedKeys = [], checkedRows = [] } = config
					if (selected) {
						checkedKeys.push(key)
						checkedRows.push(record)
					} else {
						checkedKeys = checkedKeys.filter((item: any) => item !== key)
						checkedRows = checkedRows.filter((item: any) => item[rowKey] !== key)
					}
					const nextProps = { checkedKeys, checkedRows, currentRow: record }
					const { checkedTags } = this.renderCheckedUIbyCheckedRows(checkedRows)
					if (onClick) {
						onClick.call(this, { ...nextProps, checkedTags, currentRow: nextProps.currentRow })
					}
				}
			},
			onSelectAll: (selected: boolean, selectedRows: any[], changeRows: any[]) => {
				let { checkedKeys = [], checkedRows = [] } = config
				if (selected) {
					const selectedKeys = selectedRows.filter(item => item).map(item => item[rowKey])
					checkedKeys = [...checkedKeys, ...selectedKeys]
					checkedRows = [...checkedRows, ...selectedRows]
				} else {
					const changedKeys = changeRows.map(item => item[rowKey])
					checkedKeys = checkedKeys.filter((item: any) => !changedKeys.includes(item))
					checkedRows = checkedRows.filter((item: any) => !changedKeys.includes(item[rowKey]))
				}
				checkedKeys = Array.from(new Set(checkedKeys))
				checkedRows = uniqBy(checkedRows, rowKey)
				const nextProps = { checkedKeys, checkedRows }
				const { checkedTags } = this.renderCheckedUIbyCheckedRows(checkedRows)
				if (onClick) {
					onClick.call(this, { ...nextProps, checkedTags, currentRow: null })
				}
			}
		}
	},
	// 获取行展开功能的配置
	getExpandableConfig: function (this: any) {
		const { expandable: config = {}, columns } = this.getProps()
		const { show } = config || {}
		if (show === false) return false
		const { nestingMode, httpConfig = {}, dataSource } = this.getProps()
		const { onExpand, rowExpandable } = config || {}
		const rowKey = this.getRowKey()
		const resultConfig: any = {
			rowExpandable,
			columnWidth: 30
		}
		// 继承模式
		if (nestingMode === "inherit") {
			resultConfig.onExpand = (expanded: boolean, record: any) => {
				if (httpConfig.onExpand && expanded && !record["children"].length) {
					this.setProps({ loading: true });
					httpConfig.onExpand({ expanded, record }).then((res: any) => {
						const target = findData(dataSource, rowKey, record[rowKey])
						if (target) {
							target.children = res
						}
						const expandedKeys = this.getExpandedKeys(expanded, record)
						this.setProps({ loading: false, dataSource, expandedKeys })
					})
				} else {
					const expandedKeys = this.getExpandedKeys(expanded, record)
					this.setProps({ expandedKeys })
				}
			}
		}
		// 自定义模式
		if (nestingMode === "customer") {
			resultConfig.expandedRowRender = (record: object, index: number, indent: boolean, expanded: boolean) => {
				if (!onExpand) {
					return <div style={{ background: "#eee" }}>
						<Form labelCol={{ span: 6 }} wrapperCol={{ span: 10 }}>
							{Object.keys(record).map(key => {
								const col = columns.filter((item: any) => item.dataIndex === key)[0] || {}
								return <Form.Item key={key}
									label={col["title"] || key}
									style={{ marginBottom: "2px" }}>
									<Input value={record[key]} disabled={true} />
								</Form.Item>
							})}
						</Form>
					</div>
				}
				return onExpand({ record, expanded, index })
			}
			resultConfig.onExpand = (expanded: boolean, record: number) => {
				const expandedKeys = this.getExpandedKeys(expanded, record)
				this.setProps({ expandedKeys })
			}
		}
		return resultConfig
	},
	// 渲染删除按钮，支持行按钮和表头按钮的删除
	renderDeleteTag(this: any, rows: any[], config: any, index?: number) {
		const { httpConfig: { delete: deleteHttp } } = this.getProps()
		let { rowSelection: { checkedRows = [] } } = this.getProps()
		const { onClick, color, text, btnCode = "", icon } = config
		// 表头删除按钮
		if (btnCode.toUpperCase() === "HEADER_DELETE_BUTTON") {
			return <Tag
				key={text}
				// icon={icon || btncodeIconMap[btnCode]}
				style={{ cursor: "pointer", color: color || "#1890ff", background: "#fff", border: "1px solid #fff", fontSize: "14px" }}
				onClick={(ev) => {
					ev.stopPropagation()
					if (checkedRows.length <= 0) {
						message.info("至少选中一条数据")
						return
					}
					Modal.confirm({
						title: "确认删除选中数据?",
						width: "250px",
						cancelText: "取消",
						okButtonProps: { size: "small", type: "primary" },
						cancelButtonProps: { size: "small" },
						okText: "确定",
						onOk: () => {
							if (deleteHttp) {
								this.deleteRows(checkedRows)
							}
							if (onClick) {
								onClick({ checkedRows, btnCode })
							}
						}
					})
				}}>
				{text || "批量删除"}
			</Tag>
		}
		// 行删除按钮
		return <Popconfirm
			key={text}
			title="确认删除?"
			okText="确定"
			cancelText="取消"
			placement="left"
			onCancel={(ev: any) => {
				ev.stopPropagation()
			}}
			onConfirm={(ev: any) => {
				ev.stopPropagation()
				if (deleteHttp) {
					this.deleteRows(rows)
				}
				if (onClick) {
					onClick({ record: rows[0], index, btnCode })
				}
			}}>
			<Button
				type="link"
				key={text}
				style={{ color: color || "#1890ff", position: "relative", left: "-7px" }}
				onClick={(ev) => {
					ev.stopPropagation()
				}}>
				{text || "删除"}
			</Button>
		</Popconfirm>
	},
	// 渲染行按钮
	renderRowButton(this: any, params: { rowButton: any, record: any, index: number }) {
		let { rowButton, record, index } = params
		const { buttonConfig: { maxRowButton = 2 } } = this.getProps()
		rowButton = rowButton.filter(item => {
			if (item["show"] === false) return false
			if (item["isRender"]) {
				return item["isRender"](record) !== false
			}
			return true
		})
		if (rowButton.length <= maxRowButton) {
			return rowButton.map((item: any) => {
				if (item["btnCode"] === "ROW_DELETE_BUTTON") {
					return this.renderDeleteTag.call(this, [record], item, index)
				} else {
					const { btnCode, text, color, onClick, icon } = item
					return <Tag key={text}
						style={{ cursor: "pointer", color: color || "#1890ff", background: "#fff", fontSize: "14px", border: "0 none" }}
						onClick={(ev) => {
							ev.stopPropagation()
							if (onClick) {
								onClick({ record, index, btnCode })
							}
						}}>
						{text || "自定义按钮"}
					</Tag>
				}
			})
		} else {
			const firstButton = rowButton[0]
			const filterButton = rowButton.filter((item, index) => index >= 1)
			return <div>
				<Button type="link"
					style={{ paddingLeft: "6px" }}
					onClick={firstButton["onClick"] && (() => firstButton["onClick"]({ record, index }))}>
					{firstButton["text"]}
				</Button>
				<Dropdown overlay={<Menu>
					{filterButton.map((item: any) => {
						return <Menu.Item key={item.text}>
							{item["btnCode"] === "ROW_DELETE_BUTTON" ? this.renderDeleteTag.call(this, [record], item) : <Button type="link" size="small" onClick={item.onClick && (() => item.onClick({ record, index }))
							}>
								{item.text}
							</Button>
							}
						</Menu.Item >
					})}
				</Menu >}>
					<Button type="link" style={{ paddingLeft: "6px" }}>
						{"更多"}{<DownOutlined />}
					</Button>
				</Dropdown>
			</div>
		}
	},
	// 行点击事件的处理
	onClickRow(this: any, record: any, index: number) {
		let {
			footer = {},
			rowSelection: {
				show, mode = "checkbox", onClick,
				checkedKeys = [], checkedRows = [],
			},
		} = this.getProps()
		const rowKey = this.getRowKey()
		return {
			onClick: (event: any) => {
				const { tagName } = event.target
				if (tagName !== "TD") return
				const key = record[rowKey]
				if (!show) {
					if (onClick) {
						onClick({ checkedKeys: [], checkedRows: [], checkedTags: [], currentRow: record, index })
					}
					return
				}
				if (mode === "radio") {
					checkedKeys = checkedKeys.includes(key) ? [] : [key]
					checkedRows = checkedKeys.length ? [record] : []
				}
				if (mode === "checkbox") {
					if (checkedKeys.includes(key)) {
						checkedKeys = checkedKeys.filter((item: any) => item !== key)
						checkedRows = checkedRows.filter((item: any) => checkedKeys.includes(item[rowKey]))
					} else {
						checkedKeys.push(key)
						checkedRows.push(record)
					}
				}
				const checkedTags = checkedRows.map((item: any) => {
					return {
						key: item[footer.key],
						label: item[footer.label]
					}
				})
				this.setProps({
					"rowSelection.checkedKeys": checkedKeys,
					"rowSelection.checkedRows": checkedRows,
					"rowSelection.checkedTags": footer.show ? checkedTags : []
				})
				if (onClick) {
					onClick({ checkedKeys, checkedRows, checkedTags, currentRow: record, index })
				}
			}
		}
	},
	// 删除数据,走接口删除
	deleteRows(this: any, rows: any[] = []) {
		const { httpConfig = {} } = this.getProps()
		const deleteHttp = httpConfig.delete
		let { rowSelection: { checkedRows = [] } } = this.getProps()
		const rowKey = this.getRowKey()
		const deleteKeys: any = rows.map(item => item[rowKey])
		if (deleteHttp) {
			this.setProps({ loading: true })
			deleteHttp({ checkedRows: rows }).then((res: any) => {
				if (res.result === true) {
					message.success("删除成功")
					checkedRows = checkedRows.filter((item: any) => deleteKeys.includes(item[rowKey]) === false)
					this.renderCheckedUIbyCheckedRows(checkedRows)
				} else {
					message.error(res.message || "删除失败")
				}
				this.setProps({ loading: false })
			})
		}
	},
	// 删除数据，页面删除
	deleteRows2(this: any, rows: []) {
		const rowKey = this.getRowKey()
		const deleteIds = rows.map(item => item[rowKey])
		const { dataSource } = this.getProps()
		const nextDataSource = dataSource.filter((data: any) => deleteIds.find(id => data[rowKey] == id) == null)
		this.setProps({ dataSource: nextDataSource })
	}
}