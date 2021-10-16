import { IBaseFormModel } from "./Base"

export interface IProps extends IBaseFormModel {
	theme?: "material-darker"
	value?: string
	language?: "javascript" | "jsx" | "json" | "css" | "sass" | "markdown"
	readonly?: boolean
}

export const defaultClassName = "zion-ui-code-editor"