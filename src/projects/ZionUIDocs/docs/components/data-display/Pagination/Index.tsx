import { Demo1, code1_1 } from "./demo/001"
import { Demo2, code2_1, code2_2, code2_3, code2_4 } from "./demo/002"
import { Demo3 } from "./demo/003"
import React from "react"
import { CodeEditor, Row, Col, Collapse, Table } from "zion-ui"
import { Typography, Empty } from 'antd';
const PopModalData = [
  { name: "示例-基本使用", project: <Demo1 />, projectDemo: [code1_1] },
  { name: "示例-其他属性", project: <Demo2 />, projectDemo: [code2_1, code2_2, code2_3, code2_4] },
  { name: "示例-其他属性", project: <Demo3 />, projectDemo: [code2_1, code2_2, code2_3, code2_4] },
]
export const PaginationDemo = () => {
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
      { key: "page", explain: "页码数", type: "number", requisite: "否", default: "1" },
      { key: "pageSize", explain: "每页条数", type: "number", requisite: "否", default: "10" },
      { key: "pageSize", explain: "每页条数", type: "number", requisite: "否", default: "10" },
      { key: "pageSizeOptions", explain: "指定每页可以显示多少条", type: "string[]", requisite: "否" },
      { key: "disabled", explain: "是否禁用", type: "boolean", requisite: "否", default: "false" },
      { key: "showQuickJumper", explain: "是否可以快速跳转至某页", type: "boolean", requisite: "否" },
      { key: "total", explain: "数据总数", type: "number", requisite: "否" },
      { key: "simple", explain: "简易模式", type: "boolean", requisite: "否" },
      { key: "type", explain: "尺寸大小", type: "default | small", requisite: "否", default: "default" },
      { key: "showTotal", explain: "展示头部提示", type: "boolean | ((total: number, range: [number, number]) => ReactNode)", requisite: "否" },
      { key: "onChange", explain: "页码或 pageSize 改变的回调，参数是改变后的页码及每页条数", type: "(params: ({ page: number, pageSize: number }), state: IObservableObject) => void", requisite: "否" },

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