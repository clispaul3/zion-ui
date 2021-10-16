import React from "react"
import { Table, Tag } from "zion-ui"
/**
 * @description Button按钮API
 **/
export const buttonApi = function () {
  const TplUi = Table({
    columns: [
      { title: "参数", dataIndex: "parameter", width: "15%" },
      { title: "说明", dataIndex: "explain", width: "20%" },
      {
        title: "类型", dataIndex: "type",
        render: (text) => {
          const str = text.split("|")
          return (
            <div style={{ width: "inherit", display: "block", whiteSpace: "normal" }}>
              {str.map((item) => (
                <Tag text={item} style={{ color: "#c41d7f", margin: "2px" }} />
              ))}
            </div>
          )
        }
      },
      { title: "默认值", dataIndex: "defaultValue", width: "15%" }
    ],
    rowKey: "parameter",
    dataSource: [
      { parameter: "disabled", explain: "按钮失效状态", type: "boolean", defaultValue: "false" },
      { parameter: "icon", explain: "设置按钮的图标组件", type: "ReactNode", defaultValue: "-" },
      { parameter: "loading", explain: "设置按钮载入状态", type: "boolean", defaultValue: "false" },
      { parameter: "shape", explain: "设置按钮形状", type: "round | circle", defaultValue: "-" },
      { parameter: "show", explain: "设置按钮是否显示", type: "boolean", defaultValue: "true" },
      { parameter: "size", explain: "设置按钮大小", type: "large | middle | small", defaultValue: "middle" },
      { parameter: "text", explain: "设置按钮文字", type: "string", defaultValue: "按钮" },
      { parameter: "type", explain: "按钮类型", type: "default | primary | link | danger | dashed | ghost | warn | warning | info | success", defaultValue: "default" },
    ],
    bordered: false
  }, true)
  const TplEvent = Table({
    columns: [
      { title: "参数", dataIndex: "parameter", width: "15%" },
      { title: "说明", dataIndex: "explain", width: "20%" },
      {
        title: "类型", dataIndex: "type",
        render: (text) => {
          const str = text.split("|")
          return (
            <div style={{ width: "inherit", display: "block", whiteSpace: "normal" }}>
              {str.map((item) => (
                <Tag text={item} style={{ color: "#c41d7f", margin: "2px" }} />
              ))}
            </div>
          )
        }
      },
      { title: "默认值", dataIndex: "defaultValue", width: "15%" }
    ],
    rowKey: "parameter",
    dataSource: [
      { parameter: "onClick", explain: "点击按钮时的回调", type: "(event) => void", defaultValue: "-" }
    ],
    bordered: false
  }, true)
  return <div style={{ backgroundColor: "#FAFAFA", margin: "10px", padding: "15px", borderRadius: "8px", boxShadow: "10px 10px 5px #888888" }}>
    <h2>API</h2>
    <h3>UI属性</h3>
    <TplUi />
    <h3>事件属性</h3>
    <TplEvent />
    <span>支持原生Button的其他所有属性。</span>
  </div>
}