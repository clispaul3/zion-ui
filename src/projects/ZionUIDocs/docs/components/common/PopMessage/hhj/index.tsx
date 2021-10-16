import { Demo, code } from "./demo01"
import React, { useEffect, useState } from "react"
import { PropertyService } from "zion-ui"
import { Card, Col, Collapse, Popover, Row } from 'antd';
import { DownSquareOutlined, UpSquareOutlined, CopyOutlined } from '@ant-design/icons';
import { Service } from "./service";
import tableJson from "./property/table.json"
import { LoadingApiData, apiDataEvent } from "./default";
import { code1, code2, code3, code4 } from "./default"
import { CodeEditors } from "./components/CodeEditors";
import { cloneDeep } from "lodash"
export const PopMessageDemo = () => {
  const [isDisplay, setIsDisplay] = useState(false)
  const { Panel } = Collapse;
  return <div>
    <Card actions={[
    ]}>
      <Card>
        <h2>代码演示</h2>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }}>
          <Demo />
        </div>
      </Card>
      <Row gutter={16}>
        <Col span={12}>
          <CodeEditors code={code1}></CodeEditors>
        </Col>
        <Col span={12}>
          <CodeEditors code={code2}></CodeEditors>
        </Col>
        <Col span={12}>
          <CodeEditors code={code3}></CodeEditors>
        </Col>
        <Col span={12}>
          <CodeEditors code={code4}></CodeEditors>
        </Col>
      </Row>
    </Card>
    <Card>
      <Collapse defaultActiveKey={[]} >
        <Panel header="UI属性" key="1">
          {PropertyService.getReactElementFromJSON(cloneDeep(tableJson), { Service: Service({ apiData: LoadingApiData }) })}
        </Panel>
        <Panel header="函数属性" key="3">
          {PropertyService.getReactElementFromJSON(cloneDeep(tableJson), { Service: Service({ apiData: apiDataEvent }) })}
        </Panel>
        <Panel header="注意事项" key="2">
        </Panel>
      </Collapse>
    </Card>
  </div>
}