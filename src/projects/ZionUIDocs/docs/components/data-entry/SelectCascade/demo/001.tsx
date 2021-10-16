import React from 'react';
import { SelectCascade } from "zion-ui"

export const Demo = function () {
	const Status = SelectCascade({
		allowSearch: true,
		changeOnSelect: true,
		dataSource: [
			{ key: "1", label: "未开始" },
			{ key: "3", label: "已暂停", isLeaf: false },
			{ key: "11", uiPid: "1", label: "子节点" },
			{ key: "4", label: "已结束", disabled: true }
		],
		httpConfig: {
			onExpand: async (data) => {
				return [
					{ key: "111", uiPid: data["key"], label: "444" }
				]
			}
		}
	}, true)

	return <div>
		<Status />
	</div>
}

export const code = `
import React from 'react';
import { SelectCascade } from "zion-ui"

export const Demo = function () {
	const Status = SelectCascade({
		allowSearch: true,
		changeOnSelect: true,
		dataSource: [
			{ key: "1", label: "未开始" },
			{ key: "3", label: "已暂停", isLeaf: false },
			{ key: "11", uiPid: "1", label: "子节点" },
			{ key: "4", label: "已结束", disabled: true }
		],
		httpConfig: {
			onExpand: async (data) => {
				return [
					{ key: "111", uiPid: data["key"], label: "444" }
				]
			}
		}
	}, true)

	return <div>
		<Status />
	</div>
}
`