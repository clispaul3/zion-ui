/**
 * @description 基于antd的Tree实现
 * 与 Tree 的区别：
 * 	- 小图标的使用有所区别, prefixIcon、suffixIcon 是一个组件
 * 待完善：
 * 	- 暂不支持拖拽事件，可通过小图标实现拖拽功能
 * 	- 不支持使用Footer展示选中数据
 * 	- 增加 httpConfig.onPressEnter
 */
import React from "react"
import { IProps } from "../../../@types/Tree"
import { Service } from "./Service"
import { StateManage } from "../../../service/state"
import { PropertyService } from "../../../service/property"
import { Tree } from "./Tree"
import SearchAutoComplete from "./SearchAutoComplete"

export const Tree2 = (props: IProps, bool?: boolean): any => {
	const service = new Service(props)
	const { height = 500, positionKey, allowSearch, mode } = props
	const heightMapArr = {
		container: height - 10,
		tree: height - 80
	}
	const Template = () => {
		return <div style={{ maxHeight: heightMapArr.container + "px", overflow: "hidden" }}>
			{allowSearch === false ? null :
				<SearchAutoComplete
					treeId={service.controlKey}
					mode={mode}
					mobx={service.getSearchSelectState()}
					showDataSourceByTree={service.showDataSourceByTree}
				/>}
			<Tree
				service={service}
				height={heightMapArr.tree}
				positionKey={positionKey}
			/>
		</div>
	}
	const state = PropertyService.getObservableObj({
		getCallbackData: service.getCallbackData.bind(service),
		init: service.initTree.bind(service),
		deleteNodes: service.deleteOriginData.bind(service),
		appendNodes: service.appendOriginData.bind(service),
		updateCheckedKeys: service.updateCheckedKeys2.bind(service),
		triggerOnSelectOption: service.triggerOnSelectOption.bind(service),
		expandAll: service.expandAll.bind(service),
		updateTitle: service.updateTitle.bind(service)
	})
	if (props.controlKey) {
		StateManage.addState(props.controlKey, state)
	}
	if (bool === false) {
		return [state, Template]
	}
	if (bool === true) {
		return Template
	}
	return <Template />
} 