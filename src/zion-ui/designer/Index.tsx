import React from "react"
import { StateManage, PropertyService, Utils } from "../"
import { LayoutDesigner } from "./layout-designer"
import mockData from "./mock/table.json"

export const Designer = function (params: { pageId?, layout?: object }) {
	let { pageId } = params
	if (!pageId) {
		pageId = Utils.getUrlSearchKey("pageId")
	}
	const defaultPageConfig = {
		pageId,                  // 页面id
		controlList: [],         // 变量配置
		functionConfig: [],      // 函数配置
		componentConfig: [],     // 组件配置
		layout: {                // 布局配置
			type: "[[Row]]",
			props: {},
			children: []
		}
	}
	// 默认配置
	const defaultConfig = PropertyService.getObservableObj(mockData || defaultPageConfig)
	StateManage.addState(pageId, defaultConfig)
	const [layoutState, LayoutTpl] = LayoutDesigner({ config: StateManage.get(pageId, "layout"), height: document.body.clientHeight })
	return <div >
		<LayoutTpl />
	</div>
}

