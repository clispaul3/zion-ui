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
      { parameter: "layout", explain: "布局方式", type: "vertical | horizontal | inline", defaultValue: "vertical" },
      { parameter: "theme", explain: "菜单主题", type: "light | dark", defaultValue: "light" },
      { parameter: "selectedKeys", explain: "当前选中的节点", type: "string[]", defaultValue: "-" },
      { parameter: "openKeys", explain: "当前打开的节点", type: "string[]", defaultValue: "-" },
      { parameter: "dataSource", explain: "菜单数据源", type: "IMenuItem[]", defaultValue: "-" },
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
      { parameter: "onClick", explain: "点击 MenuItem 回调", type: "(params: OnClickEventHandlerParams, state: IObservableObject) => void", defaultValue: "-" },
      { parameter: "onOpenChange", explain: "点击节点回调", type: "(params: { openKeys: string[] }, state: IObservableObject) => void", defaultValue: "-" },
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
