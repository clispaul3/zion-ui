import React from 'react'
import { Card } from 'antd'
import { Demo001, code001 } from './001'
import { Demo002, code002 } from  './002'
import { Demo003, code003 } from  './003'
import { Demo004, code004 } from  './004'
import { Demo005, code005 } from  './005'
import { Col, Row } from 'zion-ui'
import { CodeEditors } from "../../../common/PopMessage/hhj/components/CodeEditors"

export const TreeProDemo = () => {
return <div>
    <div style={{ margin:"0 20px 0 20px" }}>
    <Row gutter={24}>
      <Col span={24}>
        <Card title={[<strong>示例一</strong>]}>
          <Demo001 />
        </Card>
      </Col >
    </Row>
    <Row gutter={24}>
      <Col span={24}>
       <CodeEditors code={code001}></CodeEditors>
      </Col>
    </Row>
    <Row gutter={24}>
      <Col span={24}>
        <Card title={[<strong>示例二</strong>]}>
          <Demo002 />
        </Card>
      </Col >
    </Row>
    <Row gutter={24}>
      <Col span={24}>
       <CodeEditors code={code002}></CodeEditors>
      </Col>
    </Row>
    <Row gutter={24}>
      <Col span={24}>
        <Card title={[<strong>示例三</strong>]}>
          <Demo003 />
        </Card>
      </Col >
    </Row>
    <Row gutter={24}>
      <Col span={24}>
       <CodeEditors code={code003}></CodeEditors>
      </Col>
    </Row>
    <Row gutter={24}>
      <Col span={24}>
        <Card title={[<strong>示例四</strong>]}>
          <Demo004 />
        </Card>
      </Col >
    </Row>
    <Row gutter={24}>
      <Col span={24}>
       <CodeEditors code={code004}></CodeEditors>
      </Col>
    </Row>
    <Row gutter={24}>
      <Col span={24}>
        <Card title={[<strong>示例五</strong>]}>
          <Demo005 />
        </Card>
      </Col >
    </Row>
    <Row gutter={24}>
      <Col span={24}>
       <CodeEditors code={code005}></CodeEditors>
      </Col>
    </Row>
    </div>
  </div>
}