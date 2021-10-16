import React from "react"
import { Table, Tag } from "zion-ui"
import { Collapse } from 'antd'

export const Api = function () {
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
      { parameter: "allowSearch", explain: "是否允许查询", type: "boolean", defaultValue: "-" },
      { parameter: "changeOnSelect", explain: "当此项为 true 时，点选每级菜单选项值都会发生变化", type: "boolean", defaultValue: "-" },
      { parameter: "value", explain: "指定选中项", type: "string[]", defaultValue: "-" },
      { parameter: "trigger", explain: "选择弹出类型", type: "click | hover", defaultValue: "-" },
      { parameter: "dataSource", explain: "数据源", type: "IDataSourceItem[]", defaultValue: "-" },
    ],
    bordered: false
  }, true)

  // 事件属性
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
      { parameter: "onChange", explain: "选择完成后的回调", type: "(params: EventHandlerResult, mobxProps: IObservableObject) => void", defaultValue: "-" },
      { parameter: "onExpand", explain: "展开后的回调", type: "(params: EventHandlerResult, mobxProps: IObservableObject) => void", defaultValue: "-" },
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
      { parameter: "httpConfig.init", explain: "初始化", type: "Promise<IDataSourceItem[]>", defaultValue: "-" },
      { parameter: "httpConfig.onExpand", explain: "展开的初始化", type: "(data: IDataSourceItem) => Promise<IDataSourceItem[]>", defaultValue: "-" },
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
    <Collapse defaultActiveKey={["1"]}>
      <Panel header="数据请求属性" key="0">
        <DataRequest />
      </Panel>
    </Collapse>
  </div>
}