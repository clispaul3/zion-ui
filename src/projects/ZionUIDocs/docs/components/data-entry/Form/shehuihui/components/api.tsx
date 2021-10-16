import React from 'react'
import { Table, Tag } from "zion-ui"
import { Collapse } from 'antd'

export const Api = function() {
    const { Panel } = Collapse
  // UI属性
  const UI = Table({
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
      { parameter: "status", explain: "表单状态", type: "insert | update | detail", defaultValue: "-" },
    ],
    bordered: false
  }, true)

  // 数据请求属性
  const DataRequest = Table({
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
      { parameter: "formConfig", explain: "表单配置", type: "IFormConfig", defaultValue: "-" },
      { parameter: "formItemConfig", explain: "表单内容初始化", type: "IFormItem[]", defaultValue: "-" },
    ],
    bordered: false
  }, true)
  return <div style={{ margin: "20px" }}>
    <Collapse defaultActiveKey={["1"]}>
      <Panel header="UI属性" key="0">
        <UI />
      </Panel>
    </Collapse>
    <Collapse defaultActiveKey={["1"]}>
      <Panel header="数据请求属性" key="0">
        <DataRequest />
      </Panel>
    </Collapse>
  </div>
}