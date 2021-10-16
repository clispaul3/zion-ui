import React from 'react';
import { DateTime, Button, StateManage } from "zion-ui";
import { Row, Col } from "antd";
import moment from "moment";

export const Demo = function () {
  const controlKey = "DateTime.Demo003"
  return <Row>
    <Col span={12} style={{ padding: "10px" }}>
      <DateTime
        controlKey={controlKey}
        style={{ width: "90%" }}
        placeholder="禁用今天之前的日期"
        disabledDate={date => {
          return date.isBefore(moment())
        }} />
    </Col>
    <Col span={12}>
      <Button
        onClick={function () {
          StateManage.set(controlKey, { disabled: true })
        }}
        style={{ display: "block", marginBottom: "5px" }}
        text="禁用"
        type="primary" />
      <Button
        onClick={function () {
          StateManage.set(controlKey, { disabled: false })
        }}
        style={{ display: "block" }}
        text="取消禁用"
        type="danger" />
    </Col>
  </Row>
}

export const code = `
import React from 'react';
import { DateTime, Button, StateManage } from "zion-ui";
import { Row, Col } from "antd";
import moment from "moment";

export const Demo = function () {
  const controlKey = "DateTime.Demo003"
  return <Row>
    <Col span={12} style={{ padding: "10px" }}>
      <DateTime
        controlKey={controlKey}
        style={{ width: "90%" }}
        placeholder="禁用今天之前的日期"
        disabledDate={date => {
          return date.isBefore(moment())
        }} />
    </Col>
    <Col span={12}>
      <Button
        onClick={function () {
          StateManage.set(controlKey, { disabled: true })
        }}
        style={{ display: "block", marginBottom: "5px" }}
        text="禁用"
        type="primary" />
      <Button
        onClick={function () {
          StateManage.set(controlKey, { disabled: false })
        }}
        style={{ display: "block" }}
        text="取消禁用"
        type="danger" />
    </Col>
  </Row>
}
`