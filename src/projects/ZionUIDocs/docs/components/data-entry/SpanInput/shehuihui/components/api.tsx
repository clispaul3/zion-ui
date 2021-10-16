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
      { parameter: "value", explain: "文本内容", type: "string", defaultValue: "-" },
      { parameter: "maxLength", explain: "可显示的最大长度", type: "number", defaultValue: "-" },
      { parameter: "showEdit", explain: "是否可以编辑", type: "boolean", defaultValue: "true" },
      { parameter: "href", explain: "为文字添加链接", type: "string", defaultValue: "-" },
      { parameter: "allowSpace", explain: "是否允许空间", type: "boolean", defaultValue: "-" },
      { parameter: "showInput", explain: "是否展示文本框", type: "boolean", defaultValue: "true" },
      { parameter: "showTitle", explain: "是否展示标题", type: "boolean", defaultValue: "false" },
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
      { parameter: "onPressEnter", explain: "按回车键后回调", type: "(params: EventHandlerResult, mobx: IObservableObject) => void", defaultValue: "-" },
      { parameter: "onBlur", explain: "失去焦点后回调", type: "(params: EventHandlerResult, mobx: IObservableObject) => void", defaultValue: "-" },
      { parameter: "onEdit", explain: "选择编辑后回调", type: "(params: EventHandlerResult, mobx: IObservableObject) => void", defaultValue: "-" },
      { parameter: "onClick", explain: "变化时回调", type: "(params: EventHandlerResult, mobx: IObservableObject) => void", defaultValue: "-" },
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