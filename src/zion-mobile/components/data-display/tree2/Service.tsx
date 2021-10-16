import React from "react"
import { Utils } from "../../../utils"
import { Checkbox, Radio } from "antd"
import { StateManage } from "../../../service/state"
import { PropertyService } from "../../../service/property"
import { uniq, uniqBy, cloneDeep } from "lodash"
import { observer } from "mobx-react"
import { ACTIONS } from "./config"
import { PopModal } from "../../common/pop-modal"
import { Tree2 } from "./index"

export class Service {
	controlKey: string = ""
	searchSelectControlKey: string = ""
	state: any
	originData = []
	originDataMap = {}
	httpConfig
	mode
	checkedKeys = []
	checkedKeysMap = {}
	setCheckedKeysMap = {}
	callbackConfig
	iconCallback
	allowSearch: boolean = true
	setTreeData
	treeRef
	disabled
	allowDragType: string[];
	constructor(props) {
		this.controlKey = props.controlKey ? (props.controlKey + "-Tree2") : Utils.uuid()
		this.searchSelectControlKey = this.controlKey + "-searchSelectControlKey"
		const state = PropertyService.getObservableObj({
			selectedKeys: [],
			selectedKeysMap: {},
			expandedKeys: [],
			expandedKeysMap: {},
			checkedKeys: [],
			checkedKeysMap: {},
			loading: false
		})
		StateManage.addState(this.controlKey, state)
		this.originData = props.originData || []
		this.httpConfig = props.httpConfig
		this.mode = props.mode || {}
		this.callbackConfig = props.callbackConfig
		this.iconCallback = props.iconCallback
		this.allowSearch = props.allowSearch
		this.disabled = props.disabled
		this.allowDragType = props.allowDragType || []
	}
	/** 数据格式化 */
	formatOriginData = ({ originData }) => {
		const dataSource: any = []
		const originDataMap: any = {}
		const checkedKeys: any = []
		const expandedKeys: any = []
		originData.forEach(data => {
			const { id } = data
			originDataMap[id] = data
			data["key"] = data["id"]
			dataSource.push(data)
			if (data["checked"]) {
				checkedKeys.push(id)
			}
			if (data["open"]) {
				expandedKeys.push(id)
			}
		})
		originData.forEach((data: any) => {
			const { uiPid } = data
			const parents: any = []
			let parent: any = originDataMap[uiPid]
			while (parent) {
				parents.push(parent)
				parent = originDataMap[parent.uiPid]
			}
			if (parents.length) {
				data["parents"] = parents
			}
		})
		return {
			originData: dataSource,
			originDataMap,
			checkedKeys,
			expandedKeys
		}
	}
	/** 更新checkedKeys 或者 expandedKeys */
	updateCheckedKeysOrExpandedKeys = (type: "checkedKeys" | "expandedKeys", params: Array<{ id: string, bool: boolean }>) => {
		const mode = this.mode
		if (type === "checkedKeys" && mode?.isRadio === true) {
			const data = params[0] || {}
			StateManage.set(this.controlKey, {
				checkedKeys: data["bool"] ? [data.id] : [],
				checkedKeysMap: data["bool"] ? { [data.id]: data.id } : {}
			})
			return
		}
		const targetKeys = StateManage.get(this.controlKey, type)
		const deleteIdMap = {}
		const addKeys: any = []
		const addIdMap = {}
		params.forEach(item => {
			const { id, bool } = item
			if (bool) {
				addKeys.push(id)
				addIdMap[id] = id
			} else {
				deleteIdMap[id] = id
			}
		})
		let nextTargetKeys: any = [...addKeys]
		targetKeys.forEach(key => {
			// if (!deleteIdMap.hasOwnProperty(key) && !addIdMap.hasOwnProperty(key) && this.originDataMap.hasOwnProperty[key]) {
			if (!deleteIdMap.hasOwnProperty(key) && !addIdMap.hasOwnProperty(key)) {
				nextTargetKeys.push(key)
			}
		})
		nextTargetKeys = uniq(nextTargetKeys)
		const targetKeysMap = {}
		nextTargetKeys.forEach(key => {
			targetKeysMap[key] = key
		})
		const key = type === "expandedKeys" ? "expandedKeysMap" : "checkedKeysMap"
		StateManage.set(this.controlKey, { [type]: nextTargetKeys, [key]: targetKeysMap })
	}
	/** 更新checkedKeys */
	updateCheckedKeys = (params: Array<{ id: string, checked: boolean }>) => {
		this.updateCheckedKeysOrExpandedKeys("checkedKeys", params.map(item => ({ id: item.id, bool: item.checked })))
	}
	/** updateCheckedKeys2， 兼容旧版本 */
	updateCheckedKeys2 = (checkedKeys: string[] = [], operation: "replace" | "add" | "delete") => {
		if (operation === "replace") {
			const checkedKeysMap = {}
			checkedKeys.forEach(key => {
				checkedKeysMap[key] = key
			})
			StateManage.set(this.controlKey, { checkedKeys, checkedKeysMap })
		} else if (operation === "add") {
			this.updateCheckedKeys(checkedKeys.map(key => ({ id: key, checked: true })))
		} else if (operation === "delete") {
			this.updateCheckedKeys(checkedKeys.map(key => ({ id: key, checked: false })))
		}
	}
	/** 更新expandedKeys */
	updateExpandedKeys = (params: Array<{ id: string, expanded: boolean }>) => {
		this.updateCheckedKeysOrExpandedKeys("expandedKeys", params.map(item => ({ id: item.id, bool: item.expanded })))
	}
	/** 初始化树 */
	initTree = async (callback?: any) => {
		let originData = this.originData || []
		if (originData.length) {
			this?.setOriginData(originData)
		} else if (this.httpConfig?.init) {
			StateManage.set(this.controlKey, { loading: true })
			originData = await this.httpConfig.init()
			this?.setOriginData(originData)
		}
		StateManage.set(this.controlKey, { loading: false })
		if (callback) {
			const callbackData = this.getCallbackData()
			callback(callbackData)
		}
		return originData
	}
	/** title文字 */
	NodeTitle = ({ nodeData }) => {
		const { title, id } = nodeData
		const disabled = this.disabled
		return <span
			onClick={() => {
				if (disabled) return
				const { checkedKeysMap } = StateManage.get(this.controlKey)
				const checked = checkedKeysMap[id] ? false : true
				this.updateCheckedKeys([{ id, checked }])
				this.onSelect([], { node: { id }, selected: checked })
			}}>
			&nbsp;{title}
		</span>
	}
	/** 多选节点 */
	CheckboxNode = observer(({ nodeData }) => {
		const { id, prefixIcon, suffixIcon } = nodeData
		const { checkedKeysMap } = StateManage.get(this.controlKey)
		const disabled = this.disabled
		const NodeTitle = this.NodeTitle
		const checked = checkedKeysMap.hasOwnProperty(id) ? true : false
		return <div>
			<Checkbox
				checked={checked}
				disabled={disabled}
				onClick={ev => {
					const checked = checkedKeysMap.hasOwnProperty(id) ? false : true
					const children = this.findChildren({ nodeData, children: [] })
					/** 联动子节点 */
					const checkedKeysArr: any = []
					children.forEach(id => {
						checkedKeysArr.push({ id, checked })
					})
					/** 联动父节点 */
					const parents = this.findParents({ nodeData })
					parents.forEach(id => {
						checkedKeysArr.push({ id, checked })
					})
					this.updateCheckedKeys(checkedKeysArr)
					StateManage.set(this.controlKey, {
						selectedKeys: checked ? [id] : [],
						selectedKeysMap: checked ? { id } : {}
					})
					this.triggerCallback(ACTIONS.onChange)
				}}
			/>
			{prefixIcon ? prefixIcon(nodeData) : null}
			<NodeTitle nodeData={nodeData} />
			{suffixIcon ? suffixIcon(nodeData) : null}
		</div>
	})
	/** 单选节点 */
	RadioNode = ({ nodeData }) => {
		const { id, prefixIcon, suffixIcon } = nodeData
		const { checkedKeysMap } = StateManage.get(this.controlKey)
		const checked = checkedKeysMap.hasOwnProperty(id) ? true : false
		const NodeTitle = this.NodeTitle
		const disabled = this.disabled
		return <div style={{ position: "relative" }}>
			<Radio
				disabled={disabled}
				checked={checked}
				onClick={ev => {
					const { checkedKeysMap } = StateManage.get(this.controlKey)
					const checked = checkedKeysMap.hasOwnProperty(id) ? false : true
					this.updateCheckedKeys([{ id, checked }])
					StateManage.set(this.controlKey, {
						selectedKeys: checked ? [id] : [],
						selectedKeysMap: checked ? { id } : {}
					})
					this.triggerCallback(ACTIONS.onChange)
				}}
			/>
			{prefixIcon ? prefixIcon(nodeData) : null}
			<NodeTitle nodeData={nodeData} />
			{suffixIcon ? suffixIcon(nodeData) : null}
		</div>
	}
	/** 渲染单个节点 */
	titleRender = (nodeData) => {
		const { title, nocheck, prefixIcon, suffixIcon } = nodeData
		const NodeTitle = this.NodeTitle
		if (nocheck === true) {
			return <div style={{ position: "relative" }}>
				{prefixIcon ? prefixIcon(nodeData) : null}<NodeTitle nodeData={nodeData} />{suffixIcon ? suffixIcon(nodeData) : null}
			</div>
		}
		const { isRadio } = this.mode
		if (isRadio === false) {
			const CheckboxNode = this.CheckboxNode
			return <CheckboxNode nodeData={nodeData} />
		}
		if (isRadio === true) {
			const RadioNode = this.RadioNode
			return <RadioNode nodeData={nodeData} />
		}
		return <div style={{ position: "relative" }}>
			{prefixIcon ? prefixIcon(nodeData) : null}{title}{suffixIcon ? suffixIcon(nodeData) : null}
		</div>
	}
	/** 找到所有子孙集节点 */
	findChildren = ({ nodeData, children = [] as any }) => {
		if (nodeData.nocheck !== true) {
			children.push(nodeData.id)
		}
		if (nodeData.children && nodeData.children.length) {
			nodeData.children.forEach((child) => {
				if (child.nocheck !== true) {
					children.push(child.id)
				}
				if (child.children) {
					this.findChildren({ nodeData: child, children })
				}
			})
		}
		return children
	}
	/** 找到所有祖先集节点 */
	findParents = ({ nodeData }) => {
		const parents = nodeData["parents"] || []
		return parents.filter(item => item["nocheck"] !== true).map(item => item["id"] || item["key"])
	}
	/** 节点展开事件 */
	onExpand = (expandedKeys, { node, expanded }) => {
		const { id, children = [] } = node
		if (!children?.length) {
			let { mode, httpConfig = {}, originData, originDataMap = {} } = this
			let httpExpand = httpConfig.expand || httpConfig.onExpand
			if (mode.isAsync === true && httpExpand) {
				httpExpand(node).then(dataSource => {
					dataSource.forEach((data) => {
						if (!originDataMap[data.id]) {
							(originData as any).push(data)
						}
					})
					this.setOriginData(originData)
					this.updateExpandedKeys([{ id, expanded }])
				})
			}
		} else {
			this.updateExpandedKeys([{ id, expanded }])
		}
	}
	/** 获取组件的返回值 */
	getCallbackData = () => {
		const { checkedKeys, expandedKeys, selectedKeys } = StateManage.get(this.controlKey)
		const originDataMap = this.originDataMap
		const checkedData: any = []
		const selectedData: any = []
		checkedKeys.forEach(key => {
			checkedData.push(originDataMap[key])
		})
		selectedKeys.forEach(key => {
			selectedData.push(originDataMap[key])
		})

		return {
			checkedKeys,
			checkedData,
			expandedKeys,
			selectedKeys,
			selectedData
		}
	}
	/** onSelect事件, 点击节点文字 */
	onSelect = (selectedKeys, { node, selected }) => {
		const { id } = node
		StateManage.set(this.controlKey, {
			selectedKeys: selected ? [id] : [],
			selectedKeysMap: selected ? { id } : {}
		})
		this.triggerCallback(ACTIONS.onSelect)
	}
	/** 触发事件回调函数 */
	triggerCallback = (action) => {
		const callbackConfig = this.callbackConfig
		if (callbackConfig?.onState) {
			const callbackData = this.getCallbackData()
			callbackConfig?.onState(callbackData, action)
		}
	}
	/** 关键字搜索 */
	onSearch = (value) => {
		if (!value) {
			StateManage.set(this.searchSelectControlKey, { dataSource: [], open: false })
			return
		}
		const { httpConfig } = this
		const searHttp = httpConfig?.search || httpConfig?.onSearch
		/** 接口搜索 */
		if (searHttp) {
			StateManage.set(this.searchSelectControlKey, { loading: true })
			searHttp(value).then(dataSource => {
				StateManage.set(this.searchSelectControlKey, { loading: false, dataSource, open: dataSource?.length ? true : false })
			})
			return
		}
		/** 本地搜索 */
		const filterNodes: any = []
		this.originData.forEach((data: any) => {
			if (filterNodes.length > 100) return
			if (data["title"].indexOf(value) >= 0) {
				let label = data["title"]
				if (data.parents && data.parents.length) {
					data.parents.forEach(parent => {
						label = parent["title"] + "_" + label
					})
				}
				filterNodes.push({ ...data, key: data["id"], label })
			}
		})
		StateManage.set(this.searchSelectControlKey, { dataSource: filterNodes, open: true })
	}
	/** 定位节点事件 */
	onSelectOption = (data) => {
		const { key, dataref } = data
		const { httpConfig, originDataMap, originData } = this
		const selectHttp = httpConfig?.select || httpConfig?.onSelect
		if (selectHttp) {
			StateManage.set(this.searchSelectControlKey, { open: false })
			selectHttp(data).then(dataSource => {
				dataSource.forEach((data) => {
					if (!originDataMap[data.id]) {
						(originData as any).push(data)
					}
				})
				this.setOriginData(originData)
				this.triggerOnSelectOption && this.triggerOnSelectOption(key)
			})
		} else {
			const { parents } = dataref || {}
			let label = data["title"]
			if (parents && parents.length) {
				parents.forEach(parent => {
					label = parent["title"] + "_" + label
				})
			}
			StateManage.set(this.searchSelectControlKey, { open: false })
			this.triggerOnSelectOption && this.triggerOnSelectOption(key)
		}
	}
	/** 获取搜索框的state */
	getSearchSelectState = () => {
		const state = PropertyService.getObservableObj({
			dataSource: [],
			open: false,
			loading: false,
			onSearch: this.onSearch.bind(this),
			onSelect: this.onSelectOption.bind(this)
		})
		StateManage.addState(this.searchSelectControlKey, state)
		return state
	}
	/** 以树的方式展示搜索结果 */
	showDataSourceByTree = async (value) => {
		const { httpConfig } = this
		let dataSource: any = []
		if (httpConfig?.onPressEnter || httpConfig?.pressEnter) {
			const pressEnterHttp = httpConfig?.onPressEnter || httpConfig?.pressEnter
			dataSource = await pressEnterHttp(value)
			const originData: any = [...this.originData]
			dataSource.forEach(data => {
				if (!this.originDataMap[data.id]) {
					originData.push(data)
				}
			})
			this.setOriginData(originData)
		} else {
			this.originData.forEach((data: any) => {
				if (data.title.indexOf(value) >= 0) {
					dataSource.push(data)
					if (data.parents && data.parents.length) {
						data.parents.forEach(parent => {
							dataSource.push(parent)
						})
					}
				}
			})
		}
		dataSource = uniqBy(dataSource, "id")
		if (dataSource.length <= 0) return
		dataSource = cloneDeep(dataSource)
		const { checkedKeysMap } = StateManage.get(this.controlKey)
		dataSource.map(data => {
			const { id } = data
			if (checkedKeysMap[id]) {
				data["checked"] = true
			} else {
				data["checked"] = false
			}
			// 默认展开
			data["open"] = true
		})
		const [state, TreeTpl] = Tree2({
			originData: dataSource,
			mode: { ...this.mode },
			height: document.body.clientHeight * 0.7
		}, false)
		PopModal({
			title: "匹配结果树",
			height: document.body.clientHeight * 0.7 + "px",
			width: "500px",
			content: <TreeTpl />,
			onOk: ({ }, modalState) => {
				const { getCallbackData } = StateManage.get(state)
				const { checkedKeys = [] } = getCallbackData()
				const noCheckedKeys: any = []
				dataSource.forEach(data => {
					const { id } = data
					if (!checkedKeys.find(key => key == id)) {
						noCheckedKeys.push({ id, checked: false })
					}
				})
				this.updateCheckedKeys(checkedKeys.map(key => ({ id: key, checked: true })))
				this.updateCheckedKeys(noCheckedKeys)
				this.triggerOnSelectOption(checkedKeys[0])
				StateManage.set(modalState, { visible: false })
			}
		})
	}
	/** 判断是否没有数据 */
	isEmptyData = () => {
		const { originData } = this
		if (!originData) return true
		if (originData.length == 0) return true
		return false
	}
	/** 定位指定节点 */
	triggerOnSelectOption = (positionKey) => {
		if (!positionKey) return
		if (!this.originDataMap[positionKey]) return
		const nodeData = this.originDataMap[positionKey]
		const parents = nodeData["parents"] || []
		this.updateExpandedKeys(parents.map(parent => ({ id: parent["id"], expanded: true })))
		this.updateCheckedKeys([{ id: positionKey, checked: true }])
		const timer = setTimeout(() => {
			clearTimeout(timer)
			this.treeRef.current.scrollTo({ key: positionKey })
			StateManage.set(this.controlKey, { selectedKeys: [positionKey] })
			this.triggerCallback(ACTIONS.onSelectOption)
		}, 100)
	}
	/** setOriginData，替换整棵树的数据源, originData 需要符合树的数据源格式 */
	setOriginData = (originData) => {
		const { originData: dataSource, checkedKeys, originDataMap, expandedKeys } = this.formatOriginData({ originData })
		this.originData = dataSource
		this.originDataMap = originDataMap
		this.updateCheckedKeys(checkedKeys.map(key => ({ id: key, checked: true })))
		this.updateExpandedKeys(expandedKeys.map(key => ({ id: key, expanded: true })))
		const treeData = Utils.getTreeData(dataSource)
		this.setTreeData(treeData)
	}
	/** deleteOriginData 根据id删除节点 */
	deleteOriginData = (ids: string[]) => {
		let originData = this.originData
		originData = originData.filter((data: any) => ids.includes(data.id) == false)
		this.setOriginData(originData)
	}
	/** appendOriginData, originData 需要符合树的数据源格式 */
	appendOriginData = (originData: object[] = []) => {
		this.originData = this.originData.concat(originData as any)
		this.setOriginData(originData)
	}
	/** 展开/收起全部 */
	expandAll = (bool: boolean) => {
		if (!bool) {
			StateManage.set(this.controlKey, { expandedKeys: [] })
			return
		}
		const originData = this.originData
		const expandedKeys = originData.map(data => data["id"])
		StateManage.set(this.controlKey, { expandedKeys })
		this.triggerCallback(ACTIONS.onExpand)
	}
	/** 更新节点的文字 */
	updateTitle = ({ id, title }) => {
		if (!this.originDataMap[id]) {
			console.info("未找到指定节点")
			return
		}
		let originData = this.originData
		originData.forEach((data: any) => {
			if (data["id"] === id) {
				data["title"] = title
			}
		})
		this.setOriginData(originData)
	}

	/**判断节点是否可拖拽**/
	checkDragable = (node) => {
		return this.allowDragType.includes(node.locationtype)
	}
	/** 内部拖拽放置事件 **/
	onDrop = ({ event, node, dragNode, dragNodesKeys }) => {
		console.debug('拖拽节点！', node, this.originData.findIndex((v: any) => v.id === node.id))
		console.debug('放置节点！', dragNode, this.originData.findIndex((v: any) => v.id === dragNode.id))
		console.debug(this.originData, this.originDataMap)
	}
}
