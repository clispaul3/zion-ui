import React from 'react'
import { Card } from 'antd'
import { Demo001, code001 } from './001'
import { Demo002, code002 } from  './002'
import { Demo004, code004 } from  './004'
import { Demo005, code005 } from './005'
import { Demo007, code007 } from  './007'
import { Demo008, code008 } from  './008'
import { Demo009, code009 } from './009'
import { Demo010, code010 } from  './010'
import { Col, Row, Divider } from 'zion-ui'
import { CodeEditors } from "../../../common/PopMessage/hhj/components/CodeEditors"
import { Api } from "./components/api"

const CenterDivider = Divider({
    content: "API属性",
     plain: true,
  }, true)
export const TableBaseDemo = () => {
return <div>
    <div style={{ margin:"0 20px 0 20px" }}>
    <Row gutter={24}>
      <Col span={24}>
        <Card title={[<strong>基本使用</strong>]}>
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
        <Card title={[<strong>分页①</strong>]}>
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
        <Card title={[<strong>分页②</strong>]}>
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
        <Card title={[<strong>展示选中的数据</strong>]}>
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
        <Card title={[<strong>httpConfig.init</strong>]}>
          <Demo007 />
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
        <Card title={[<strong>滚动条配置</strong>]}>
          <Demo008 />
        </Card>
      </Col >
    </Row>
    <Row gutter={24}>
      <Col span={24}>
       <CodeEditors code={code008}></CodeEditors>
      </Col>
    </Row>
    <Row gutter={24}>
      <Col span={24}>
        <Card title={[<strong>无边框</strong>]}>
          <Demo009 />
        </Card>
      </Col >
    </Row>
    <Row gutter={24}>
      <Col span={24}>
       <CodeEditors code={code009}></CodeEditors>
      </Col>
    </Row>
    <Row gutter={24}>
      <Col span={24}>
        <Card title={[<strong>列对齐</strong>]}>
          <Demo010 />
        </Card>
      </Col >
    </Row>
    <Row gutter={24}>
      <Col span={24}>
       <CodeEditors code={code010}></CodeEditors>
      </Col>
    </Row>
    <CenterDivider />
    </div>
    <Api />
  </div>
}