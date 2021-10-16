import { getChildrenData, getLocationByKeyWord, getLocationByNodeId } from "./http"
import Lodash from "lodash"
class Service {
	private checkedKeys?
	private mode?
	private configFilterCondition
	private configOrderBy
	private filterNodeId
	private buildGroup
	private filter
	private selectType
	private type
	private originData
	private fullType

	constructor(props) {
		if (!props) {
			props = {}
		}
		if (!props.treeProps) {
			props.treeProps = {}
		}
		const { mode = {}, originData } = props.treeProps
		const { filterCondition: configFilterCondition = [], orderBy: configOrderBy = [], filterNodeId = [], buildGroup } = props.requestParams || {}
		const { filter, selectType = "", type = "", checkedKeys = [] } = props
		this.checkedKeys = checkedKeys
		this.mode = mode
		this.configFilterCondition = configFilterCondition
		this.configOrderBy = configOrderBy.map(item => {
			return {
				fieldName: item["columnName"],
				sort: item["sort"]
			}
		})
		this.filterNodeId = filterNodeId
		this.buildGroup = buildGroup
		this.filter = filter
		this.selectType = selectType
		this.type = type
		this.originData = originData
		let fullType = (this.type + "_" + this.selectType).split("_")
		fullType = fullType.filter(type => type !== "top")
		this.fullType = Lodash.uniq(fullType).sort().join("_")
	}
	/**
	 * @description 判断是否是父节点
	 */
	private isParent(data) {
		if (!data["hasChild"]) return false
		const nodeType = data.extraKeyData["LocationType"]
		if (this.fullType === "0_1_2_3_4") {
			if (nodeType == "4") return false
			return true
		}
		if (this.fullType === "0_1_2_3") {
			if (nodeType == "3") return false
			return true
		}
		if (this.fullType === "0_1_2") {
			if (nodeType == "2") return false
			return true
		}
		if (this.fullType === "0_1") {
			if (nodeType == "1") return false
			return true
		}
		return true
	}
	/**
	 * @description 数据格式转换
	 * @param params 
	 */
	dataTransform(params) {
		const { data, type: targetType, selectType, checkedKeys = [], httpType = "init" } = params
		const prefixIconMap = {
			"0": "buildGroupSvg",
			"1": "buildSvg",
			"2": "floorSvg",
			"3": "areaSvg",
			"4": "pointSvg"
		}
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
			const nodeType = item.extraKeyData["LocationType"]
			if (targetType.indexOf(nodeType) >= 0) {
				const node = {
					...item,
					uiPid: httpType === "init" ? (item.pid || "-1") : item.pid,
					title: item.name,
					type: nodeType,
					prefixIcon: [prefixIconMap[nodeType + ""]],
					nocheck: selectType.indexOf(nodeType) < 0,
					// isParent: this.isParent(item)
				}
				if (this.fullType !== "0_1" && this.fullType !== "0" && !this.buildGroup) {
					node.isParent = this.isParent(item)
				}
				if (!mapObj[item["pid"]]) {        // pid在data中找不到,则将uiPid设为-1，pid保持不变
					node["uiPid"] = "-1"
				}
				if (checkedKeysMap[item["id"]]) {
					node["checked"] = true
				}
				result.push(node)
			}
		})
		return result
	}
	/**
	 * @description 获取请求参数中type的值
	 * @param httpType 
	 * * reqType: 
	 *   9->查询建筑物分组与建筑物信息与楼层
	 *   10->查询建筑物分组与建筑物信息与楼层与区域
	 *   11->查询建筑物分组与建筑物信息与楼层与区域与点位
	 *   12->查询所有建筑物和建筑物分组
	 *   13->查询建筑物分组和建筑物信息（过滤pid为null的建筑物信息）
	 */
	private getReqType(httpType?: "init" | "search") {
		const { type, buildGroup, mode } = this
		let reqType = 12
		if (type.indexOf("4") >= 0) {
			reqType = 8
		} else if (type.indexOf("3") >= 0) {
			reqType = 10
		} else if (type.indexOf("2") >= 0) {
			reqType = 9
		}
		if (buildGroup) {  // 查询建筑物分组和建筑物信息（过滤pid为null的建筑物信息）
			reqType = 13
		}
		if (type === "top_0" || type === "0") {
			reqType = 0
		}
		if (httpType === "init" && !buildGroup && mode.isAsync === true && reqType !== 0 && reqType !== 13) {
			reqType = 12
		}
		return reqType
	}
	/**
	 * @description 获取所有请求都要带上的参数
	 */
	private getDefaultRequestParams() {
		const reqParams = {
			filterNodeId: this.filterNodeId,
			configFilterCondition: this.configFilterCondition,
			configOrderBy: this.configOrderBy,
		}
		return reqParams
	}
	/**
	 * @description 初始化请求
	 */
	async httpInit() {
		const { type, mode = {}, selectType, checkedKeys, filter, originData: initOriginData } = this
		const reqParams: any = this.getDefaultRequestParams()
		reqParams.type = this.getReqType("init")
		let originData = await getChildrenData(reqParams as any)
		const transformParams = { data: originData, type, selectType, checkedKeys, isAsync: mode.isAsync }
		originData = this.dataTransform(transformParams)
		if (filter && typeof filter === "function") {
			originData = filter((originData), "init")
		}
		if (originData.length <= 0) {
			return []
		}
		if (checkedKeys.length > 0 && !initOriginData && mode.isAsync === true) { // 回填的数据量太大可能会有性能问题，初始化有数据时不获取祖先及子孙级数据
			let nodeList = await getLocationByNodeId({ nodeId: checkedKeys, ...this.getDefaultRequestParams() })
			const params = { data: nodeList, type, selectType, checkedKeys }
			nodeList = this.dataTransform(params)
			originData = Lodash.uniqBy(originData.concat(nodeList), "id")
		}
		if (originData.length > 0) {
			const topNode = { title: "全部", id: "-1", uiPid: null, type: "top", nocheck: selectType.indexOf("top") < 0, open: true }
			originData = originData.concat([topNode])
		}
		return originData
	}
	/**
	 * @description 关键字搜索时的请求
	 * @param value 
	 */
	async httSearch(value: string) {
		const { filter } = this
		const reqParams: any = this.getDefaultRequestParams()
		reqParams.type = this.getReqType()
		reqParams.keyword = value
		let originData = await getLocationByKeyWord(reqParams)
		if (filter && typeof filter === "function") {
			originData = filter((originData), "search")
		}
		return originData.map(item => ({ key: item.id, label: item.name, type: item["type"] }))
	}
	/**
	 * @description 展开节点时的请求
	 */
	async httpExpand(treeNode) {
		const { type, selectType, checkedKeys, filter } = this
		const nodeId = [treeNode["id"]]
		let reqType = 11              // 查建筑物下的区域和楼层和点位
		if (treeNode["type"] == 2) {
			reqType = 3               // 查楼层下的区域
		}
		if (treeNode["type"] == 3) {
			reqType = 4               // 查区域下的点位
		}
		let originData = await getChildrenData({ type: reqType, nodeId, ...this.getDefaultRequestParams() })
		const params = { data: originData, type, selectType, checkedKeys, httpType: "expand" }
		originData = this.dataTransform(params)
		if (filter && typeof filter === "function") {
			originData = filter(originData, "expand")
		}
		if (originData.length <= 0) {
			return []
		}
		return originData
	}
	/**
	 * @description 点击下拉列表某一项时的请求
	 */
	async httpSelect(data) {
		const { dataref: { type, key } } = data
		const reqParams: any = {
			...this.getDefaultRequestParams(),
			nodeId: [key],
			type
		}
		let originData = await getLocationByNodeId(reqParams)
		const params = { data: originData, type: this.type, selectType: this.selectType, checkedKeys: this.checkedKeys, httpType: "select" }
		originData = this.dataTransform(params)
		return originData
	}
}

export default Service