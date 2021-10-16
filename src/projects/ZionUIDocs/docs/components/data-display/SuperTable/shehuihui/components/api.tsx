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
      { parameter: "controlKey", explain: "选中的行的key值", type: "string", defaultValue: "-" },
      { parameter: "tableProps", explain: "表格框架内容", type: "TableProps", defaultValue: "-" },
      { parameter: "insertForm", explain: "新建表格的内容", type: "FormProps", defaultValue: "-" },
      { parameter: "insertModal", explain: "新建表格的配置", type: "PopModalProps", defaultValue: "-" },
      { parameter: "filterForm", explain: "过滤表格的内容", type: "FormProps", defaultValue: "-" },
      { parameter: "filterModal", explain: "过滤表格的配置", type: "PopDrawerProps", defaultValue: "-" },
      { parameter: "updateForm", explain: "更新表格的内容", type: "FormProps", defaultValue: "-" },
      { parameter: "updateModal", explain: "更新表格的配置", type: "PopModalProps", defaultValue: "-" },
    ],
    bordered: false
  }, true)

  // 数据请求属性
  const OnEvent = Table({
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
      { parameter: "init", explain: "表格内容的初始化", type: "() => Promise<{ data: object[], total: number }", defaultValue: "-" },
      { parameter: "delete", explain: "删除", type: "(params: { checkedRows: object[] }) => Promise<boolean / string>", defaultValue: "-" },
      { parameter: "search", explain: "查询", type: "(params: { filterConditionMap: { [key: string]: any }, orderByMap: { [key: string]: \"DESC\" /| \"ASC\" } }) => Promise<{ data: object[], total: number }>", defaultValue: "-" },
      { parameter: "insert", explain: "插入", type: "(params: { formData: object }) => Promise<boolean / string>", defaultValue: "-" },
      { parameter: "beforeUpdate", explain: "编辑前的内容回调", type: "(params: { record: object }) => Promise<{ [key: string]: { value: any, showValue?: any } }>", defaultValue: "-" },
      { parameter: "update", explain: "编辑", type: "(params: { formData: object, record: object }) => Promise<boolean | string>", defaultValue: "-" },
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
      <Panel header="事件属性" key="0">
        <OnEvent />
      </Panel>
    </Collapse>
  </div>
}
