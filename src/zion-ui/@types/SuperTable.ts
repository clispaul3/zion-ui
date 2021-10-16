import { IProps as TableProps } from "./Table"
import { IProps as FormProps } from "./Form"
import { IProps as PopModalProps } from "./PopModal"
import { IProps as PopDrawerProps } from "./PopDrawer"

export interface IProps {
	controlKey?: string
	tableProps: TableProps
	insertForm?: FormProps
	insertModal?: PopModalProps
	filterForm?: FormProps
	filterModal?: PopDrawerProps
	updateForm?: FormProps
	updateModal?: PopModalProps
	httpConfig?: {
		init?: () => Promise<{ data: object[], total: number }>
		delete?: (params: { checkedRows: object[] }) => Promise<boolean | string>
		search?: (params: { filterConditionMap: { [key: string]: any }, orderByMap: { [key: string]: "DESC" | "ASC" } }) => Promise<{ data: object[], total: number }>
		insert?: (params: { formData: object }) => Promise<boolean | string>
		beforeUpdate?: (params: { record: object }) => Promise<{ [key: string]: { value: any, showValue?: any } }>
		update?: (params: { formData: object, record: object }) => Promise<boolean | string>
	}
}