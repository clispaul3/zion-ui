/**
 * @description 通用基础功能
 */
import React from "react";
import { StateManage } from "../../../../service/state";
import { cloneDeep } from 'lodash';

export const Base = {
	// 获取rowKey
	getRowKey: function (this: any) {
		if (this.rowKey) return this.rowKey
		const { footer, rowKey } = this.getProps()
		this.rowKey = rowKey || footer["key"]
		return this.rowKey
	},
	// 获取属性
	getProps: function (this: any) {
		return StateManage.get(this.mobx)
	},
	// 设置属性
	setProps: function (this: any, nextProps: object) {
		return StateManage.set(this.mobx, nextProps)
	},
	// 渲染禁用遮罩层
	renderDisableModal() {
		const style: any = {
			position: "absolute", zIndex: 2, top: "0px", bottom: "0px", right: "0px", left: "0px",
			background: "#ccc", opacity: 0.2
		}
		return <div style={style}></div>
	},
	// 全屏切换
	toggleFullscreen(this: any, ev: any) {
		ev.stopPropagation()
		const containerId = this.containerId
		const containerTable: any = document.getElementById(containerId)
		if (containerTable && this.fullscreen !== true) {
			containerTable.style = "position:fixed;bottom:0px;left:0px;right:0px;top:0px;z-index:10000;background:#fff"
			this.fullscreen = true
		} else {
			containerTable.style = "position:relative"
			this.fullscreen = false
		}
		// const { clientHeight, clientWidth } = document.body
		// const fullscreenScorll = {
		// 	x: clientWidth - 100,
		// 	y: clientHeight - 200
		// }
		// const { fullscreen } = this.getProps()
		// const scroll = this.initScroll || {}
		// this.setProps({ scroll: !fullscreen ? fullscreenScorll : scroll, fullscreen: !fullscreen })
	},
	// 初始化查询条件
	initDefaultCondition(this: any) {
		const { pagination: { page = 1, pageSize = 10 } } = this.getProps()
		this.updateQueryCondition("filterCondition", "@page", page)
		this.updateQueryCondition("filterCondition", "@pageSize", pageSize)
	},
	// 获取 expandedKeys
	getExpandedKeys(expanded: boolean, record) {
		const { expandedKeys = [] } = this.getProps()
		const rowKey = this.getRowKey()
		if (expanded) {
			return [...expandedKeys, record[rowKey]]
		}
		return expandedKeys.filter(key => key !== record[rowKey])
	}
}