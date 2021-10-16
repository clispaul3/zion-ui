import { Demo as Demo001, code1_1 as Code001_1, code1_2 as Code001_2 } from "./sugenglin/001"
import { Demo as Demo002, code2_1 as Code002_1, code2_2 as Code002_2, code2_3 as Code002_3 } from "./sugenglin/002"
import { Demo as Demo003, code as Code003 } from "./sugenglin/003"
import { Demo as Demo004, code4_1 as Code004_1, code4_2 as Code004_2, code4_3 as Code004_3, code4_4 as Code004_4 } from "./sugenglin/004"
import { Demo as Demo005, code5_1 as Code005_1, code5_2 as Code005_2, code5_3 as Code005_3, code5_4 as Code005_4, code5_5 as Code005_5 } from "./sugenglin/005"
import React from "react"
import { CodeEditor, Row, Col, Collapse, Table } from "zion-ui"
import { Typography, Empty } from 'antd';
const PopModalData = [
  { name: "示例-基本使用", project: <Demo001 />, projectDemo: [Code001_1, Code001_2] },
  { name: "示例-拖拽/拉伸/全屏", project: <Demo002 />, projectDemo: [Code002_1, Code002_2, Code002_3] },
  { name: "示例-事件回调", project: <Demo003 />, projectDemo: [Code003] },
  { name: "示例-footer配置", project: <Demo004 />, projectDemo: [Code004_1, Code004_2, Code004_3, Code004_4] },
  { name: "示例-静态方法", project: <Demo005 />, projectDemo: [Code005_1, Code005_2, Code005_3, Code005_4, Code005_5] },
]
export const PopModalDemo = () => {
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
      { key: "title", explain: "弹窗标题", type: "string | ReactNode(组件)", requisite: "否", default: "弹窗标题" },
      { key: "content", explain: "弹窗内容", type: "ReactNode(组件)", requisite: "否", },
      { key: "footer", explain: "弹窗尾部", type: "ReactNode | null", requisite: "否", },
      { key: "fullScreen", explain: "弹窗全屏", type: "boolean", requisite: "否", default: "false" },
      { key: "allowDrag", explain: "是否可拖拽", type: "boolean", requisite: "否", default: "false" },
      { key: "allowResize", explain: "是否可拉伸", type: "boolean", requisite: "否", default: "false" },
      { key: "allowFullScreen", explain: "是否展示全屏按钮", type: "boolean", requisite: "否", default: "true" },
      { key: "top", explain: "距离上边的位置", type: "string", requisite: "否", default: "0px" },
      { key: "width", explain: "宽度", type: "string", requisite: "否", default: "50%" },
      { key: "height", explain: "高度", type: "string", requisite: "否", default: "50%" },
      { key: "keyboard", explain: "是否支持Esc按钮关闭", type: "boolean", requisite: "否", default: "false" },
      { key: "maskClosable", explain: "是否支持点击遮罩层关闭", type: "boolean", requisite: "否", default: "false" },
      { key: "showMask", explain: "是否显示遮罩层", type: "boolean", requisite: "否", },
      { key: "maskStyle", explain: "遮罩层样式", type: "CSSProperties", requisite: "否", },
      { key: "zIndex", explain: "弹窗层级", type: "number", requisite: "否", },
      { key: "visible", explain: "是否显示弹窗", type: "boolean", requisite: "否", default: "true" },
      { key: "okText", explain: "弹窗确定按钮的内容", type: "ReactNode | string", requisite: "否", default: "确定" },
      { key: "onOk", explain: "确定按钮事件(建议用这个)", type: "(params: EventHandlerResult, state: IObservableObject) => void", requisite: "否" },
      { key: "onConfirm", explain: "确定按钮事件", type: "(params: EventHandlerResult, state: IObservableObject) => void", requisite: "否", },
      { key: "onCancel", explain: "关闭按钮事件", type: "() => void", requisite: "否" },
      { key: "onClose", explain: "关闭按钮事件(建议用这个)", type: "() => void", requisite: "否" }
    ]
  }, true)

  return <Row style={{ width: "100%" }}>
    {
      PopModalData.map((item: any) => {
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
            <Tpl />
          </Panel>
        </Collapse>,
      </Col>
    </Row>
  </Row>
}