import React from "react"
import { Table, Tag } from "zion-ui"
/**
 * @description Divider分割线API
 **/
export const tagApi = function () {
  const TplUi = Table({
    columns: [
      { title: "参数", dataIndex: "parameter", width: "15%" },
      { title: "说明", dataIndex: "explain", width: "25%" },
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
      { parameter: "checked", explain: "设置标签的选中状态", type: "boolean", defaultValue: "false" },
      { parameter: "closable", explain: "标签是否可以关闭（点击默认关闭）", type: "boolean", defaultValue: "false" },
      { parameter: "closeIcon", explain: "设置标签的图标", type: "ReactNode", defaultValue: "-" },
      { parameter: "color", explain: "设置标签的颜色", type: "string", defaultValue: "-" },
      { parameter: "text", explain: "设置标签文字", type: "string", defaultValue: "tag" },
      { parameter: "type", explain: "标签类型", type: "success | warn | warning | processing | error | waiting", defaultValue: "default" },
    ],
    bordered: false
  }, true)
  const TplEvent = Table({
    columns: [
      { title: "参数", dataIndex: "parameter", width: "15%" },
      { title: "说明", dataIndex: "explain", width: "25%" },
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
      { parameter: "onClose", explain: "关闭时的回调", type: "(event) => void", defaultValue: "-" }
    ],
    bordered: false
  }, true)
  return <div style={{ backgroundColor: "#FAFAFA", margin: "10px", padding: "10px", borderRadius: "8px", boxShadow: "10px 10px 5px #888888" }}>
    <h2>API</h2>
    <h3>UI属性</h3>
    <TplUi />
    <h3>事件属性</h3>
    <TplEvent />
    <div>注：可用 <Tag text="Ctrl" /><span>+ </span><Tag text="F" /> 进行查找</div>
  </div>
}