import { Demo as Demo001, code1_1 as Code001_1, code1_2 as Code001_2 } from "./sugenglin/001"
import { Demo as Demo002, code2_1 as Code002_1, code2_2 as Code002_2 } from "./sugenglin/002"
import { Demo as Demo003, code3_1 as Code003_1, code3_2 as Code003_2 } from "./sugenglin/003"
import { Demo as Demo004, code as Code004_1 } from "./sugenglin/004"
import React from "react"
import { CodeEditor, Row, Col, Collapse, Table } from "zion-ui"
import { Typography, Empty } from 'antd';
const SelectData = [
  { name: "示例-基本使用", project: <Demo001 />, projectDemo: [Code001_1, Code001_2] },
  { name: "示例-异步请求", project: <Demo002 />, projectDemo: [Code002_1, Code002_2] },
  { name: "示例-展示footer/数据回填", project: <Demo003 />, projectDemo: [Code003_1, Code003_2] },
  { name: "示例-表单属性", project: <Demo004 />, projectDemo: [Code004_1] },
]
export const SelectDemo = () => {
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
      { key: "mode", explain: "下拉框多选还是单选", type: "checkbox | radio", requisite: "否", default: "radio" },
      { key: "showFooter", explain: "是否展示底部按钮", type: "boolean", requisite: "否", default: "false" },
      { key: "maxTagCount", explain: "", type: "number | null", requisite: "否", }
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
      { key: "dataSource", explain: "IDataSourceItem[]", type: "[{key,lable,disabled,icon,render}]", requisite: "否", default: "[]" },
      { key: "value", explain: "下拉框的值", type: "string[] | [] | string", requisite: "否", default: "" },
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
      { key: "httpConfig", explain: "httpConfig:{init:()=>{},onSearch:()=>{}}", type: "object", requisite: "否" },
      { key: "init", explain: "下拉框初始化", type: "(params: EventHandlerResult, mobxProps: IObservableObject) => Promise < IDataSourceItem[] >", requisite: "否", default: "" },
      { key: "onSearch", explain: "下拉框搜索调用的方法", type: "(params: EventHandlerResult, mobxProps: IObservableObject) => void", requisite: "否", default: "" },
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
      { key: "onFocus", explain: "获取焦点事件", type: "(params: EventHandlerResult, mobxProps: IObservableObject) => void", requisite: "否" },//待定
      { key: "onBlur", explain: "失去焦点事件", type: "(params: EventHandlerResult, mobxProps: IObservableObject) => void", requisite: "否" },
      { key: "onClick", explain: "点击事件", type: "(params: EventHandlerResult, mobxProps: IObservableObject) => void", requisite: "否" },
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
      { key: "key", explain: "dataSource数组里数据的Key", type: "string", requisite: "否" },
      { key: "lable", explain: "dataSource数组数据的标题", type: "string", requisite: "否" },
      { key: "disabled", explain: "dataSource数组数据的状态", type: "boolean", requisite: "否" },
      { key: "icon", explain: "dataSource数组数据的图标", type: "ReactNode", requisite: "否" },
      { key: "render", explain: "dataSource数组数据的渲染方法", type: "(data: IDataSourceItem) => ReactNode | string", requisite: "否" },
    ]
  }, true)
  return <Row style={{ width: "100%" }}>
    {
      SelectData.map((item: any) => {
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
          <Panel header="UI属性" key="1">
            <Tpl1 />
          </Panel>
          <Panel header="数据属性" key="2">
            <Tpl2 />
          </Panel>
          <Panel header="http属性" key="3">
            <Tpl3 />
          </Panel>
          <Panel header="事件属性" key="4">
            <Tpl4 />
          </Panel>
          <Panel header="IDataSourceItem[]" key="5">
            <Tpl5 />
          </Panel>
        </Collapse>,
      </Col>
    </Row>
  </Row>
}