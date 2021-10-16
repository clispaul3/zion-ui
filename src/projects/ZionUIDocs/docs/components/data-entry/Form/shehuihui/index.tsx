import React from 'react'
import { Card, Collapse } from 'antd'
import { Demo001, code001 } from './001'
import { Demo002, code002 } from  './002'
import { Demo003, code003 } from './003'
import { Demo004, code004 } from  './004'
import { Col, Row, CodeEditor, Divider } from 'zion-ui'
import { Api } from './components/api'
import { copy } from '../../SelectCascade/shehuihui/components/copy'

const { Panel } = Collapse
const CenterDivider = Divider({
    content: "API属性",
     plain: true,
  }, true)
export const FormDemo = () => {
  return <div>
    <div style={{ margin:"0 20px 0 20px" }}>
    <Row gutter={24}>
      <Col span={12}>
        <Card title="基本使用">
          <Demo001 />
        </Card>
      </Col >
      <Col span={12}>
        <Card title="数据回填">
          <Demo002 />
        </Card>
      </Col>
    </Row>
    <Row gutter={24}>
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
    <Row gutter={24} style={{ marginTop:"10px"}}>
      <Col span={12}>
        <Card title="关联控制">
          <Demo003 />
        </Card>
      </Col >
      <Col span={12}>
        <Card title="详情状态">
          <Demo004 />
        </Card>
      </Col>
    </Row>
    <Row gutter={24}>
      <Col span={12}>
        <Collapse defaultActiveKey={["1"]}>
        <Panel header="展开查看代码" key="0" extra={copy(code003)}>
          <CodeEditor value={code003} language="jsx" />
        </Panel>
      </Collapse>
      </Col>
      <Col span={12}>
      <Collapse defaultActiveKey={["1"]}>
        <Panel header="展开查看代码" key="0" extra={copy(code004)}>
          <CodeEditor value={code004} language="jsx" />
        </Panel>
      </Collapse>
      </Col>
    </Row>
    <CenterDivider />
    </div>
    <Api />
  </div>
}