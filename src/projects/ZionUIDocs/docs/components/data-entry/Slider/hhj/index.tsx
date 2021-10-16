import { Demo01, code01, code02 } from "./demo01"
import React from "react"
import { Col, PropertyService, Row, } from "zion-ui"
import { Card, Collapse } from 'antd';
import { Service } from "./service";
import tableJson from "./property/table.json"
import { CodeEditors } from "../../DateTime/hhj/components/CodeEditors"; //出错请查看DateTime/hhj/components/CodeEditors 是否有CodeEditors这个组件
import { cloneDeep } from "lodash"
import { ApiData, dataFun } from "./default"
export const SliderDemo = () => {
  const { Panel } = Collapse;
  return <div>
    <Card>
      <Card title="示例-基本使用">
        <div >
          <Demo01 />
        </div>
      </Card>
      <Row gutter={16}>
        <Col span={12}><CodeEditors code={code01}></CodeEditors></Col>
        <Col span={12}><CodeEditors code={code02}></CodeEditors></Col>
      </Row>

    </Card>
    <Card>
      <Collapse defaultActiveKey={[]} >
        <Panel header="API" key="1">
          {PropertyService.getReactElementFromJSON(cloneDeep(tableJson), { Service: Service({ apiData: ApiData }) })}
        </Panel>
        <Panel header="tooltip方法" key="3">
          {PropertyService.getReactElementFromJSON(cloneDeep(tableJson), { Service: Service({ apiData: dataFun }) })}
        </Panel>
        <Panel header="注意事项" key="2">
        </Panel>
      </Collapse>
    </Card>
  </div>
}