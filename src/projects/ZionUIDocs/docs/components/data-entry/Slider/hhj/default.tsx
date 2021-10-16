export const ApiData = [
  {
    parameter: "value",
    instructions: "初始值",
    default: "",
    type: "number",
    select: ``
  },
  {
    parameter: "placement",
    instructions: "进度条的方向（横向或者竖向）",
    select: `"vertical" | "inline"`,
    type: "string"
  },
  {
    parameter: "min",
    instructions: "最小值",
    default: "",
    type: "number",
    select: ``
  },
  {
    parameter: "max",
    instructions: "最大值",
    default: "",
    type: "number",
    select: ``
  },

]
export const dataFun = [
  {
    parameter: "visible",
    instructions: "进度条是否显示",
    default: "",
    type: ` boolean`,
    select: ``
  },
  {
    parameter: "content",
    instructions: "表示重新渲染提示内容",
    default: "",
    type: `(value) => ReactNode | string`,
    select: ``
  },
  {
    parameter: "placement",
    instructions: "表示提示的位置",
    default: "top",
    type: `string`,
    select: `"top" | "left" | "right" | "bottom" | "topLeft" | "topRight" | "bottomLeft" | "bottomRight" | "leftTop" | "leftBottom" | "rightTop" | "rightBottom"`
  }
]
