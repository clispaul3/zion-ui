import { Demo01, code01, code02, code03, code05, code04 } from "./demo01"
import React from "react"
import { Col, PropertyService, Row, } from "zion-ui"
import { Card, Collapse } from 'antd';
import { Service } from "./service";
import tableJson from "./property/table.json"
import { CodeEditors } from "../../DateTime/hhj/components/CodeEditors"; //出错请查看DateTime/hhj/components/CodeEditors 是否有CodeEditors这个组件
import { code002, Demo02 } from "./demo02";
export const SwitchDemo = () => {
  const { Panel } = Collapse;
  return <div>
    <Card>
      <Card title="示例-基本使用">
        <div >
          <Demo01 />
        </div>
      </Card>
      <Row gutter={16}>
        <Col span={8}> <CodeEditors code={code01}></CodeEditors></Col>
        <Col span={8}> <CodeEditors code={code02}></CodeEditors></Col>
        <Col span={8}> <CodeEditors code={code03}></CodeEditors></Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}> <CodeEditors code={code04}></CodeEditors></Col>
        <Col span={12}> <CodeEditors code={code05}></CodeEditors></Col>
      </Row>
    </Card>
    <Card>
      <Card title="示例-受控案例">
        <Demo02 />
      </Card>

      <CodeEditors code={code002}></CodeEditors>
    </Card>
    <Card>
      <Collapse defaultActiveKey={[]} >
        <Panel header="API" key="1">
          {PropertyService.getReactElementFromJSON(tableJson, { Service })}
        </Panel>
        <Panel header="注意事项" key="2">
        </Panel>
      </Collapse>
    </Card>
  </div>
}