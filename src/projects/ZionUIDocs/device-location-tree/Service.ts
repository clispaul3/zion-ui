/**
 * @description 接口文档：https://www.tapd.cn/54856917/markdown_wikis/?#1154856917001007800
 */
import Http, { IStrategyType, IBaseParams } from "./http"
import Lodash from "lodash"
class Service {
	private defaultAllType: string = "top_0_1_2_3_4_5"
	private type?: string
	private selectType?: string
	private checkedKeys?: string[] = []
	private filter?: any
	private StrategyType: IStrategyType
	private BaseParams: IBaseParams
	private mode?: any

	constructor(props) {
		let {
			type,
			selectType,
			filter,
			deviceMainType = [],
			deviceType = [],
			isHasStrategy,
			strategyType = "1",
			filterCondition = []
		} = props
		if (!type && type !== "") {
			this.type = this.defaultAllType
		} else {
			this.type = type
		}
		if (!selectType && selectType !== "") {
			this.selectType = this.defaultAllType
		} else {
			this.selectType = selectType
		}
		const { mode = {} } = props.treeProps || {}
		const { checkedKeys = [] } = props
		this.mode = mode
		this.checkedKeys = checkedKeys
		this.filter = filter
		this.BaseParams = {
			configFilterCondition: filterCondition,
			deviceMainType,
			deviceType,
			isCloseEncrypt: true
		}
		this.StrategyType = {
			isHasStrategy,
			strategyType
		}
	}
	// 解压数据
	private unzip(b64Data) {
		return b64Data
	}
	// 数据格式转换
	private dataTransform(data, httpType = "init") {
		const prefixIconMap = {
			"0": "buildGroupSvg",
			"1": "buildSvg",
			"2": "floorSvg",
			"3": "areaSvg",
			"4": "pointSvg",
			"5": "deviceSvg"
		}
		const targetType: any = this.type
		const selectType: any = this.selectType
		const checkedKeys: any = this.checkedKeys
		const mapObj = {}
		data.forEach(item => {
			mapObj[item["id"]] = item["id"]
		})
		const checkedKeysMap = {}
		checkedKeys.forEach(key => {
			checkedKeysMap[key] = true
		})
		const result: any = []
		data.forEach(item => {
			const nodeType = item["extraKeyData"]["LocationType"]
			const isChecked = item["extraKeyData"]["isChecked"]
			const obj = {
				...item,
				title: item["name"],
				uiPid: httpType === "init" ? (item.pid || "-1") : item.pid,
				nocheck: selectType.indexOf(nodeType) < 0,
				isParent: nodeType !== "5",
				isLeaf: nodeType == "5",
				type: nodeType,
			}
			if (!mapObj[item["pid"]] && httpType === "init") {        // pid在data中找不到,则将uiPid设为-1，pid保持不变
				obj["uiPid"] = "-1"
			}
			if (checkedKeysMap[item["id"]]) {
				obj["checked"] = true
			}
			if (isChecked) {
				// obj["suffixIcon"] = ["checkSvg"]
			}
			if (targetType.indexOf(nodeType) >= 0) {
				result.push(obj)
			}
		})
		return result
	}
	// 一次性获取全部数据
	async httpGetAllData() {
		const { filter, selectType } = this
		let groupAndBuilding = await Http.getGroupAndBuild(this.StrategyType, this.BaseParams)
		groupAndBuilding = this.unzip(groupAndBuilding)
		const buildingIds: any = []
		groupAndBuilding.forEach(item => {
			if (item["type"] === "1") {
				buildingIds.push(item["id"])
			}
		})
		let floorAndArea = await Http.getFloorAndArea(buildingIds, this.StrategyType, this.BaseParams)
		floorAndArea = this.unzip(floorAndArea)
		const areaIds: any = []
		floorAndArea.forEach(item => {
			const type = item["extraKeyData"] ? item["extraKeyData"]["LocationType"] : "-1"
			if (type === "3") {
				areaIds.push(item["id"])
			}
		})
		let device = await Http.getDeviceByAreaId(areaIds, this.StrategyType, this.BaseParams)
		device = this.unzip(device)
		let originData = this.dataTransform(groupAndBuilding.concat(floorAndArea).concat(device))
		if (originData.length > 0) {
			const topNode = {
				title: "全部",
				id: "-1",
				uiPid: null,
				type: "top",
				nocheck: (selectType as any).indexOf("top") < 0,
				open: true
			}
			originData = originData.concat([topNode])
		}
		if (filter && typeof this.filter === "function") {
			originData = filter(originData)
		}
		return originData
	}
	// 初始化时调用
	async httpInit() {
		const { filter, selectType, checkedKeys = [], mode = {} } = this
		const result = await Http.getGroupAndBuild(this.StrategyType, this.BaseParams)
		let originData = this.unzip(result)
		originData = this.dataTransform(originData)
		if (filter && typeof this.filter === "function") {
			originData = filter(originData)
		}
		if (checkedKeys.length > 0 && mode.isAsync === true) { // 回填的数据量太大可能会有性能问题，初始化有数据时不获取祖先及子孙级数据
			const result = await Http.getNodeParent(checkedKeys, this.StrategyType, this.BaseParams)
			let nodeList = this.unzip(result)
			nodeList = this.dataTransform(nodeList)
			originData = Lodash.uniqBy(originData.concat(nodeList), "id")
		}
		if (originData.length > 0) {
			const topNode = {
				title: "全部",
				id: "-1",
				uiPid: null,
				type: "top",
				nocheck: (selectType as any).indexOf("top") < 0,
				open: true
			}
			originData = originData.concat([topNode])
		}
		return originData
	}
	// 展开时调用
	async httpExpand(data) {
		let type = "2"
		if (data["type"] === "3") {
			type = "5"
		}
		let result
		if (type === "2") {  // 获取建筑物下的楼层和区域
			result = await Http.getFloorAndArea([data["id"]], this.StrategyType, this.BaseParams)
		}
		if (type === "5") {  // 获取区域下的所有设备
			result = await Http.getDeviceByAreaId([data["id"]], this.StrategyType, this.BaseParams)
		}
		let childrenData = this.unzip(result)
		childrenData = this.dataTransform(childrenData, "expand")
		if (this.filter) {
			childrenData = this.filter(childrenData)
		}
		// 展开时如果当前节点勾选，自动勾选其子节点(适用异步加载)
		if (data["checked"]) {
			childrenData.forEach(child => {
				child["checked"] = true
			})
		}
		return childrenData
	}
	// 关键字搜索
	async httpSearch(keyword: string) {
		const result = await Http.getMatchNodeList(keyword, this.StrategyType, this.BaseParams)
		let originData = this.unzip(result)
		originData = this.dataTransform(originData, "search")
		originData = originData.map(item => ({ key: item.id, label: item.name }))
		return originData
	}
	// 点击下拉列表某一项时的回调
	async httpSelect(data) {
		const { key } = data
		const result = await Http.getNodeParent([key], this.StrategyType, this.BaseParams)
		let originData = this.unzip(result)
		originData = this.dataTransform(originData, "select")
		return originData
	}
}

export default Service