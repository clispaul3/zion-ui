import { DataApiService } from "v2"

// 获取子节点数据
interface Param1 {
	type: number,
	nodeId?: string[],
	keyword?: string,
	hasType?: number,
	configFilterCondition?: [],
	configOrderBy?: [],
	filterNodeId: []
}

// 获取子节点数据
function getChildrenData(param: Param1) {
	if (param.configFilterCondition && param.configFilterCondition.length == 0) {
		delete param.configFilterCondition
	}
	if (param.configOrderBy && param.configOrderBy.length == 0) {
		delete param.configOrderBy
	}
	return DataApiService.request({
		url: '/api/restApi/location/getChildData',
		method: "POST",
		data: param
	})
};

interface IParam3 {
	nodeId: string,
	locationType: string,
	configFilterCondition: [],
	configOrderBy: [],
	filterNodeId: []
}

// 获取直系祖先
function getDirectLineParent(param: IParam3) {
	let type = 8
	const { locationType, nodeId, configFilterCondition, configOrderBy } = param
	switch (locationType) {
		case "1":  // 查询建筑物的直系祖先
			type = 5
			break
		case "2":  // 查询楼层的直系祖先
			type = 6
			break
		case "3":
			type = 7   // 查询区域的直系祖先
			break
		case "4":
			type = 8   // 查询点位的直系祖先
			break
	}
	const requestParams: any = {
		type,
		nodeId: typeof nodeId === "string" ? [nodeId] : nodeId,
		isParent: true,
		configFilterCondition,
		configOrderBy
	}
	if (requestParams.configFilterCondition && requestParams.configFilterCondition.length == 0) {
		delete requestParams.configFilterCondition
	}
	if (requestParams.configOrderBy && requestParams.configOrderBy.length == 0) {
		delete requestParams.configOrderBy
	}
	return DataApiService.request({
		method: "POST",
		url: "/api/restApi/location/getParentData",
		data: requestParams
	})
}

// 关键字查询
interface Param2 {
	type: number
	keyword?: string,
	configFilterCondition?: [],
	configOrderBy?: [],
	filterNodeId: []
}

const getLocationByKeyWord = function (this: any, param: Param2) {
	if (param.configFilterCondition && param.configFilterCondition.length == 0) {
		delete param.configFilterCondition
	}
	if (param.configOrderBy && param.configOrderBy.length == 0) {
		delete param.configOrderBy
	}
	return DataApiService.request({
		url: 'api/restApi/location/keyword',
		method: "POST",
		data: param
	})
};


// 通过节点id查找祖先及子孙集数据
interface Param3 {
	type?: number
	nodeId: string[]
	hasType?: string,
	configFilterCondition?: [],
	configOrderBy?: []
}
const getLocationByNodeId = function (this: any, param: Param3) {
	if (param.configFilterCondition && param.configFilterCondition.length == 0) {
		delete param.configFilterCondition
	}
	if (param.configOrderBy && param.configOrderBy.length == 0) {
		delete param.configOrderBy
	}
	return DataApiService.request({
		url: '/api/restApi/location/getParentData',
		method: "POST",
		data: param
	})
};


export {
	getChildrenData,
	getDirectLineParent,
	getLocationByKeyWord,
	getLocationByNodeId
}

