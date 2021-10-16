import React from "react"
import { StateManage } from "../../../service/state"
import { PropertyService } from "../../../service/property"
import * as allSvgs from "./svg/icons"
import { PopModal } from "../../common/pop-modal"
import { Loading } from "../../common/loading"
import { Tree } from "./"
import $ from "jquery"
import { uniqBy, difference } from "lodash"

class TreeService {
	props: any
	searchAutoCompleteProps: any
	treeMobxProps: any
	treeId: string
	treeContainer: string
	footerId: string
	treeSetting: any
	originData: object[] | [] = []
	originDataMap: object = {}
	zTreeObj: any
	lastSelectedNode: any   // 记录上一次selected的节点
	expanding: boolean
	constructor(props: any) {
		this.props = props
		this.props.mode = props.mode || {}
		this.treeMobxProps = props.mobx || PropertyService.getObservableObj({ loading: true, init: this.init.bind(this) })
		if (props.controlKey) {
			StateManage.addState(props.controlKey, this.treeMobxProps)
		}
		this.treeId = "ztree-id" + (Math.random() * 1000).toFixed(0)
		this.treeContainer = this.treeId + "-container"
		this.footerId = this.treeId + "-footer"
		this.searchAutoCompleteProps = PropertyService.getObservableObj({
			onSearch: this.onSearch.bind(this),
			onSelect: this.onSelectOption.bind(this),
			dataSource: [],
			open: false
		})
		this.expanding = false
		this.init()
	}
	init(callback?: any) {
		const { originData } = this.props
		this.treeSetting = this.getTreeSettiing()
		if (originData) {
			this.initTree(originData, callback)
			return
		}
		const { httpConfig = {} } = this.props
		if (httpConfig.init) {
			StateManage.set(this.treeMobxProps, { loading: true })
			httpConfig.init().then((res: any) => {
				this.initTree(res, callback)
			})
		}
	}
	// 初始化树
	initTree(originData: any, callback: any) {
		this.originData = originData;
		(this.originData || []).forEach((data: any) => {
			this.originDataMap[data.id] = data
		})
		if (this.zTreeObj) {
			this.zTreeObj.destroy(this.treeId)
		}
		// 因为当this.props.originData有值时，ztree还找到treeId对应的DOM
		const timer = setTimeout(() => {
			clearTimeout(timer)
			if (!$("#" + this.treeId)) {
				console.info("未找到元素" + this.treeId)
			}
			this.zTreeObj = ($ as any).fn.zTree.init($("#" + this.treeId), this.treeSetting, this.originData)
			const { positionKey = "" } = this.props
			if (positionKey) {
				this.onSelectOption("init", {
					key: positionKey,
					positionType: positionKey ? "positionKey" : "checkedKey"
				})
			}
			StateManage.set(this.treeMobxProps, {
				getCallbackData: this.getCallbackData.bind(this),
				asyncUpdate: this.asyncUpdate.bind(this),
				eventTrigger: this.eventTrigger.bind(this),
				deleteNodes: this.deleteNodes.bind(this),
				appendNodes: this.appendNodes.bind(this),
				updateCheckedKeys: this.updateCheckedKeys.bind(this),
				triggerOnSelectOption: this.triggerOnSelectOption.bind(this),
				expandAll: this.expandAll.bind(this),
				updateTitle: this.updateTitle.bind(this),
				loading: false
			})
			this.triggerCallback("didMount")
			if (callback) {
				const callbackData = this.getCallbackData()
				callback(callbackData)
			}
		}, 0)
	}
	// 获取属性
	getProps() {
		return StateManage.get(this.props.mobx)
	}
	// 设置属性
	setProps(nextProps: object) {
		return StateManage.set(this.props.mobx, nextProps)
	}
	// 搜索框的值发生变化时
	onSearch(value: string) {
		const { httpConfig = {} } = this.props
		if (!value) {
			StateManage.set(this.searchAutoCompleteProps, { dataSource: [], dataSource2: [], open: false })
			return
		}
		if (httpConfig.search || httpConfig.onSearch) {
			(httpConfig.onSearch || httpConfig.search)(value).then((dataSource: any) => {
				StateManage.set(this.searchAutoCompleteProps, { dataSource, open: true })
			})
			return
		}
		// 本地搜索
		const { dataSource, dataSource2 } = this.localSearch(value)
		StateManage.set(this.searchAutoCompleteProps, { dataSource, dataSource2: uniqBy(dataSource2, "id"), open: true })
	}
	// 根据parentIdList获取没有子节点的父节点
	getTargetParent(parentIdList: string[]) {
		let targetParent
		const parentList = this.zTreeObj.getNodesByFilter((node: any) => parentIdList.indexOf(node["id"]) >= 0)
		for (let node of parentList) {
			if (parentIdList.indexOf(node["id"]) >= 0) {
				if (!node["children"] || node["children"].length <= 0) {
					targetParent = node
					break
				}
			}
		}
		return targetParent
	}
	// 根据pid和originData找到以pid为顶级节点的子孙及数据
	private filterChildrenDataByPid(pid: any, originData: any) {
		const childrenData: any = []
		const childrenIds: any = []
		let length = originData.length
		const deeps = function (id: any, arr: any, length: any) {
			if (length < 1) return
			arr.forEach((item: any) => {
				if (item.uiPid == id && !childrenIds.includes(item.id)) {
					childrenIds.push(item.id)
					childrenData.push(item)
					deeps(item.id, arr, length - 1)
				} else {
					length - 1
				}
			})
		}
		deeps(pid, originData, length)
		return childrenData
	}
	// 选中下拉列表某一项时触发
	onSelectOption(value: any, option: any) {
		const { httpConfig = {}, mode = {} } = this.props
		if (!option) return
		const { key, positionType } = option || {}
		let selectedNode = this.zTreeObj.getNodeByParam("id", key)
		if (!selectedNode && value !== "init" && mode.isAsync === true) {
			// 调接口获取祖先及子孙集数据
			if (httpConfig.select || httpConfig.onSelectOption) {
				(httpConfig.select || httpConfig.onSelectOption)(option).then((originData: any) => {
					const parentIdList = originData.filter((item: any) => item["uiPid"]).map((item: any) => item["uiPid"])
					const targetParent = this.getTargetParent(parentIdList) || {}
					const targetParentId = targetParent["id"]
					const childrenData: any = this.filterChildrenDataByPid(targetParentId, originData);
					(this.originData as any).push(...childrenData);
					this.zTreeObj.addNodes(targetParent, childrenData)
					// 定位指定节点
					selectedNode = this.zTreeObj.getNodeByParam("id", key)
					StateManage.set(this.searchAutoCompleteProps, { open: false })
					if (!selectedNode) return
					const timer = setTimeout(() => {
						clearTimeout(timer)
						this.lastSelectedNode = selectedNode
						this.zTreeObj.checkNode(selectedNode, true, false)
						this.zTreeObj.selectNode(selectedNode, false, false)
						this.triggerCallback("onSelectOption")
					}, 300)
				})
			}
			return
		}
		if (!selectedNode) return
		// 定位指定节点
		this.zTreeObj.selectNode(selectedNode, false, false)
		this.lastSelectedNode = selectedNode
		if (positionType === "checkedKey") {
			this.zTreeObj.checkNode(selectedNode, true, false)
		}
		this.triggerCallback("onSelectOption")
		StateManage.set(this.searchAutoCompleteProps, { open: false })
	}
	// 判断是否没有数据
	isEmptyData = () => {
		const { originData } = this
		if (!originData) return true
		if (originData.length == 0) return true
		return false
	}
	// 触发回调函数
	triggerCallback(eventName: string) {
		const { callbackConfig = {}, mode = {} } = this.props
		const { onState } = callbackConfig
		if (typeof onState === "function") {
			const callbackData = this.getCallbackData()
			onState && onState(callbackData, eventName)
		}
	}
	/**
	 * @description 修改checkbox的半选效果
	 * - 默认交互效果：点击checkbox会父子联动(无半选效果)，点击节点的title父子不联动(无半选效果)
	 * - mode.fatherLinkSon = true: 点击checkbox会父子联动(有半选效果)，点击节点的title父子不联动(有半选效果),
	 * - mode.fatherLinkSon = false: 点击checkbox不会父子联动(无半选效果)，点击节点的title父子不联动(无半选效果),
	*/
	updateCheckStyle() {
		const { mode = {} } = this.props
		if (mode.fatherLinkSon !== true || mode.radioBrothers) {  // 去掉半选效果
			$("span.checkbox_true_part").removeClass("checkbox_true_part").addClass("checkbox_true_full")
		}
	}
	// 整棵树多选，但兄弟节点单选(设备动作树)
	radioBrothers(treeNode: any) {
		const { mode = {} } = this.props
		if (!mode.radioBrothers) return
		const { uiPid, id } = treeNode
		const brothers = this.zTreeObj.getNodesByParam("uiPid", uiPid)
		brothers.forEach((node: any) => {
			if (node["id"] !== id) {
				this.zTreeObj.checkNode(node, false, false)
			}
		})
	}
	// 获取树的配置对象
	getTreeSettiing() {
		const { callbackConfig = {}, mode = {}, draggable, iconCallback = {}, httpConfig = {} } = this.props
		const { onDrop, onDragStart, onDragMove, onDrop2 } = callbackConfig
		const treeSetting = {
			data: {
				key: {
					name: "title",
					children: "children"
				},
				simpleData: {
					enable: true,
					idKey: "id",
					pIdKey: "uiPid",
					rootPId: null
				}
			},
			check: {
				enable: true,
				chkStyle: mode.isRadio === false ? "checkbox" : "radio",
				chkboxType: {
					Y: mode.fatherLinkSon !== false ? "ps" : "",
					N: mode.fatherLinkSon !== false ? "ps" : ""
				},
				radioType: "all"
			},
			view: {
				showIcon: false,
				txtSelectedEnable: true,
				autoCancelSelected: true,
				addDiyDom: (treeId: any, treeNode: any) => {
					const aObj = $("#" + treeNode.tId + "_a")
					const { prefixIcon = [], suffixIcon = [] } = treeNode
					if (prefixIcon.length > 0) {
						let showPrefixIcon = ""
						prefixIcon.forEach((icon: any) => {
							showPrefixIcon += (allSvgs as any)[icon]
						})
						aObj.prepend(showPrefixIcon)
					}
					if (suffixIcon.length > 0) {
						let showSuffixIcon = ""
						suffixIcon.forEach((icon: any) => {
							showSuffixIcon += (allSvgs as any)[icon]
						})
						aObj.append(showSuffixIcon)
					}
				}
			},
			async: {
				// enable: mode.isAsync === true
			},
			edit: {
				drag: {
					isMove: true,
					isCopy: false
				},
				enable: draggable === true,
				showRenameBtn: false,
				showRemoveBtn: false
			},
			callback: {
				beforeExpand: (treeId: any, treeNode: any) => {
					if (treeNode.children && treeNode.children.length > 0) return true
					if (mode.isAsync !== true) {
						return true
					}
					if (mode.isAsync === true && !httpConfig.expand && !httpConfig.onExpand) {
						treeNode["isParent"] = false
						this.zTreeObj.updateNode(treeNode)
						return
					}
					if (this.expanding) {
						return false
					}
					this.expanding = true;
					(httpConfig.onExpand || httpConfig.expand)(treeNode).then((childrenData: any) => {
						(this.originData as any).push(...childrenData)
						this.zTreeObj.addNodes(treeNode, childrenData)
						this.triggerCallback("onExpand")
						this.expanding = false
					}).catch(() => {
						this.expanding = false
					})
					return false
				},
				onExpand: () => {
					this.triggerCallback("onExpand")
				},
				// 点击节点文字触发该事件
				onClick: (event: any, treeId: any, treeNode: any) => {
					const tagName = event.target.tagName
					// 点击小图标，需要做特殊处理
					if (tagName === "svg" || tagName === "path") {
						if (!this.lastSelectedNode) {
							this.zTreeObj.cancelSelectedNode(treeNode)
						} else if (this.lastSelectedNode["id"] !== treeNode["id"]) {
							this.zTreeObj.cancelSelectedNode(treeNode)
							this.zTreeObj.selectNode(this.lastSelectedNode)
						}
						const className = event.target.classList.value
						if (iconCallback[className] && typeof iconCallback[className] === "function") {
							iconCallback[className](treeNode, this.originData, event)
						}
						return
					}
					// 需要展示 checkbox或radio 时，不高亮文字
					if (treeNode.nocheck !== true) {
						this.zTreeObj.cancelSelectedNode(treeNode)
						this.lastSelectedNode = null
						if (mode.isRadio === false) {           // 多选
							this.zTreeObj.checkNode(treeNode, !treeNode.checked, mode.fatherLinkSon === true)
							// this.zTreeObj.checkNode(treeNode, !treeNode.checked, false)
							this.upateHalfCheckToFullCheck(treeNode)
						} else {
							this.zTreeObj.checkNode(treeNode, !treeNode.checked, false)
						}
					} else {
						if (this.lastSelectedNode) {
							if (this.lastSelectedNode["id"] === treeNode["id"]) {
								this.zTreeObj.cancelSelectedNode(treeNode)
								this.lastSelectedNode = null
							} else {
								this.lastSelectedNode = treeNode
							}
						} else {
							this.lastSelectedNode = treeNode
						}
					}
					this.radioBrothers(treeNode)
					this.triggerCallback("onSelect")
				},
				onCheck: (event: any, treeId: any, treeNode: any) => {
					// 处理兄弟节点单选的情况
					this.radioBrothers(treeNode)
					this.triggerCallback("onChange")
				},
				onDrag: (ev, treeId, treeNodes) => {
					onDragStart && onDragStart({ ev, dragNode: treeNodes[0] })
				},
				onDragMove: (ev, treeId, treeNodes) => {
					onDragMove && onDragMove({ ev, dragNode: treeNodes[0] })
				},
				onDrop: (ev, treeId, treeNodes) => {
					onDrop2 && onDrop2({ ev, dragNode: treeNodes[0] })
				},
				beforeDrop: async (treeId: any, treeNodes: any, targetNode: any, moveType: any) => {
					let dropPosition = "inner"
					if (moveType === "prev") {
						dropPosition = "up"
					}
					if (moveType === "next") {
						dropPosition = "down"
					}
					if (onDrop && typeof onDrop === "function") {
						StateManage.set(this.treeMobxProps, { loading: true })
						const result: boolean = await onDrop({
							dragNode: treeNodes[0],
							dropNode: targetNode,
							dropPosition
						})
						StateManage.set(this.treeMobxProps, { loading: false })
						return result
					}
					return false
				}
			}
		}
		return treeSetting
	}
	/**
	 * @description 获取标准的事件回调数据格式
	 * 父id的 check_child_state
	 * -1 无子节点
	 * 0  无子节点勾选
	 * 1  子节点部分勾选
	 * 2  子节点全部勾选 
	 */
	getCallbackData() {
		const { mode = {} } = this.props
		const selectedData = this.zTreeObj.getSelectedNodes()
		const selectedKeys = selectedData.map((item: any) => item["id"])
		let allNodes = this.zTreeObj.getCheckedNodes(true)
		const checkedData: any = []
		const checkedKeys: any = []
		const halfCheckedData: any = []
		const halfCheckedKeys: any = []
		const fatherLinkSon = mode.fatherLinkSon
		allNodes.forEach((node: any) => {
			const { checked } = node.getCheckStatus() || {}
			const check_Child_State = node.check_Child_State
			if (checked && node["nocheck"] !== true) {
				checkedData.push(node)
				checkedKeys.push(node["id"])
			}
			if (fatherLinkSon && check_Child_State === 1) {
				halfCheckedData.push(node)
				halfCheckedKeys.push(node["id"])
			}
		})
		const result = {
			checkedKeys,
			selectedKeys,
			checkedData,
			selectedData,
			originData: this.originData,
		}
		if (mode.fatherLinkSon && mode.isRadio !== true) {
			Object.assign(result, {
				halfCheckedKeys,
				halfCheckedData,
			})
		}
		return result
	}
	/**
	 * @description 将半选效果扭正为全选效果
	 *   1. 适合需要选中节点的场景
	 */
	upateHalfCheckToFullCheck(treeNode: any) {
		const { mode = {} } = this.props
		if (mode.fatherLinkSon !== true) {  // 父子不联动不展示半选效果
			const tId = treeNode.tId
			if (treeNode.checked) {
				$("span#" + tId + "_check").removeClass("checkbox_true_part").addClass("checkbox_true_full")
			} else {
				$("span#" + tId + "_check").removeClass("checkbox_true_full").addClass("checkbox_false_full")
			}
			this.updateCheckStyle()
		}
	}
	/**
	 * @description 异步更新树
	 * @deprecated 已废弃
	 *  1. 为了保证每种模式的扩展性，代码略有冗余
	 * interface IParams:{
	 *     checkedKeys: string[]
	 *     operation: "replace" | "add" | "delete"
	 *     deleteKeys?: string[]
	 * }
	 */
	asyncUpdate(params: any) {
		let { checkedKeys = [], operation = "", deleteKeys = [] } = params
		operation = operation.toLowerCase()
		// 替换所有选中节点
		if (operation === "replace") {
			this.zTreeObj.checkAllNodes(false)
			if (checkedKeys.length <= 0) return
			const checkedKeysMap: any = {}
			checkedKeys.forEach((key: any) => {
				checkedKeysMap[key] = true
			})
			const checkedNodes = this.zTreeObj.getNodesByFilter((node: any) => checkedKeysMap[node["id"]])
			checkedNodes.forEach((node: any) => {
				this.zTreeObj.checkNode(node, true, false)
			})
		}
		// 新增选中
		if (operation === "add") {
			if (checkedKeys.length <= 0) return
			const checkedKeysMap: any = {}
			checkedKeys.forEach((key: any) => {
				checkedKeysMap[key] = true
			})
			const checkedNodes = this.zTreeObj.getNodesByFilter((node: any) => checkedKeysMap[node["id"]])
			checkedNodes.forEach((node: any) => {
				this.zTreeObj.checkNode(node, true, false)
			})
		}
		// 取消选中(此处可能会有性能问题，有两层循环)
		if (operation === "delete") {
			if (checkedKeys.length <= 0) return
			checkedKeys.forEach((key: any) => {
				const node = this.zTreeObj.getNodesByParam("id", key)
				if (node.length > 0) {
					this.zTreeObj.checkNode(node[0], false, false)
				}
			})
		}
		// 删除节点
		if (deleteKeys.length > 0) {
			const delteNodes = this.zTreeObj.getNodesByFilter((node: any) => deleteKeys.includes(node["id"]))
			if (delteNodes.length > 0) {
				delteNodes.forEach((deleteNode: any) => {
					this.zTreeObj.removeNode(deleteNode)
				})
			}
		}

	}
	/**
	 * @description 事件模拟
	 * @deprecated 已废弃
	 *  1. 目前只支持onSelectOption，用于定位到具体的节点
	 * interface IParams {
	 *    eventName: string
	 *    key: string
	 * }
	 */
	eventTrigger(params: any) {
		let { eventName = "", key = "" } = params
		eventName = eventName.toLowerCase()
		if (eventName === "onselectoption") {
			this.onSelectOption("", { key })
		}
	}
	// 渲染禁用遮罩层
	renderDisableModal() {
		const { disabled, showFooter } = this.props
		if (disabled) {
			const style: any = {
				position: "absolute",
				right: "10px", left: "0px", bottom: showFooter ? "40px" : "5px", top: "0px",
				zIndex: 1,
				background: "rgb(238, 238, 238, .3)"
			}
			return <div style={style}></div>
		}
		return null
	}
	/**
	 * @description 根据id获取数据节点
	 * @param ids 
	 */
	private getTreeNodesByIds(ids: string[] = []) {
		const idsMap: any = {}
		ids.forEach(key => {
			idsMap[key] = true
		})
		const targetTreeNodes = this.zTreeObj.getNodesByFilter((node: any) => idsMap[node["id"]])
		return targetTreeNodes
	}
	/**
	 * @description 追加树节点
	 */
	appendNodes(parentId: string, nodes: object[]) {
		const parentNode = this.zTreeObj.getNodeByParam("id", parentId)
		if (parentNode) {
			this.zTreeObj.addNodes(parentNode, nodes)
		} else {
			console.info("未找到父节点：" + parentId)
		}
	}
	/**
	 * @description 删除树节点
	 */
	deleteNodes(ids: string[]) {
		const targetNodes = this.getTreeNodesByIds(ids)
		targetNodes.forEach((treeNode: any) => {
			this.zTreeObj.removeNode(treeNode)
		})
	}
	/**
	 * @description 修改树的选中节点
	 */
	updateCheckedKeys(checkedKeys: string[] = [], operation: "replace" | "add" | "delete") {
		const { mode = {} } = this.props
		// 替换所有选中节点
		if (operation === "replace") {
			this.zTreeObj.checkAllNodes(false)
			if (checkedKeys.length <= 0) {
				if (mode.isRadio !== false) {
					const checkedNodes = this.zTreeObj.getCheckedNodes(true)
					checkedNodes.forEach((node: any) => {
						this.zTreeObj.checkNode(node, false)
					})
				}
				return
			}
			const targetNodes = this.getTreeNodesByIds(checkedKeys)
			targetNodes.forEach((node: any) => {
				this.zTreeObj.checkNode(node, true, false)
			})
		}
		if (checkedKeys.length <= 0) return
		// 新增选中
		if (operation === "add") {
			const targetNodes = this.getTreeNodesByIds(checkedKeys)
			targetNodes.forEach((node: any) => {
				this.zTreeObj.checkNode(node, true, false)
			})
		}
		// 取消选中(此处可能会有性能问题，有两层循环)
		if (operation === "delete") {
			const targetNodes = this.getTreeNodesByIds(checkedKeys)
			targetNodes.forEach((node: any) => {
				this.zTreeObj.checkNode(node, false, false)
			})
		}
	}
	/**
	 * @description 模拟触发定位事件
	 */
	triggerOnSelectOption(id: string) {
		this.onSelectOption("", { key: id })
	}
	/**
	 * @description 切换树的显示隐藏
	 */
	toggleTreeDisplay(showTree?: boolean) {
		const treeContainer = this.treeContainer
		const footerId = this.footerId
		if (showTree) {
			$("#" + treeContainer).show()
			$("#" + footerId).show()
		} else {
			$("#" + treeContainer).hide()
			$("#" + footerId).hide()
		}
	}
	/**
 * @description 展开/收起 全部
 */
	expandAll(bool?: boolean) {
		this.zTreeObj.expandAll(bool)
	}
	/**
	 * @description 修改节点标题
	 */
	updateTitle({ id, title }) {
		const targetNodes = this.getTreeNodesByIds([id])
		targetNodes.forEach((treeNode: any) => {
			treeNode.title = title
			this.zTreeObj.updateNode(treeNode)
		})
	}
	/**
	 * @description 本地关键字模糊搜索
	 */
	localSearch(value: string) {
		const searchResult = this.zTreeObj.getNodesByFilter((node: any) => String(node["title"]).indexOf(value) >= 0)
		const dataSource: any = []
		const dataSource2: any = searchResult.map(item => {
			return {
				...item,
				open: true,
				children: null
			}
		})
		searchResult.forEach((item: any, index: number) => {
			// 只展示匹配到的前100个节点
			if (index < 100) {
				const dataItem: any = { key: item["id"], label: item["title"] }
				let parentNode = this.zTreeObj.getNodesByParam("id", item["uiPid"])
				while (parentNode.length > 0) {
					dataSource2.push({ ...parentNode[0], children: null, open: true, })
					dataItem["label"] = parentNode[0]["title"] + "-" + dataItem["label"]
					parentNode = this.zTreeObj.getNodesByParam("id", parentNode[0]["uiPid"])
				}
				dataSource.push(dataItem)
			}
		})
		return { dataSource: uniqBy(dataSource, "key"), dataSource2: uniqBy(dataSource2, "id") }
	}
	/**
	 * @description 调用接口追加节点
	 */
	async appendNodesByHttpSelect(data: { key: string, label: string }) {
		const { httpConfig = {} } = this.props
		if (httpConfig.select || httpConfig.onSelectOption) {
			const originData = await (httpConfig.select || httpConfig.onSelectOption)(data)
			const parentIdList = originData.filter((item: any) => item["uiPid"]).map((item: any) => item["uiPid"])
			const targetParent = this.getTargetParent(parentIdList) || {}
			const targetParentId = targetParent["id"]
			const childrenData: any = this.filterChildrenDataByPid(targetParentId, originData);
			(this.originData as any).push(...childrenData);
			this.zTreeObj.addNodes(targetParent, childrenData)
		}
	}
	/**
	 * @description 以树的方式展示搜索结果
	 */
	async showDataSourceByTree(value: string) {
		let { dataSource2 = [], dataSource = [] } = StateManage.get(this.searchAutoCompleteProps)
		const { mode = {}, httpConfig = {} } = this.props
		if (dataSource.length <= 0) return
		Loading.setGlobalLoading(true)
		if (mode.isAsync === true && (httpConfig.select || httpConfig.onSelectOption)) {
			const allPromise: any = []
			dataSource.forEach((data, index) => {
				if (index <= 20) {
					allPromise.push(this.appendNodesByHttpSelect({ ...data, dataref: data }))
				}
			})
			await Promise.all(allPromise);
			const result = this.localSearch(value)
			dataSource2 = result.dataSource2
			dataSource = result.dataSource
			Loading.setGlobalLoading(false)
		}
		if (dataSource2.length <= 0) {
			const result = this.localSearch(value)
			dataSource2 = result.dataSource2
		}
		const ids = dataSource2.map(item => item["id"])
		const [state, TreeTpl] = Tree({
			mode: { ...this.props.mode },
			originData: dataSource2,
			height: document.body.clientHeight * 0.7
		}, false)
		Loading.setGlobalLoading(false)
		PopModal({
			title: "匹配结果树",
			height: "70%",
			width: "500px",
			content: <TreeTpl />,
			onOk: ({ }, modalState) => {
				const { getCallbackData } = StateManage.get(state)
				const { checkedKeys = [] } = getCallbackData()
				const { checkedKeys: _checkedKeys = [] } = this.getCallbackData()
				const nocheck = difference(ids, checkedKeys)
				const nextCheckedKeys = [...checkedKeys, ..._checkedKeys].filter(key => nocheck.includes(key) == false)
				this.updateCheckedKeys(nextCheckedKeys, "replace")
				this.triggerOnSelectOption(nextCheckedKeys[0])
				StateManage.set(modalState, { visible: false })
			}
		})
	}
}

export default TreeService