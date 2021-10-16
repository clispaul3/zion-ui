import { Empty, Table, List, Row, Col, Drawer, Spin } from "antd"
import React, { CSSProperties, useEffect } from "react"
import zh_cn from "antd/es/locale/zh_CN"
import { BaseService } from "../../base"
import { EventHandlerParams } from "../../../@types/Base"
import { defaultClassName } from "../../../@types/Table"
import { DragAndResize } from "./service/DragAndResize";
import { IObservableObject } from 'mobx'
import { Base } from "./service/Base"
import { QueryCondition } from "./service/QueryCondition"
import { TableFooter } from "./service/TableFooter"
import { TableHeader } from "./service/TableHeader"
import { RowSelection } from "./service/RowSelection"
import { observer } from 'mobx-react'
import { StateManage } from "../../../service/state"
import { PropertyService } from "../../../service/property"
import { DeleteOutlined } from '@ant-design/icons'
import cloneDeep from "lodash/cloneDeep"

export class Service extends BaseService {
	mobx: IObservableObject
	orderBy: any[]
	filterCondition: any[]
	locale: object
	rowKey: string
	fullscreenStyle: CSSProperties
	initScroll: any
	customerColumns: object[]
	initDefaultCondition: any
	getRowKey: any
	toggleFullscreen: any
	renderDisableModal: any
	getQueryCondition: any
	updateQueryCondition: any
	invokeSearch: any
	onChangeEvent: any
	onClickRow: any
	renderRowButton: any
	renderDeleteTag: any
	deleteRows: any
	rowSelection: any
	getExpandableConfig: any
	getColumnsByButtonConfig: any
	getNewColumns: any
	renderHeader: any
	renderCustomerColumns: any
	renderCheckedUIbyCheckedRows: any
	renderFooter: any
	renderPagination: any
	draggableBodyContainer: any
	draggableBodyRow: any
	ResizeableTitle: any
	drawerModalState: any
	checkedDataList: any
	containerId: string
	// getDataSource: any
	deleteRows2: any
	searchInput: any
	fullscreenButton: any
	refreshButton: any
	headerButton: any
	filterSetting: any
	customerColumnsSetting: any
	getExpandedKeys: any

	constructor(props: any) {
		super(props)
		this.containerId = defaultClassName + "-" + (Math.random() * 100000).toFixed(0)
		this.mobx = props.mobx
		this.orderBy = []
		this.filterCondition = []
		this.rowKey = ""
		this.fullscreenStyle = {
			position: "fixed", zIndex: 1000,
			top: "0px", bottom: "0px", left: "0px", right: "0px",
			background: "#fff"
		}
		this.locale = {
			emptyText: <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="暂无数据" />,
			...zh_cn.Table
		}
		const { scroll } = this.getProps()
		this.initScroll = scroll
		this.customerColumns = []

		this.initDefaultCondition = Base.initDefaultCondition.bind(this)
		this.getProps = Base.getProps.bind(this)
		this.setProps = Base.setProps.bind(this)
		this.getRowKey = Base.getRowKey.bind(this)
		this.toggleFullscreen = Base.toggleFullscreen.bind(this)
		this.renderDisableModal = Base.renderDisableModal.bind(this)
		this.getExpandedKeys = Base.getExpandedKeys.bind(this)
		// this.getDataSource = Base.getDataSource.bind(this)

		this.getQueryCondition = QueryCondition.getQueryCondition.bind(this)
		this.updateQueryCondition = QueryCondition.updateQueryCondition.bind(this)
		this.invokeSearch = QueryCondition.invokeSearch.bind(this)
		this.onChangeEvent = QueryCondition.onChangeEvent.bind(this)

		this.onClickRow = RowSelection.onClickRow.bind(this)
		this.renderRowButton = RowSelection.renderRowButton.bind(this)
		this.renderDeleteTag = RowSelection.renderDeleteTag.bind(this)
		this.deleteRows = RowSelection.deleteRows.bind(this)
		this.renderDeleteTag = RowSelection.renderDeleteTag.bind(this)
		this.rowSelection = RowSelection.rowSelection.bind(this)
		this.getExpandableConfig = RowSelection.getExpandableConfig.bind(this)
		this.deleteRows2 = RowSelection.deleteRows2.bind(this)

		this.getColumnsByButtonConfig = TableHeader.getColumnsByButtonConfig.bind(this)
		this.getNewColumns = TableHeader.getNewColumns.bind(this)
		this.renderHeader = TableHeader.renderHeader.bind(this)
		this.renderCustomerColumns = TableHeader.renderCustomerColumns.bind(this)
		this.searchInput = TableHeader.searchInput.bind(this)
		this.fullscreenButton = TableHeader.fullscreenButton.bind(this)
		this.refreshButton = TableHeader.refreshButton.bind(this)
		this.headerButton = TableHeader.headerButton.bind(this)
		this.filterSetting = TableHeader.filterSetting.bind(this)
		this.customerColumnsSetting = TableHeader.customerColumnsSetting.bind(this)

		this.renderCheckedUIbyCheckedRows = TableFooter.renderCheckedUIbyCheckedRows.bind(this)
		this.renderFooter = TableFooter.renderFooter.bind(this)
		this.renderPagination = TableFooter.renderPagination.bind(this)

		this.draggableBodyContainer = DragAndResize.draggableBodyContainer.bind(this)
		this.draggableBodyRow = DragAndResize.draggableBodyRow.bind(this)
		this.ResizeableTitle = DragAndResize.ResizeableTitle.bind(this)

		this.drawerModalState = PropertyService.getObservableObj({ visible: false })
		this.checkedDataList = PropertyService.getObservableObj({ checkedData: [] })
	}
	/**
	 * @description 获取类名
	 */
	getClassName() {
		const { className } = this.getProps()
		let nextClassName = super.getClassName(defaultClassName)
		if (className) {
			nextClassName.push(className)
		}
		return nextClassName
	}
	/**
	 * @description 事件处理
	 */
	eventHandler(params: EventHandlerParams) { }
	/**
	 * @description 已列表方式展示选中数据
	 */
	showCheckedDataList(this: any) {
		const { footer = {} } = this.getProps()
		if (footer.show !== true) return
		const rowKey = this.getRowKey()
		const self = this
		const drawerModalState = this.drawerModalState
		const checkedDataList = this.checkedDataList
		const CheckedDataList = observer(function () {
			const { checkedData } = StateManage.get(checkedDataList)
			const deleteCheckedData = function (item: any) {
				const nextCheckedData = checkedData.filter((data: any) => data[rowKey] !== item[rowKey])
				StateManage.set(checkedDataList, { checkedData: nextCheckedData })
			}
			return <List
				dataSource={checkedData}
				locale={{
					emptyText: <Empty
						image={Empty.PRESENTED_IMAGE_SIMPLE} description="暂无数据" />
				}}
				renderItem={(item: any) => {
					return <List.Item>
						<Row style={{ width: "100%" }}>
							<Col span={3} style={{ textAlign: "left" }}>
								<DeleteOutlined
									style={{ cursor: "pointer", color: "#ff4d4f" }}
									onClick={() => deleteCheckedData(item)} />
							</Col>
							<Col span={21} style={{ textAlign: "left" }}>
								{footer.render ? footer.render({ record: item }) : item[footer.label]}
							</Col>
						</Row>
					</List.Item>
				}}
			/>
		})

		const DrawerModal = observer(function () {
			const { visible } = StateManage.get(drawerModalState)
			const { checkedData } = StateManage.get(checkedDataList)
			const onClose = function () {
				StateManage.set(drawerModalState, { visible: false })
				self.renderCheckedUIbyCheckedRows(checkedData)
			}
			if (!visible) return null
			return <Drawer
				visible={visible}
				placement="left"
				getContainer={false}
				onClose={onClose}
				style={{ position: 'absolute' }} closable={false}
			>
				<CheckedDataList />
			</Drawer>
		})
		return <DrawerModal />
	}

