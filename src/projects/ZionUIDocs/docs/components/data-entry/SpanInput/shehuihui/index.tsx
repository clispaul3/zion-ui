import React from 'react'
import { Card, Collapse } from 'antd'
import { Demo, code } from './001'
import { Col, Row, CodeEditor, Divider } from 'zion-ui'
import { copy } from '../../SelectCascade/shehuihui/components/copy'
import { Api } from './components/api'

const { Panel } = Collapse
const CenterDivider = Divider({
    content: "API属性",
     plain: true,
  }, true)
export const SpanInputDemo = () => {
  return <div>
    <div style={{ margin:"0 20px 0 20px" }}>
    <Row gutter={16}>
      <Col span={12}>
        <Card title="基本使用">
          <Demo />
        </Card>
      </Col >
    </Row>
    <Row gutter={16}>
      <Col span={12}>
        <Collapse defaultActiveKey={["1"]}>
        <Panel header="展开查看代码" key="0" extra={copy(code)}>
          <CodeEditor value={code} language="jsx" />
        </Panel>
      </Collapse>
      </Col>
    </Row>
    <CenterDivider />
    </div>
    <Api />
  </div>
}