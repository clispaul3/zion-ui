import { Demo as Demo001, code as Code001 } from "./sugenglin/001"
import { Demo as Demo002, code as Code002 } from "./sugenglin/002"
import React from "react"
import { CodeEditor, Row, Col, Collapse, Table } from "zion-ui"
import { Typography, Empty } from 'antd';
// export const CheckboxDemo = [
// 	["interface", "https://www.yuque.com/zhangyangbin-9bbif/sa0po2/ssct10"],
// 	["示例-基本使用", Demo001, Code001],
// 	["示例-垂直布局", Demo002, Code002],
// ]

// export interface EventHandlerResult extends EventHandlerParams {
//   value?: string[] | []
//   checked?: boolean
//   current?: IDataSourceItem
// }

// export interface IProps extends IBaseFormModel {
//   dataSource?: IDataSourceItem[]
//   value?: string[]
//   showAll?: boolean
//   placement?: "vertical" | "inline"
//   onChange?: (params: EventHandlerResult, mobxState: IObservableObject) => void

//   httpConfig?: {
//     init?: () => Promise<IDataSourceItem[]>
//   }
// }

// export interface IDataSourceItem {
//   key: string
//   label: string
//   disabled?: boolean
// }


export const CheckboxData = [
  { name: "示例-基本使用", project: <Demo001 />, projectDemo: [Code001] },
  { name: "示例-垂直布局", project: <Demo002 />, projectDemo: [Code002] },
]
export const CheckboxDemo = () => {
  const { Panel } = Collapse
  const Tpl1 = Table({
    columns: [
      { title: "参数", dataIndex: "key", align: "left" },
      { title: "说明", dataIndex: "explain", align: "left" },
      {
        title: "类型", dataIndex: "type", align: "left", render: (text) => <div style={{
          width: "inherit",
          display: "block",
          whiteSpace: "normal"
        }}>{text}</div>
      },
      { title: "是否必填", dataIndex: "requisite", align: "left", width: 80 },
      { title: "默认值", dataIndex: "default", align: "left" },
    ],
    rowKey: "key",
    dataSource: [
      { key: "dataSource", explain: "单选框的数据", type: "IDataSourceItem[]", requisite: "否" },
      { key: "value", explain: "单选框的值", type: "string", requisite: "否", },
      { key: "showAll", explain: "是否展示全选按钮", type: "boolean", requisite: "否", default: "false" },
      { key: "placement", explain: "垂直还是水平", type: "vertical | inline", requisite: "否", },
    ]
  }, true)
  const Tpl2 = Table({
    columns: [
      { title: "参数", dataIndex: "key", align: "left" },
      { title: "说明", dataIndex: "explain", align: "left" },
      {
        title: "类型", dataIndex: "type", align: "left", render: (text) => <div style={{
          width: "inherit",
          display: "block",
          whiteSpace: "normal"
        }}>{text}</div>
      },
      { title: "是否必填", dataIndex: "requisite", align: "left", width: 80 },
      { title: "默认值", dataIndex: "default", align: "left" },
    ],
    rowKey: "key",
    dataSource: [
      { key: "httpConfig", explain: "httpConfig:{init:()=>{}}", type: "object", requisite: "否" },
      { key: "init", explain: "复选框初始化", type: "Promise<IDataSourceItem[]>", requisite: "否", default: "" },
    ]
  }, true)
  const Tpl3 = Table({
    columns: [
      { title: "参数", dataIndex: "key", align: "left" },
      { title: "说明", dataIndex: "explain", align: "left" },
      {
        title: "类型", dataIndex: "type", align: "left", render: (text) => <div style={{
          width: "inherit",
          display: "block",
          whiteSpace: "normal"
        }}>{text}</div>
      },
      { title: "是否必填", dataIndex: "requisite", align: "left", width: 80 },
      { title: "默认值", dataIndex: "default", align: "left" },
    ],
    rowKey: "key",
    dataSource: [
      { key: "onChange", explain: "变化时回调函数", type: "(params: EventHandlerResult, mobxState: IObservableObject) => void", requisite: "否" },
    ]
  }, true)
  const Tpl4 = Table({
    columns: [
      { title: "参数", dataIndex: "key", align: "left" },
      { title: "说明", dataIndex: "explain", align: "left" },
      {
        title: "类型", dataIndex: "type", align: "left", render: (text) => <div style={{
          width: "inherit",
          display: "block",
          whiteSpace: "normal"
        }}>{text}</div>
      },
      { title: "是否必填", dataIndex: "requisite", align: "left", width: 80 },
      { title: "默认值", dataIndex: "default", align: "left" },
    ],
    rowKey: "key",
    dataSource: [
      { key: "value", explain: "选中的值", type: "string[] | []", requisite: "否", defalut: "[]" },
      { key: "checked", explain: "是否是全选状态", type: "boolean", requisite: "否", default: "" },
      { key: "current", explain: "点击选中的对象", type: "IDataSourceItem", requisite: "否", default: "" },
    ]
  }, true)
  const Tpl5 = Table({
    columns: [
      { title: "参数", dataIndex: "key", align: "left" },
      { title: "说明", dataIndex: "explain", align: "left" },
      {
        title: "类型", dataIndex: "type", align: "left", render: (text) => <div style={{
          width: "inherit",
          display: "block",
          whiteSpace: "normal"
        }}>{text}</div>
      },
      { title: "是否必填", dataIndex: "requisite", align: "left", width: 80 },
      { title: "默认值", dataIndex: "default", align: "left" },
    ],
    rowKey: "key",
    dataSource: [
      { key: "key", explain: "数据的标识符", type: "string", requisite: "是", defalut: "[]" },
      { key: "label", explain: "单选框的内容", type: "string", requisite: "是", default: "" },
      { key: "disabled", explain: "是否禁用单选框", type: "boolean", requisite: "否", default: "" },
    ]
  }, true)
  return <Row style={{ width: "100%" }}>
    {
      CheckboxData.map((item: any) => {
        return <Row style={{ width: "100%" }} key={item.name}>
          <Col span={23} style={{ border: "1px solid #1890ff", borderRadius: "3px", padding: "5px", margin: "5px" }}>
            <h2>{item.name}</h2>
            <p>代码演示：</p>
            <div style={{ paddingLeft: "70px", paddingBottom: "5px" }}>
              {item.project}
            </div>
            <Collapse defaultActiveKey={item.reminder ? ['2'] : []}>
              <Panel header="代码" key="1">
                <Row>
                  {
                    item.projectDemo.map((ele, i) => {
                      return <Col span={12} key={i}><CodeEditor value={ele} language="jsx" style={{ paddingTop: "10px", height: "620px" }} /></Col>
                    })
                  }
                </Row>
              </Panel>
              <Panel header="注意事项" key="2">
                {item.reminder ? item.reminder : <Empty description="暂无" />}
              </Panel>
            </Collapse>,
          </Col>
        </Row>
      })
    }
    <Row style={{ width: "100%" }}>
      <Col span={23} style={{ border: "1px solid #1890ff", borderRadius: "3px", padding: "5px", margin: "5px" }}>
        <Collapse>
          <Panel header="基本属性" key="1">
            <Tpl1 />
          </Panel>
          <Panel header="http属性" key="2">
            <Tpl2 />
          </Panel>
          <Panel header="事件属性" key="3">
            <Tpl3 />
          </Panel>
          <Panel header="EventHandlerResult" key="4">
            <Tpl4 />
          </Panel>
          <Panel header="IDataSourceItem" key="5">
            <Tpl5 />
          </Panel>
        </Collapse>,
      </Col>
    </Row>
  </Row>
}