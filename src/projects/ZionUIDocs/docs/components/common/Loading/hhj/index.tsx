import { Demo01, code } from "./demo01"
import React, { useEffect, useState } from "react"
import { CodeEditor, Col, PropertyService, Row } from "zion-ui"
import { Card, Collapse, Popover } from 'antd';
import { DownSquareOutlined, UpSquareOutlined, CopyOutlined } from '@ant-design/icons';
import { Service } from "./service";
import tableJson from "./property/table.json"
import { CodeEditors } from "../../PopMessage/hhj/components/CodeEditors";
import { code1, code2 } from "./default";
export const LoadingDemo = () => {
  const { Panel } = Collapse;
  return <div>
    <Card>
      <Card>
        <h2>代码演示</h2>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }}>
          <Demo01 />
        </div>
      </Card>
      <Row gutter={16}>
        <Col span={12}>
          <CodeEditors code={code1}></CodeEditors>
        </Col>
        <Col span={12}>
          <CodeEditors code={code2}></CodeEditors>
        </Col>
      </Row>
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