/**
 * @description 基于zTree.js实现
 */
import React from "react"
import { observer } from "mobx-react"
import { Spin, Empty, Drawer, Button, List, Row, Col } from "antd"
import TreeService from "./Service"
import SearchAutoComplete from "./SearchAutoComplete"
import { StateManage } from "../../../service/state"
import { PropertyService } from "../../../service/property"
import "./z-tree/js/jquery.ztree.all"
import { IProps } from "../../../@types/Tree"
import { DeleteOutlined, EnvironmentOutlined } from "@ant-design/icons"

export const Tree = function (props: IProps, bool?: boolean) {
	const treeService = new TreeService(props)
	const Template: any = observer(() => {
		let { loading } = StateManage.get(treeService.treeMobxProps)
		if (loading !== false) {
			loading = true
		}
		const { treeId, footerId, treeContainer } = treeService
		const { allowSearch, maxHeight = 500, height, showFooter, disabled, mode = {} } = treeService.props

		const drawerModalState = PropertyService.getObservableObj({ visible: false })
		const checkedDataList = PropertyService.getObservableObj({ checkedData: [], activedKey: "" })

		const CheckedDataList = observer(function () {
			const { checkedData, activedKey } = StateManage.get(checkedDataList)
			const deleteCheckedData = function (item: any) {
				const nextCheckedData = checkedData.filter((data: any) => data["key"] !== item["key"])
				StateManage.set(checkedDataList, { checkedData: nextCheckedData })
			}
			const setActivedKey = function (item: any) {
				StateManage.set(checkedDataList, { activedKey: activedKey !== item["key"] ? item["key"] : "" })
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
							{!disabled ? <Col span={mode.isRadio === false ? 4 : 3} style={{ textAlign: "left" }}>
								<DeleteOutlined
									style={{ cursor: "pointer", color: "#ff4d4f" }}
									onClick={() => deleteCheckedData(item)} />
								{mode.isRadio === false ?
									<EnvironmentOutlined
										style={{ cursor: "pointer", paddingLeft: "5px", color: "#1890ff", transform: `rotate(${activedKey === item["key"] ? '0deg' : '60deg'})` }}
										onClick={() => setActivedKey(item)}
									/> : null}
							</Col> : null}
							<Col span={mode.isRadio === false ? 20 : 21} style={{ textAlign: "left" }}>
								{item["title"]}
							</Col>
						</Row>
					</List.Item>
				}}
			/>
		})

		const DrawerModal = observer(function () {
			const { visible } = StateManage.get(drawerModalState)
			const onClose = function () {
				const { checkedData, activedKey } = StateManage.get(checkedDataList)
				const checkedKeys = checkedData.map((item: any) => item["key"])
				const { updateCheckedKeys, triggerOnSelectOption } = StateManage.get(treeService.treeMobxProps)
				updateCheckedKeys(checkedKeys, "replace")
				treeService.triggerCallback("onChange")
				if (checkedKeys.length > 0 && activedKey) {
					triggerOnSelectOption(activedKey)
				}
				StateManage.set(drawerModalState, { visible: false })
			}
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

		const showCheckedData = function () {
			const { getCallbackData } = StateManage.get(treeService.treeMobxProps)
			const { checkedData } = getCallbackData()
			const nextCheckedData = checkedData.map((item: any) => {
				return {
					title: item["title"],
					key: item["id"]
				}
			})
			StateManage.set(drawerModalState, { visible: true })
			StateManage.set(checkedDataList, { checkedData: nextCheckedData })
		}
		const heightMapArr = {
			container: [(height || maxHeight) - 10],
			tree: [(height || maxHeight) - 80]
		}
		return <div style={{ maxHeight: heightMapArr.container[0] + "px", overflow: "hidden" }}>
			<Spin spinning={loading} style={{ maxHeight: heightMapArr.container[0] + "px", overflow: "auto", height: height ? heightMapArr.container[0] + "px" : "auto" }}>
				{treeService.renderDisableModal()}
				{allowSearch === false ? null : <SearchAutoComplete mobx={treeService.searchAutoCompleteProps} treeService={treeService} />}
				{(treeService.isEmptyData() && !loading) ? <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="暂无数据" /> :
					<div style={{ maxHeight: heightMapArr.tree[0] + "px", overflow: "auto", height: height ? heightMapArr.tree[0] + "px" : "auto" }} id={treeContainer}>
						<div className="ztree" id={treeId}></div>
						<DrawerModal />
					</div>
				}
				{showFooter ?
					<div style={{ textAlign: "center", borderTop: "1px solid #eee", padding: "5px" }} id={footerId}>
						<Button size="small" type="link" onClick={showCheckedData}>查看选中数据</Button>
					</div> : null}
			</Spin>
		</div>
	})
	if (bool === false) {
		return [treeService.treeMobxProps, Template]
	}
	return Template
}