import { EventHandlerResult, IBaseFormModel } from "./Base"
import moment from "moment"
import { IObservableObject } from "mobx"

export interface IProps extends IBaseFormModel {
	type?: "TIME" | "DATE" | "DATETIME" | "WEEK" | "MONTH" | "RANGEDATE" | "RANGEWEEK" | "RANGEDATETIME" | "RANGEMONTH"
	format?: string
	disabledDate?: (currentDate: moment.Moment) => boolean
	onClick?: (params: EventHandlerResult, mobxState: IObservableObject) => void
	onFocus?: (params: EventHandlerResult, mobxState: IObservableObject) => void
	onOk?: (params: EventHandlerResult, mobxState: IObservableObject) => void
}

export enum EDateType {
	"TIME" = "TIME",
	"DATE" = "DATE",
	"DATETIME" = "DATETIME",
	"WEEK" = "WEEK",
	"MONTH" = "MONTH",
	"RANGEDATE" = "RANGEDATE",
	"RANGEDATETIME" = "RANGEDATETIME",
	"RANGEWEEK" = "RANGEWEEK",
	"RANGEMONTH" = "RANGEMONTH"
}


export const defaultClassName = "zion-ui-date-time"

export const defaultType = "date"


