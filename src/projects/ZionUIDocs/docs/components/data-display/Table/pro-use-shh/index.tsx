import React from 'react'
import { Card } from 'antd'
import { Demo001, code001 } from './001'
import { Demo002, code002 } from  './002'
import { Demo003, code003 } from './003'
import { Demo004, code004 } from  './004'
import { Demo005, code005 } from './005'
import { Demo006, code006 } from './006'
import { Demo007, code007 } from  './007'
import { Demo008, code008 } from  './008'

import { Col, Row } from 'zion-ui'
import { CodeEditors } from "../../../common/PopMessage/hhj/components/CodeEditors"

export const TableProDemo = () => {
return <div>
    <div style={{ margin:"0 20px 0 20px" }}>
    <Row gutter={24}>
      <Col span={24}>
        <Card title={[<strong>行按钮</strong>]}>
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
        <Card title={[<strong>表头①</strong>]}>
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
        <Card title={[<strong>表头②</strong>]}>
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
        <Card title={[<strong>表头③</strong>]}>
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
        <Card title={[<strong>httpConfig.delete</strong>]}>
          <Demo005 />
        </Card>
      </Col >
    </Row>
    <Row gutter={24}>
      <Col span={24}>
       <CodeEditors code={code005}></CodeEditors>
      </Col>
    </Row>
    <Row gutter={24}>
      <Col span={24}>
        <Card title={[<strong>httpConfig.onSearch</strong>]}>
          <Demo007 />
        </Card>
      </Col >
    </Row>
     <Row gutter={24}>
      <Col span={24}>
       <CodeEditors code={code006}></CodeEditors>
      </Col>
    </Row>
    <Row gutter={24}>
      <Col span={24}>
        <Card title={[<strong>树形表格①</strong>]}>
          <Demo006 />
        </Card>
      </Col >
    </Row>
    <Row gutter={24}>
      <Col span={24}>
       <CodeEditors code={code007}></CodeEditors>
      </Col>
    </Row>
    <Row gutter={24}>
      <Col span={24}>
        <Card title={[<strong>树形表格②</strong>]}>
          <Demo008 />
        </Card>
      </Col >
    </Row>
    <Row gutter={24}>
      <Col span={24}>
       <CodeEditors code={code008}></CodeEditors>
      </Col>
    </Row>
    </div>
  </div>
}