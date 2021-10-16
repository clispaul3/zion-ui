import { IProps } from "../../../@types/CodeEditor"
import { BaseFormModel } from "../../base"

export class Model extends BaseFormModel implements IProps {
	theme?: "material-darker"
	value?: string
	language?: "javascript" | "jsx" | "json" | "css" | "sass" | "markdown"
	readonly?: boolean

	constructor(props: IProps) {
		super(props)
		this.theme = props.theme || "material-darker"
		this.value = props.value
		this.language = props.language || "jsx"
		this.readonly = props.readonly
	}
}
