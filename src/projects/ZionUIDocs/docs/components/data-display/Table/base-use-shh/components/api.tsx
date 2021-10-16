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
      { parameter: "columns", explain: "表格列的配置描述", type: "IColumnType[]", defaultValue: "-" },
      { parameter: "pagination", explain: "分页的配置项", type: "IPagination", defaultValue: "-" },
      { parameter: "scroll", explain: "滚动的配置项", type: "IScroll", defaultValue: "-" },
      { parameter: "size", explain: "表格大小", type: "small | middle | large", defaultValue: "small" },
      { parameter: "fullscreen", explain: "是否全屏", type: "boolean", defaultValue: "false" },
      { parameter: "header", explain: "表格头部", type: "IHeader", defaultValue: "-" },
      { parameter: "bordered", explain: "是否展示外边框和列边框", type: "boolean", defaultValue: "false" },
      { parameter: "footer", explain: "表格尾部", type: "IFooter | (() => ReactNode)", defaultValue: "-" },
      { parameter: "rowSelection", explain: "表格行是否可选择", type: "IRowSelection", defaultValue: "-" },
      { parameter: "allowResize", explain: "是否允许拖拽调节", type: "boolean", defaultValue: "false" },
      { parameter: "loading", explain: "页面是否加载中", type: "boolean", defaultValue: "false" },
      { parameter: "buttonConfig", explain: "按钮配置项", type: "IButtonConfig", defaultValue: "-" },
      { parameter: "allowDragSort", explain: "是否允许表格拖拽排序", type: "boolean", defaultValue: "false" },
      { parameter: "expandedKeys", explain: "当前展开节点", type: "string[]", defaultValue: "-" },
      { parameter: "expandable.onExpand", explain: "配置展开属性", type: "(params: { expanded: boolean, record: object }) => ReactNode", defaultValue: "-" },
      { parameter: "expandable.rowExpandable", explain: "配置行展开属性", type: "(params) => boolean", defaultValue: "-" },
      { parameter: "disabled", explain: "是否禁用", type: "boolean", defaultValue: "-" },
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
      { parameter: "onChange", explain: "表格内部交互过程中产生的查询条件发生变化时触发该方法", type: "(condition: ICondition, action: EAction, mobxState: IObservableObject) => void", defaultValue: "-" },
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
      { parameter: "dataSource", explain: "表格数据源", type: "IDataSourceItem[]", defaultValue: "-" },
      { parameter: "rowKey", explain: "表格行 key 的取值", type: "string", defaultValue: "-" },
      { parameter: "nestingMode", explain: "嵌套方式", type: "inherit | customer", defaultValue: "-" },
    ],
    bordered: false
  }, true)
  // 数据属性
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
      { parameter: "httpConfig", explain: "http配置项", type: "IHttpConfig", defaultValue: "-" },
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
      <Panel header="http属性" key="0">
        <DataRequest />
      </Panel>
    </Collapse>
  </div>
}
