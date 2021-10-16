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
      { parameter: "height", explain: "树的外边框高", type: "number", defaultValue: "-" },
      { parameter: "mode.isRadio", explain: "是否单选", type: "boolean", defaultValue: "true" },
      { parameter: "mode.radioBrothers", explain: "兄弟节点是否单选", type: "boolean", defaultValue: "-" },
      { parameter: "mode.isAsync", explain: "是否异步请求", type: "boolean", defaultValue: "false" },
      { parameter: "disabled", explain: "是否禁用", type: "boolean", defaultValue: "false" },
      { parameter: "draggable", explain: "是否拖拽排序", type: "boolean", defaultValue: "false" },
      { parameter: "showFooter", explain: "是否显示底部", type: "boolean", defaultValue: "false" },
      { parameter: "positionKey", explain: "位置节点", type: "string", defaultValue: "-" },
      { parameter: "allowSearch", explain: "是否允许查询", type: "boolean", defaultValue: "true" },
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
          const str = text.split("/")
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
      { parameter: "callbackConfig.onState", explain: "事件回调", type: "(data: ICallbackData, eventType: EventType) => void", defaultValue: "-" },
      { parameter: "callbackConfig.onDrop", explain: "拖拽事件回调", type: "(data: { dragNode: object, dropNode: object,/\\ dropPosition: \"inner\" | \"up\" | \"down\" }) => Promise<boolean>", defaultValue: "-" },
      { parameter: "iconCallback", explain: "展示图标的回调", type: "[key: string]: (treeNode: object) => void", defaultValue: "-" },
    ],
    bordered: false
  }, true)

  // 数据属性
  const Data = Table({
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
      { parameter: "controlKey", explain: "选中节点的值", type: "string", defaultValue: "-" },
      { parameter: "originData", explain: "树结构的数据源", type: "TreeNodeData[]", defaultValue: "-" },
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
      { parameter: "httpConfig.init", explain: "异步请求初始化", type: "() => Promise<TreeNodeData[]>", defaultValue: "-" },
      { parameter: "httpConfig.onSearch", explain: "异步查询", type: "(searchValue: string) => Promise<{ key: string, label: string, [key: string]: any }[]>", defaultValue: "-" },
      { parameter: "httpConfig.onSelectOption", explain: "请求选中的节点", type: "(option: { key: string, label: string, [key: string]: any }) => Promise<TreeNodeData[]>", defaultValue: "-" },
      { parameter: "httpConfig.onExpand", explain: "异步请求展开事件", type: "(treeNode: object) => Promise<TreeNodeData[]>", defaultValue: "-" },
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
      <Panel header="数据属性" key="0">
        <Data />
      </Panel>
    </Collapse>
    <Collapse defaultActiveKey={["1"]}>
      <Panel header="数据请求属性" key="0">
        <DataRequest />
      </Panel>
    </Collapse>
  </div>
}
