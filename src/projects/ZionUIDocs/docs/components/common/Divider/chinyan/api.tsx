import React from "react"
import { Table, Tag } from "zion-ui"
/**
 * @description Divider分割线API
 **/
export const dividerApi = function () {
  const Tpl = Table({
    columns: [
      { title: "参数", dataIndex: "parameter", width: "15%" },
      { title: "说明", dataIndex: "explain" },
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
      { title: "默认值", dataIndex: "defaultValue", width: "20%" }
    ],
    rowKey: "parameter",
    dataSource: [
      { parameter: "content", explain: "分割线内容", type: "ReactNode | string", defaultValue: "-" },
      { parameter: "dashed", explain: "是否虚线", type: "boolean", defaultValue: "false" },
      { parameter: "placement", explain: "分割线文字位置", type: "left | right | center", defaultValue: "center" },
      { parameter: "plain", explain: "文字是否显示为普通正文样式", type: "boolean", defaultValue: "false" },
      { parameter: "style", explain: "分割线字体样式", type: "string", defaultValue: "-" }
    ],
    bordered: false
  }, true)
  return <div style={{ backgroundColor: "#FAFAFA", margin: "10px", padding: "10px", borderRadius: "8px", boxShadow: "10px 10px 5px #888888" }}>
    <h2>API</h2>
    <Tpl />
  </div>
}