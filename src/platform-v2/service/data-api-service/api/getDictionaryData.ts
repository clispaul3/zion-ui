/**
 * @description 请求字典的数据
 */
import DataApiService from ".";

function getDictionaryData(ids: string[] | string) {
	let reqestId;
	if (typeof ids === "string") {
		reqestId = [ids];
	} else {
		reqestId = ids;
	}
	const requestParam = reqestId.map((item) => ({
		DATA_SOURCE_TYPE: 2,
		id: item,
		filterCondition: [],
		controlCode: item,
	}));
	return DataApiService.request({
		method: "POST",
		url: "api/restApi/controlData/getOptionDSList",
		data: requestParam,
	});
}

export { getDictionaryData };
