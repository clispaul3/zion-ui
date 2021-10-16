import { IParams, IJsonConfig } from "../../@types/PropertyService"
import { createElement } from "react"
import * as ZionUI from "../../index"
import { get } from "lodash"
import { Tree } from "../../index";

const typeObject = (object: any) => {
	try {
		const objectType = Object.prototype.toString
			.call(object)
			.replace("[object ", "")
			.replace("]", "");
		return objectType;
	} catch (error) {
		console.log(error)
	}
};
const isObject = (object: any) => {
	return typeObject(object) === "Object";
};
const isArray = (object: any) => {
	return typeObject(object) === "Array";
};

const objectMap: any = (obj: any, object: any, process: any, path: any) => {
	try {
		let keyPath: any = [];
		if (isArray(path)) keyPath = [...path];
		let go;
		if (isArray(keyPath) && keyPath.length)
			go = process(obj, object, keyPath[keyPath.length - 1], keyPath);
		else go = process(obj, object, null, []);
		if (!go) {
			if (isObject(object))
				for (let key in object) {
					go = objectMap(object, object[key], process, [...keyPath, key]);
					if (go === "break") break;
				}
			else if (isArray(object))
				for (let key = 0; key < object.length; key++) {
					go = objectMap(object, object[key], process, [...keyPath, key]);
					if (go === "break") break;
				}
		}
		return go;
	} catch (error) {
		console.log(error)
	}
};

function guid() {
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
		var r = Math.random() * 16 | 0,
			v = c == 'x' ? r : (r & 0x3 | 0x8);
		return v.toString(16).replace(/-/g, "");
	});
}
/**
 * @param jsonConfig 组件的配置对象
 * @param $params {MobxProperty?: object, Service?:object, Http?:object, MergeProps?}
 */
export function getReactElementFromJSON(jsonConfig: IJsonConfig, $params?: IParams) {
	let { type, props, children } = jsonConfig
	objectMap(null, jsonConfig, (obj, value, key, keyPath) => {
		if (typeof value === "string") {
			// 变量
			if (value.indexOf("{{") >= 0 && value.indexOf("}}") >= 0) {
				const targetKey: any = value.replace("{{", "").replace("}}", "")
				const targetValue = get($params, targetKey)
				if (targetValue) {
					obj[key] = targetValue
				}
			}
			// 组件
			if (value.indexOf("[[") >= 0 && value.indexOf("]]") >= 0) {
				const targetKey: any = value.replace("[[", "").replace("]]", "")
				const targetValue = targetKey !== "Tree" ? ZionUI[targetKey] : Tree(obj["props"], true)
				if (targetValue) {
					obj[key] = targetValue
				}
			}
			// 字符串代码
			if (value.indexOf("((") >= 0 && value.indexOf("))") >= 0) {
				const targetCode: any = value.replace("((", "").replace("))", "")
				if (eval) {
					obj[key] = eval(targetCode)
				}
			}
		}
	});
	if (typeof type === "string" && type.indexOf("[[") >= 0 && type.indexOf("]]") >= 0) {
		type = type.replace("[[", "").replace("]]", "")
		type = type !== "Tree" ? ZionUI[type] : Tree(props, true)
	};
	(props as any).key = guid();
	return createElement(type, props, children ? children.map(getReactElementFromJSON as any) : null)
}