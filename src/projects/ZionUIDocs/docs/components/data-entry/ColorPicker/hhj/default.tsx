export const apiData = [
  {
    parameter: "value",
    instructions: "颜色初始值",
    default: "",
    type: "string",
    select: ``
  }
]
export const apiDataEvent = [
  {
    parameter: "onChange",
    instructions: "颜色改变促发的回调,可以在params获取颜色值",
    default: "",
    type: "(params: EventHandlerResult, mobxProps: IObservableObject) => void",
    select: ``
  }
]
