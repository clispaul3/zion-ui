import { Demo01, code01 } from "./demo01"
import React from "react"
import { PropertyService } from "zion-ui"
import { Card, Collapse } from 'antd';

import { Service, ServiceEvent } from "./service";
import tableJson from "./property/table.json"
import tableJsonEvent from "./property/tableEvent.json"
import { CodeEditors } from "../../DateTime/hhj/components/CodeEditors"; //出错请查看DateTime/hhj/components/CodeEditors 是否有CodeEditors这个组件
export const RateDemo = () => {
  const { Panel } = Collapse;
  return <div>
    <Card>
      <Card title="示例-基本使用">
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }}>
          <Demo01 />
        </div>
      </Card>
      <CodeEditors code={code01}></CodeEditors>
    </Card>
    <Card>
      <Collapse defaultActiveKey={[]} >
        <Panel header="Ui属性" key="1">
          {PropertyService.getReactElementFromJSON(tableJson, { Service })}
        </Panel>
        <Panel header="事件属性" key="2">
          {PropertyService.getReactElementFromJSON(tableJsonEvent, { ServiceEvent })}
        </Panel>
        <Panel header="注意事项" key="3">

        </Panel>
      </Collapse>
    </Card>
  </div>
}