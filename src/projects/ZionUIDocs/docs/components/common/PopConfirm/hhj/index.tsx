import { Demo } from "./demo01"
import React, { useEffect, useState } from "react"
import { Col, PropertyService, Row } from "zion-ui"
import { Card, Collapse, Popover } from 'antd';
import { LoadingApiData, apiDataEvent } from "./default"
import { Service } from "./service";
import tableJson from "./property/table.json"
import { CodeEditors } from "../../PopMessage/hhj/components/CodeEditors";
import { code1, code2 } from "./default";
import { cloneDeep } from "lodash"
export const PopConfirmDemo = () => {
  const [isDisplay, setIsDisplay] = useState(false)
  const { Panel } = Collapse;
  return <div>
    <Card>
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
      </Row>
    </Card>
    <Card>
      <Collapse defaultActiveKey={["2"]} >
        <Panel header="UI属性" key="1">
          {PropertyService.getReactElementFromJSON(cloneDeep(tableJson), { Service: Service({ apiData: LoadingApiData }) })}
        </Panel>
        <Panel header="事件属性" key="3">
          {PropertyService.getReactElementFromJSON(cloneDeep(tableJson), { Service: Service({ apiData: apiDataEvent }) })}
        </Panel>
        <Panel header="注意事项" key="2">
          <div style={{
            width: "inherit",
            display: "block",
            whiteSpace: "normal"
          }}>请确保content能接受 onMouseEnter、onMouseLeave、onFocus、onClick 事件作为props
            zion-ui中的大部分组件不接受以上事件，content可以是原生标签或其他第三方支持以上事件的组件</div>
        </Panel>
      </Collapse>
    </Card>
  </div>
}