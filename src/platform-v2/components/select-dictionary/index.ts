import { Select, StateManage } from "zion-ui";
import { IObservableObject } from "mobx";
import { ReactNode } from "react";
import { DataApiService } from "../../service";
import { IProps } from "./interface";

export const SelectDictionary = function (params: IProps) {
	const { dicId, filter, mode, value, props = {} } = params
	return Select({
		mode,
		value,
		didMount: async (state) => {
			const result = await DataApiService.getDictionaryData(dicId)
			let dataSource = result[dicId].map((item: any) => {
				return {
					...item,
					key: item["key"],
					label: item["value"]
				}
			})
			if (filter) {
				dataSource = filter(dataSource)
			}
			StateManage.set(state, { dataSource })
		},
		...props
	}, false)
}