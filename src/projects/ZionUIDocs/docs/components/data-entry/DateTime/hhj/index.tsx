import { Demo01, code01, code0102, code0103, code0104 } from "./demo01"
import React from "react"
import { Col, PropertyService, Row } from "zion-ui"
import { Card, Collapse } from 'antd';
import { Service, ServiceEvent } from "./service";
import tableJson from "./property/table.json"
import tableEventJson from "./property/tableEvent.json"
import { CodeEditors } from "./components/CodeEditors";  //出错请查看DateTime/hhj/components/CodeEditors 是否有CodeEditors这个组件
import { Demo02, code02, code0202, code0203, code0204 } from "./demo02";
import { code03, Demo03 } from "./demo03";
import { code04, Demo04 } from "./demo04";
import { cloneDeep } from "lodash";
export const DateTimeDemo = () => {

  const { Panel } = Collapse;
  return <div>
    <Card hoverable >
      <Card title="示例-基本使用①" >
        {/* <h2>示例-基本使用①</h2> */}
        <div style={{ padding: "20px" }}>
          <Demo01 />
        </div>
      </Card>
      <Row gutter={16}>
        <Col span={12}>
          <CodeEditors code={code01}></CodeEditors>
        </Col>
        <Col span={12}>
          <CodeEditors code={code0102}></CodeEditors>
        </Col>
        <Col span={12}>
          <CodeEditors code={code0103}></CodeEditors>
        </Col>
        <Col span={12}>
          <CodeEditors code={code0104}></CodeEditors>
        </Col>
      </Row>
    </Card>
    <br></br>
    <Card hoverable>
      <Card title="示例-基本使用②">
        {/* <h2>示例-基本使用②</h2> */}
        <div style={{ padding: "20px" }}>
          <Demo02 />
        </div>
      </Card>
      <Row gutter={16}>
        <Col span={12}>
          <CodeEditors code={code02}></CodeEditors>
        </Col>
        <Col span={12}>
          <CodeEditors code={code0202}></CodeEditors>
        </Col>
        <Col span={12}>
          <CodeEditors code={code0203}></CodeEditors>
        </Col>
        <Col span={12}>
          <CodeEditors code={code0204}></CodeEditors>
        </Col>
      </Row>
    </Card>
    <br></br>
    <Card hoverable>
      <Card title="示例-禁用">
        {/* <h2>示例-基本使用②</h2> */}
        <div style={{ textAlign: "center", padding: "20px" }}>
          <Demo03 />
        </div>
      </Card>
      <CodeEditors code={code03}></CodeEditors>
    </Card>
    <br></br>
    <Card hoverable>
      <Card title="示例-格式化">
        {/* <h2>示例-基本使用②</h2> */}
        <div style={{ textAlign: "center", padding: "20px" }}>
          <Demo04 />
        </div>
      </Card>
      <CodeEditors code={code04}></CodeEditors>
    </Card>
    <br></br>
    <Card hoverable style={{ marginBottom: "20px" }}>
      <Collapse defaultActiveKey={[]} >
        <Panel header="UI属性" key="1">
          {PropertyService.getReactElementFromJSON(cloneDeep(tableJson), { Service })}
        </Panel>
        <Panel header="事件属性" key="2">
          {PropertyService.getReactElementFromJSON(cloneDeep(tableEventJson), { ServiceEvent })}
        </Panel>
        <Panel header="注意事项" key="3">
        </Panel>
      </Collapse>
    </Card>
  </div>
}