import { SelectProps } from "zion-ui";
import { ReactNode } from "react";

interface IDataSourceItem {
	key: string
	label: string
	disabled?: boolean
	icon?: ReactNode
	render?: (data: IDataSourceItem) => ReactNode | string
}

export interface IProps {
	dicId: string
	mode?: "radio" | "checkbox"
	value?: string[] | string | []
	filter?: (dataSource: { key: string, label: string, [key: string]: any }) => IDataSourceItem
	props?: SelectProps
}