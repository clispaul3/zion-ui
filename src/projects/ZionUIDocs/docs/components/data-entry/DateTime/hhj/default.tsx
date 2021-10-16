export const apiData = [
  {
    parameter: "label",
    instructions: "标签",
    default: "",
    type: "string",
    select: ``
  },
  {
    parameter: "required",
    instructions: "是否必填",
    default: "false",
    type: "boolean",
    select: ``
  },
  {
    parameter: "allowClear",
    instructions: "是否允许清空",
    default: "false",
    type: "boolean",
    select: ``
  },
  {
    parameter: "type",
    instructions: "日期控件的类型",
    default: "DATE",
    type: "string",
    select: `"TIME" | "DATE" | "DATETIME" | "WEEK" | "MONTH" | "RANGEDATE" | "RANGEWEEK" | "RANGEDATETIME" | "RANGEMONTH"`
  },
  {
    parameter: "format",
    instructions: "时间的显示格式，例如设置为“YYYY[年]MM[月]DD[日]”",
    default: "YYYY-MM-DD",
    type: "string",
    select: ``
  },
  {
    parameter: "disabledDate",
    instructions: "禁用选择某个区间的时间，比如禁止今天之前的时间点的选择",
    default: "-",
    type: "(currentDate: moment.Moment) => boolean",
    select: ``
  },
]
export const apiDataEvent = [

  {
    func: "onClick",
    instructions: "-",
    parameter: "-",
    default: "",
    type: "() => void",
    select: "-"
  },
  {
    func: "onFocus",
    instructions: "-",
    parameter: "params,mobxState",
    default: "",
    type: "(params: EventHandlerResult, mobxState: IObservableObject) => void",
    select: "-"
  },
  {
    func: "onOk",
    instructions: "-",
    parameter: "params,mobxState",
    default: "",
    type: "(params: EventHandlerResult, mobxState: IObservableObject) => void",
    select: "-"
  },
]



