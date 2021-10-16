export const ApiData = [
  {
    parameter: "value",
    instructions: "是否选中",
    default: "",
    type: "boolean",
    select: ``
  },
  {
    parameter: "require",
    instructions: "是否必选",
    default: "false",
    type: "boolean",
    select: ``
  },
  {
    parameter: "size",
    instructions: "开关大小",
    default: "false",
    type: "string",
    select: `"small" | "middle" | "large"`
  },
  {
    parameter: "disabled",
    instructions: "是否禁用",
    default: "false",
    type: "boolean",
    select: ``
  },
  //value={true} disabled={true}
  {
    parameter: "checkedChildren",
    instructions: "选中时显示的内容",
    select: `-`,
    type: "string | ReactNode "
  },
  {
    parameter: "unCheckedChildren",
    instructions: "非选中时显示的内容",
    default: "",
    type: "string | ReactNode",
    select: ``
  }
]
