import { Demo as Demo001, code1_1 as Code001_1, code1_2 as Code001_2, code1_3 as Code001_3, code1_5 as Code001_4 } from "./sugenglin/001"
import { Demo as Demo002, code2_1 as Code002_1, code2_2 as Code002_2, code2_3 as Code002_3, code2_4 as Code002_4, code2_5 as Code002_5 } from "./sugenglin/002"
import { Demo as Demo003, code3_1 as Code003_1, code3_2 as Code003_2, code3_3 as Code003_3, code3_4 as Code003_4, code3_5 as Code003_5, code3_6 as Code003_6 } from "./sugenglin/003"
import { Demo as Demo004, code4_1 as Code004_1, code4_2 as Code004_2, code4_3 as Code004_3, code4_4 as Code004_4 } from "./sugenglin/004"
import { Demo as Demo005, code5_1 as Code005_1, code5_2 as Code005_2, code5_3 as Code005_3, code5_4 as Code005_4 } from "./sugenglin/005"
import { Demo as Demo006, code6_1 as Code006_1, code6_2 as Code006_2, code6_3 as Code006_3, code6_4 as Code006_4 } from "./sugenglin/006"
import React from "react"
import { CodeEditor, Row, Col, Collapse, Table } from "zion-ui"
import { Typography, Empty } from 'antd';
// export const InputDemo = [
//   ["interface", "https://www.yuque.com/zhangyangbin-9bbif/sa0po2/pvppci"],
//   ["示例-文本框类型", Demo001, Code001],
//   ["示例-前后置提示", Demo002, Code002],
//   ["示例-事件回调", Demo003, Code003],
//   ["示例-数据属性", Demo004, Code004],
//   ["示例-表单属性", Demo006, Code006],
//   ["示例-其他属性", Demo005, Code005]
// ]
const InputData = [
  { name: "示例-文本框类型", project: <Demo001 />, projectDemo: [Code001_1, Code001_2, Code001_3, Code001_4] },
  { name: "示例-前后置提示", project: <Demo002 />, projectDemo: [Code002_1, Code002_2, Code002_3, Code002_4, Code002_5] },
  { name: "示例-事件回调", project: <Demo003 />, projectDemo: [Code003_1, Code003_2, Code003_3, Code003_4, Code003_5, Code003_6] },
  { name: "示例-数据属性", project: <Demo004 />, projectDemo: [Code004_1, Code004_2, Code004_3, Code004_4] },
  { name: "示例-表单属性", project: <Demo006 />, projectDemo: [Code006_1, Code006_2, Code006_3, Code006_4] },
  { name: "示例-其他属性", project: <Demo005 />, projectDemo: [Code005_1, Code005_2, Code005_3, Code005_4] }
]
export const InputDemo = () => {
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
      { key: "type", explain: "输入框类型", type: "input | textArea | search | password | number", requisite: "否", default: "input" },
      { key: "prefix", explain: "输入框内左侧固定内容", type: "string | ReactNode", requisite: "否", default: "" },
      { key: "suffix", explain: "输入框内右侧固定内容", type: "string | ReactNode", requisite: "否", },
      { key: "addonAfter", explain: "输入框外右侧固定内容", type: "string | ReactNode", requisite: "否", default: "" },
      { key: "addonBefore", explain: "输入框外左侧固定内容", type: "string | ReactNode", requisite: "否", default: "" },
      { key: "enterButton", explain: "是否展示搜索框的搜索图标", type: "boolean | ReactNode", requisite: "否" },
      { key: "visibilityToggle", explain: "显示密码右边的小眼睛(需要配合password类型使用)", type: "boolean", requisite: "否", default: "false" },
      { key: "autoSize", explain: "文本框拉伸大小(多行文本框)", type: "boolean | { minRows?: number, maxRows?: number }", requisite: "否" },
      { key: "allowSpace", explain: "文末不允许输入空格", type: "boolean", requisite: "否", default: "true" },
      { key: "disableOnChange", explain: "无法输入", type: "boolean", requisite: "否", default: "false" },
      { key: "showTitle", explain: "鼠标移入是否显示", type: "boolean", requisite: "否" },
      { key: "autoFocus", explain: "自动聚焦", type: "boolean", requisite: "否", }

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
      { key: "maxLength", explain: "最多输入多少个字符", type: "number", requisite: "否", default: "input" },
      { key: "min", explain: "type为Number类型输入框的最小值", type: "number", requisite: "否", default: "" },
      { key: "max", explain: "type为Number类型输入框的最大值", type: "number", requisite: "否", },
      { key: "onlyInt", explain: "自动取整数值（配合number类型使用）", type: "boolean", requisite: "否", default: "" },
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
      { key: "onPressEnter", explain: "回车键的事件回调函数", type: "(params: EventHandlerResult, mobxProps: IObservableObject) => void", requisite: "否" },//待定
      { key: "onSearch", explain: "点击搜索事件", type: "(params: EventHandlerResult, mobxProps: IObservableObject) => void", requisite: "否" },
      { key: "onFocus", explain: "获取焦点事件", type: "(params: EventHandlerResult, mobxProps: IObservableObject) => void", requisite: "否" },
      { key: "onBlur", explain: "失去焦点事件", type: "(params: EventHandlerResult, mobxProps: IObservableObject) => void", requisite: "否" },
      { key: "onClick", explain: "点击事件", type: "(params: EventHandlerResult, mobxProps: IObservableObject) => void", requisite: "否" },
    ]
  }, true)
  return <Row style={{ width: "100%" }}>
    {
      InputData.map((item: any) => {
        return <Row style={{ width: "100%" }} key={item.name}>
          <Col span={23} style={{ border: "1px solid #1890ff", borderRadius: "3px", padding: "5px", margin: "5px" }}>
            <h2>{item.name}</h2>
            <p>代码演示：</p>
            <div style={{ paddingLeft: "70px" }}>
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
          <Panel header="事件属性" key="3">
            <Tpl3 />
          </Panel>
        </Collapse>,
      </Col>
    </Row>
  </Row>
}