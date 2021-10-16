import React, { useEffect, useState, useRef } from "react"
import { Tree as AntdTree, Spin } from "antd"
import { StateManage } from "../../../service/state"
import { observer } from "mobx-react"
import { ACTIONS } from "./config"
import { Empty } from "antd"

export const Tree = (props: { service, height, positionKey }) => {
	const { height, positionKey, service } = props
	const Template = observer(() => {
		const [treeData, setTreeData] = useState([])
		const { expandedKeys, loading, selectedKeys = [] } = StateManage.get(service.controlKey)
		const treeRef = useRef<any>()
		service.treeRef = treeRef
		service.setTreeData = setTreeData
		useEffect(() => {
			StateManage.set(service.controlKey, { loading: true })
			service.initTree().then(() => {
				service.triggerCallback(ACTIONS.didMount)
				if (positionKey) {
					service.triggerOnSelectOption(positionKey)
				}
			})
		}, [])
		return <Spin
			spinning={loading}
			style={{
				maxHeight: height + "px",
				overflow: "auto",
				height: height ? height + "px" : "auto"
			}}>
			{(service.isEmptyData()) ? <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="暂无数据" /> : null}
			<AntdTree
				expandedKeys={expandedKeys}
				ref={treeRef}
				selectedKeys={selectedKeys}
				height={height || 500}
				showIcon={true}
				showLine={true}
				treeData={treeData}
				onExpand={service.onExpand}
				titleRender={service.titleRender}
			// onSelect={service.onSelect}
			/>
		</Spin>
	})
	return <Template />
}