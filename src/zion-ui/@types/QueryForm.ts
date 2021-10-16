import { IProps as FormProps } from "./Form"

export interface IProps {
	formProps: FormProps
	onSearch?: (formData: object) => void
	onReset?: (formData: object) => void
}

export const defaultClassName = "zion-ui-query-form"