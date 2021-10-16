import { Demo as Demo001, code as Code001 } from "./sugenglin/001"
import { Demo as Demo002, code as Code002 } from "./sugenglin/002"
import React from "react"
import { CodeEditor, Row, Col, Collapse, Table } from "zion-ui"
import { Typography, Empty } from 'antd';
// export const SelectMenuDemo = [
//   ["interface", "https://www.yuque.com/zhangyangbin-9bbif/sa0po2/zag1kf"],
//   ["示例-基本使用", Demo001, Code001],
//   ["示例-表单属性", Demo002, Code002],
// ]
export const SelectMenuData = [
  { name: "示例-基本使用", project: <Demo001 />, projectDemo: [Code001] },
  { name: "示例-表单属性", project: <Demo002 />, projectDemo: [Code002] },
]
export const SelectMenuDemo = () => {
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
      { key: "type", explain: "按钮类型", type: "link | button", requisite: "否" },
      { key: "placement", explain: "菜单弹出位置", type: "bottomLeft | bottomCenter | bottomRight | topLeft | topCenter | topRight", requisite: "否" },
      { key: "icon", explain: "右侧的小图标", type: "ReactNode", requisite: "否", default: "false" },
      { key: "disabled", explain: "菜单是否禁用", type: "boolean", requisite: "否", },
      { key: "text", explain: "下拉的内容", type: "string | ReactNode", requisite: "否", },
      { key: "trigger", explain: "触发下拉行为", type: `Array < click | hover | contextMenu >`, requisite: "否", },
      { key: "dataSource", explain: "下拉框数据", type: `IDataSourceItem[]`, requisite: "否", },
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
      { key: "onClick", explain: "点击下拉时触发的回调函数", type: "(params: EventHandlerResult, mobxState: IObservableObject) => void", requisite: "否" },
      { key: "onMenuClick", explain: "点击下拉数据的回调函数", type: "(params: EventHandlerResult, mobxState: IObservableObject) => void", requisite: "否" },
      { key: "onVisibleChange", explain: "显示隐藏的时候触发该函数", type: "(params: EventHandlerResult, mobxState: IObservableObject) => void", requisite: "否" },
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
      { key: "key", explain: "数据的标识符", type: "string | number", requisite: "是" },
      { key: "label", explain: "该数据的文本内容", type: "string", requisite: "是" },
      { key: "uiPid", explain: "父节点的key", type: "string | number | null", requisite: "否" },
      { key: "icon", explain: "这条数据的小图标", type: "ReactNode", requisite: "否" },
      { key: "disabled", explain: "是否禁用这条数据", type: "boolean", requisite: "否" },
      { key: "render", explain: "渲染数据", type: "(data: IDataSourceItem) => ReactNode | string", requisite: "否" },
    ]
  }, true)
  return <Row style={{ width: "100%" }}>
    {
      SelectMenuData.map((item: any) => {
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
          <Panel header="事件属性" key="2">
            <Tpl2 />
          </Panel>
          <Panel header="IDataSourceItem" key="3">
            <Tpl3 />
          </Panel>
        </Collapse>,
      </Col>
    </Row>
  </Row>
}