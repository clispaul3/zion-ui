import { Demo as Demo001, code1_1 as Code001_1, code1_2 as Code001_2 } from "./sugenglin/001"
import { CodeEditor, Row, Col, Collapse, Table } from "zion-ui"
import { Typography } from 'antd';
import React from "react"
// export const PopTipDemo = [
//   ["interface", "https://www.yuque.com/zhangyangbin-9bbif/sa0po2/zz7qso"],
//   ["示例-基本使用", Demo001, Code001],
// ]

export const PopTipDemo = () => {
  const { Panel } = Collapse
  const Tpl = Table({
    columns: [
      { title: "参数", dataIndex: "key", width: 100, align: "left" },
      { title: "说明", dataIndex: "explain", width: 120, align: "left" },
      { title: "类型", dataIndex: "type", align: "left" },
      { title: "是否必填", dataIndex: "requisite", width: 120, align: "left" },
    ],
    rowKey: "key",
    dataSource: [
      { key: "title", explain: "提示内容", type: "string | ReactNode(组件)", requisite: "是", },
      { key: "content", explain: "展示内容", type: "ReactNode(组件)", requisite: "是", },
      { key: "trigger", explain: "触发方式", type: `click | hover | focus`, requisite: "否", },
      { key: "placement", explain: "位置", type: "top | left | right | bottom | topLeft | topRight | bottomLeft | bottomRight | leftTop | leftBottom | rightTop | rightBottom", requisite: "否", }
    ]
  }, true)
  return <Row style={{ width: "100%" }}>
    <Row style={{ width: "100%" }}>
      <Col span={23} style={{ border: "1px solid #1890ff", borderRadius: "3px", padding: "5px", margin: "5px" }}>
        <h2>PopTip文字提示</h2>
        <p>代码演示：</p>
        <div style={{ paddingLeft: "70px" }}>
          <Demo001 />
        </div>
        <Collapse>
          <Panel header="代码" key="1">
            <Row>
              <Col span={12}><CodeEditor value={Code001_1} language="jsx" style={{ paddingTop: "10px", height: "450px" }} /></Col>
              <Col span={12}><CodeEditor value={Code001_2} language="jsx" style={{ paddingTop: "10px", height: "450px" }} /></Col>
            </Row>
          </Panel>
          <Panel header="UI属性" key="2">
            <Tpl />
          </Panel>
          <Panel header="注意事项" key="3">
            <Typography.Paragraph mark>请确保content能接受 onMouseEnter、onMouseLeave、onFocus、onClick 事件作为props</Typography.Paragraph>
            <Typography.Paragraph mark>zion-ui中的大部分组件不接受以上事件，content可以是原生标签或其他第三方支持以上事件的组件</Typography.Paragraph>
          </Panel>
        </Collapse>,
      </Col>
    </Row>
  </Row>
}