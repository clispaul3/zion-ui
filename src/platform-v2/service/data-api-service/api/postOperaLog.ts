/**
 * @description 保存操作日志
 */
interface IParams {
	doResult: string;  //  结果 1-成功 2-失败
	businessModule: string;  //  模块名称
	doTypeName: string;  // 作业行为
	doObjectName: string;  //  作业对象名称
	relevantInfo: string;  //  作业对象关键信息
}

//transactionId:业务流水ID
//businessModule:业务模块名称
//clientType:客户端类型，0：pcweb；1：客户端；2：安卓手机；3：苹果手机；4：手机web
//doTypeName:作业行为
//doResult:作业结果编号	依据具体业务需求选填，1-成功；2-失败；3-取消；4-响应超时
//otherInfos:{doObjectName:"",relevantInfo:""}

import DataApiService from "."

export function postOperaLog(params: IParams) {
	const { doResult, businessModule, doTypeName, doObjectName, relevantInfo } = params;
	getTransactionId().then(value => {
		const { data } = value;
		let transactionId = data.dataId;
		const req = {
			"transactionId": transactionId,
			"businessModule": businessModule,
			"clientType": 1,
			"doTypeName": doTypeName,
			"doResult": doResult,
			"otherInfos": {
				"DO_OBJECT_NAME": doObjectName,
				"RELEVANT_INFO": relevantInfo
			}
		};
		DataApiService.request({
			method: "POST",
			url: "/api/restApi/log/operaLog/insert",
			data: req,
			headers: { 'transactionId': transactionId }
		})
	});
}

export async function getTransactionId() {
	return await DataApiService.request({
		method: "GET",
		url: "/api/restApi/staticPageTools/generatorUUid",
		ignore: true
	});
}
