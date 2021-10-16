export const apiData = [
  {
    parameter: "allowClear",
    instructions: "是否允许再次点击后清除",
    default: "",
    type: "boolean",
    select: ``
  },
  {
    parameter: "allowHalf",
    instructions: " 是否允许半选",
    default: "",
    type: "boolean",
    select: ``
  },
  {
    parameter: "character",
    instructions: " 自定义字符",
    default: "",
    type: "ReactNode",
    select: ``
  },
  {
    parameter: "count",
    instructions: " 数量",
    default: "5",
    type: "number",
    select: ``
  },
  {
    parameter: "value",
    instructions: "分数",
    default: "",
    type: "number",
    select: ``
  },
  {
    parameter: "color",
    instructions: "填充颜色",
    default: "",
    type: "string",
    select: ``
  },
  {
    parameter: "disabled",
    instructions: "是否禁用",
    default: "",
    type: "boolean",
    select: ``
  },
  {
    parameter: "tooltips",
    instructions: "鼠标移入时的文字提示",
    default: "",
    type: "string[]",
    select: ``
  }
]
export const apiDataEvent = [
  {
    func: "onHoverChange",
    instructions: "鼠标指针浮动在控件上面时的回调",
    parameter: "value",
    default: "",
    type: "(value: number) => void",
  }
]
