import React from 'react'
import { Card, Collapse } from 'antd'
import { Demo, code } from './001'
import { Col, Row, Divider } from 'zion-ui'
import { CodeEditors } from "../../../common/PopMessage/hhj/components/CodeEditors"
import { Api } from "./components/api"

const CenterDivider = Divider({
    content: "API属性",
     plain: true,
  }, true)
export const SuperTableDemo = () => {
return <div>
    <div style={{ margin:"0 20px 0 20px" }}>
    <Row gutter={24}>
      <Col span={24}>
        <Card title={[<strong>基本使用</strong>]}>
          <Demo />
        </Card>
      </Col >
    </Row>
    <Row gutter={24}>
      <Col span={24}>
       <CodeEditors code={code}></CodeEditors>
      </Col>
    </Row>
    <CenterDivider />
    </div>
    <Api />
  </div>
}