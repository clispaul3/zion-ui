import React from 'react'
import { Card, Collapse } from 'antd'
import { Demo001, code001 } from './001'
import { Demo002, code002 } from  './002'
import { Col, Row, CodeEditor,Divider } from 'zion-ui'
import { Api } from './components/api'
import { copy } from './components/copy'

const { Panel } = Collapse
const CenterDivider = Divider({
    content: "API属性",
     plain: true,
  }, true)
export const SelectCascadeDemo = () => {
  return <div>
    <div style={{ margin:"0 20px 0 20px" }}>
    <Row gutter={16}>
      <Col span={12}>
        <Card title="基本使用">
          <Demo001 />
        </Card>
      </Col >
      <Col span={12}>
        <Card title="表单属性">
          <Demo002 />
        </Card>
      </Col>
    </Row>
    <Row gutter={16}>
      <Col span={12}>
        <Collapse defaultActiveKey={["1"]}>
        <Panel header="展开查看代码" key="0" extra={copy(code001)}>
          <CodeEditor value={code001} language="jsx" />
        </Panel>
      </Collapse>
      </Col>
      <Col span={12}>
      <Collapse defaultActiveKey={["1"]}>
        <Panel header="展开查看代码" key="0" extra={copy(code002)}>
          <CodeEditor value={code002} language="jsx" />
        </Panel>
      </Collapse>
      </Col>
    </Row>
    <CenterDivider />
    </div>
    <Api />
  </div>
}


