import { DataApiService } from "v2"

enum ELocationType {
	"buildingGroupAndBuilding" = "0",   // 查询具有设备的建筑物信息分组和pid为空的建筑物信息
	"Building" = "1",                   // 查询具有设备的建筑物信息 1
	"floorAndArea" = "2",               // 查询具有设备的楼层和区域 
	"area" = "3",                       // 查询具有设备的区域
	"device" = "5"                      // 查询设备信息
}

export interface IBaseParams {
	deviceMainType?: string[]      // 设备大类
	deviceType?: string[]          // 设备小类
	configFilterCondition?: []     // 数据过滤条件，与 showTableData 保持一致
	isCloseEncrypt: boolean        // 是否关闭压缩
}

export interface IStrategyType {
	isHasStrategy?: boolean            // 是否查询具有策略配置信息
	strategyType: string               // 策略类型  1是单源，2是组合
}

const Http = {
	// 获取建筑物和建筑物分组 
	async getGroupAndBuild(strategyType: IStrategyType, baseParams: IBaseParams) {
		const result = await DataApiService.request({
			url: "api/restApi/locationDevice/getChildData",
			method: "POST",
			data: {
				type: "0",
				...strategyType,
				...baseParams,
				isHasStrategy: strategyType.isHasStrategy === false ? false : true
			}
		})
		return result
	},
	// 获取楼层和区域
	async getFloorAndArea(nodeId: string[], strategyType: IStrategyType, baseParams: IBaseParams) {
		const result = await DataApiService.request({
			url: "api/restApi/locationDevice/getChildData",
			method: "POST",
			data: {
				type: "2",
				nodeId,
				...baseParams,
				...strategyType,
				// isHasStrategy: strategyType.isHasStrategy === false ? false : true
			}
		})
		return result
	},
	// 获取区域下的设备
	async getDeviceByAreaId(nodeId: string[], strategyType: IStrategyType, baseParams: IBaseParams) {
		const result = await DataApiService.request({
			url: "api/restApi/locationDevice/getChildData",
			method: "POST",
			data: {
				type: "5",
				configFieldName: ["video_DeviceBase.DevKind", "sys_DeviceBase.FatherCode"],
				nodeId,
				...baseParams,
				...strategyType,
				isHasStrategy: strategyType.isHasStrategy === false ? false : true
			}
		})
		return result
	},
	// 关键字搜索
	async getMatchNodeList(keyword: string, strategyType: IStrategyType, baseParams: IBaseParams) {
		const result = await DataApiService.request({
			url: "api/restApi/locationDevice/keyword",
			method: "POST",
			data: { keyword, ...strategyType, ...baseParams }
		})
		return result
	},
	// 获取选中节点的祖先及子孙集节点数据，用于定位
	async getNodeParent(id: string[], strategyType: IStrategyType, baseParams: IBaseParams) {
		const result = await DataApiService.request({
			url: "api/restApi/locationDevice/keywordPosition",
			method: "POST",
			data: {
				nodeId: id,
				...strategyType,
				...baseParams,
				isHasStrategy: strategyType.isHasStrategy === false ? false : true
			}
		})
		return result
	}
}

export default Http




