import { Demo01, code01 } from "./demo01"
import React from "react"
import { PropertyService, } from "zion-ui"
import { Card, Collapse } from 'antd';
import { Service } from "./service";
import tableJson from "./property/table.json"
import { CodeEditors } from "../../DateTime/hhj/components/CodeEditors"; //出错请查看DateTime/hhj/components/CodeEditors 是否有CodeEditors这个组件
import { cloneDeep } from "lodash"
import { apiData, apiDataEvent } from "./default";
export const ColorPickerDemo = () => {
  const { Panel } = Collapse;
  return <div>
    <Card>
      <Card title="示例-基本使用">
        <div >
          <Demo01 />
        </div>
      </Card>
      <CodeEditors code={code01}></CodeEditors>
    </Card>
    <Card>
      <Collapse defaultActiveKey={[]} >
        <Panel header="UI属性" key="1">
          {PropertyService.getReactElementFromJSON(cloneDeep(tableJson), { Service: Service({ apiData: apiData }) })}
        </Panel>
        <Panel header="事件属性" key="3">
          {PropertyService.getReactElementFromJSON(cloneDeep(tableJson), { Service: Service({ apiData: apiDataEvent }) })}
        </Panel>
        <Panel header="注意事项" key="2">
        </Panel>
      </Collapse>
    </Card>
  </div>
}