	/**
	 * @description 获取组件模板
	 */
	getTemplate() {
		let {
			showHeader, className, scroll = {}, size, show, expandedKeys,
			bordered, loading, disabled, fullscreen, dataSource
		} = this.getProps()
		useEffect(() => {
			this.customerColumns = cloneDeep(this.getNewColumns())
			const { httpConfig, footer: { label, key } } = this.getProps()
			const { rowSelection: { checkedKeys = [] } } = this.getProps()
			const { init } = httpConfig
			const rowKey = this.getRowKey()
			// 初始化
			this.initDefaultCondition()
			this.setProps({ getQueryCondition: this.getQueryCondition.bind(this) })
			if (init && typeof init === "function") {
				this.setProps({ loading: true })
				init({ checkedKeys, rowKey }).then(({ data, total, checkedRows = [] }) => {
					const checkedTags = checkedRows.map(row => ({ key, label: row[label] }))
					const realCheckedKeys = checkedRows.map(row => row[rowKey])
					this.setProps({
						"rowSelection.checkedKeys": realCheckedKeys,
						"rowSelection.checkedRows": checkedRows,
						"rowSelection.checkedTags": checkedTags,
						dataSource: data,
						loading: false,
						"pagination.total": total || 0,
						"pagination.page": 1
					})
				})
			}
		}, [])
		if (!show) return null
		className = this.getClassName()
		return <div className={className.join(" ")} id={this.containerId}
			style={fullscreen ? this.fullscreenStyle : { position: "relative" }}>
			{disabled === true ? this.renderDisableModal() : null}
			<Spin spinning={false}>
				<Table
					dataSource={dataSource}
					columns={this.getNewColumns().filter((column: any) => column.show !== false)}
					rowKey={this.getRowKey()}
					loading={loading}
					pagination={this.renderPagination()}
					onChange={this.onChangeEvent.bind(this)}
					rowSelection={this.rowSelection.call(this) as any}
					scroll={{ ...scroll, scrollToFirstRowOnChange: scroll.isToTop === false ? false : true }}
					size={size}
					locale={this.locale}
					bordered={bordered}
					components={{
						// body: {
						// 	wrapper: this.draggableBodyContainer.bind(this),
						// 	row: this.draggableBodyRow.bind(this),
						// },
						// header: {
						// 	cell: this.ResizeableTitle,
						// }
					}}
					onRow={this.onClickRow.bind(this)}
					showHeader={showHeader}
					expandable={this.getExpandableConfig.call(this)}
					title={this.renderHeader.bind(this)}
					footer={this.renderFooter.bind(this)}
					expandedRowKeys={expandedKeys}
				/>
				{this.showCheckedDataList.call(this)}
			</Spin>
		</div>
	}
}