import { CSSProperties, ReactNode } from "react";
import { IBaseFormModel } from "./Base"

export interface IProps extends IBaseFormModel {
	data: Object
	rows: IRowItem[],
	layout?: {
		wrapperCol?: { span: number }
		labelCol?: { span: number }
	}
}

export interface IRowItem {
	title: string | ReactNode
	dataIndex?: string
	render?: (value: string, data: Object) => ReactNode
}

export const defaultClassName = "zion-ui-detail-form"

export const defaultItemClassName = defaultClassName + "-item"

export const titleStyle: CSSProperties = {
	width: "90%",
	margin: "0",
	whiteSpace: "nowrap",
	overflow: "hidden",
	textOverflow: "ellipsis",
}
