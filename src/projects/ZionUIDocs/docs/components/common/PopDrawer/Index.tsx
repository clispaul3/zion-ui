import { Demo as Demo001, code1_1 as Code001_1, code1_2 as Code001_2 } from "./sugenglin/001"
import { Demo as Demo002, code2_1 as Code002_1, code2_2 as Code002_2, code2_3 as Code002_3, code2_4 as Code002_4 } from "./sugenglin/002"
import { Demo as Demo003, code as Code003 } from "./sugenglin/003"
import { Demo as Demo004, code4_1 as Code004_1, code4_2 as Code004_2, code4_3 as Code004_3, code4_4 as Code004_4 } from "./sugenglin/004"
import { Demo as Demo005, code5_1 as Code005_1, code5_2 as Code005_2 } from "./sugenglin/005"
import React from "react"
import { Typography, Empty } from 'antd';
import { CodeEditor, Row, Col, Collapse, Table } from "zion-ui"
export const PopDrawerData = [
  { name: "示例-基本使用", project: <Demo001 />, projectDemo: [Code001_1, Code001_2] },
  { name: "示例-弹窗位置", project: <Demo002 />, projectDemo: [Code002_1, Code002_2, Code002_3, Code002_4] },
  { name: "示例-事件回调", project: <Demo003 />, projectDemo: [Code003] },
  { name: "示例-footer配置", project: <Demo004 />, projectDemo: [Code004_1, Code004_2, Code004_3, Code004_4] },
  {
    name: "示例-设置宽度/高度", project: <Demo005 />, projectDemo: [Code005_1, Code005_2], reminder: <>
      <Typography.Paragraph mark>仅当placement = top | bottom 时，设置高度有效</Typography.Paragraph>
      <Typography.Paragraph mark>仅当placement = right | left 时，设置宽度有效</Typography.Paragraph>
    </>
  }
]
export const PopDrawerDemo = () => {
  const { Panel } = Collapse
  const Tpl = Table({
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
      { key: "title", explain: "弹窗标题", type: "string | ReactNode(组件)| null", requisite: "否", default: "弹窗标题" },
      { key: "content", explain: "弹窗内容", type: "ReactNode(组件)", requisite: "否", },
      { key: "footer", explain: "弹窗尾部", type: "ReactNode | null", requisite: "否" },
      { key: "placement", explain: "弹出位置", type: `right | top | left | bottom`, requisite: "否", default: "right" },
      { key: "width", explain: "弹窗宽度", type: `string`, requisite: "否", default: "30%" },
      { key: "height", explain: "弹窗高度", type: `string`, requisite: "否", default: "30%" },
      { key: "keyboard", explain: "是否支持Esc按钮关闭", type: `boolean`, requisite: "否", default: "true" },
      { key: "maskClosable", explain: "是否支持点击遮罩层关闭", type: `boolean`, requisite: "否", default: "true" },
      { key: "maskStyle", explain: "遮罩层样式", type: `CSSProperties`, requisite: "否" },
      { key: "zIndex", explain: "弹窗层级", type: `number`, requisite: "否" },
      { key: "visible", explain: "是否显示弹窗", type: `boolean`, requisite: "否", default: "true" },
      { key: "cancelText", explain: "关闭按钮内容", type: `string`, requisite: "否", default: "关闭" },
      { key: "okText", explain: "确定按钮内容", type: `string`, requisite: "否", default: "确定" },
      { key: "onOk", explain: "确定按钮(事件)", type: `(params: EventHandlerResult, mobxProps: IObservableObject) => void`, requisite: "否" },
      { key: "onConfirm", explain: "确定按钮(事件)", type: `(params: EventHandlerResult, mobxProps: IObservableObject) => void`, requisite: "否" },
      { key: "onCancel", explain: "关闭按钮(事件)", type: `() => void`, requisite: "否" },
      { key: "onClose", explain: "关闭按钮(事件)", type: `() => void`, requisite: "否" },
    ]
  }, true)

  return <Row style={{ width: "100%" }}>
    {
      PopDrawerData.map(item => {
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
                      return <Col span={12} key={i}><CodeEditor value={ele} language="jsx" style={{ paddingTop: "10px", height: "600px" }} /></Col>
                    })
                  }
                </Row>
              </Panel>
              <Panel header="注意事项" key="2">
                {item.reminder ? item.reminder : <Empty description="暂无" />}
              </Panel>
            </Collapse>
          </Col>
        </Row>
      })
    }
    <Row style={{ width: "100%" }}>
      <Col span={23} style={{ border: "1px solid #1890ff", borderRadius: "3px", padding: "5px", margin: "5px" }}>
        <Collapse>
          <Panel header="UI属性" key="1">
            <Tpl />
          </Panel>
        </Collapse>,
      </Col>
    </Row>
  </Row>
}