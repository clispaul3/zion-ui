
import React from 'react';
import { DateTime } from "zion-ui";
import { Row, Col } from "antd";
import moment from "moment";

export const Demo04 = function () {
  const format = "YYYY[年]MM[月]DD[日]"
  return <Row>
    <Col span={12} style={{ padding: "10px" }}>
      <DateTime
        label="出生年月"
        required={true}
        allowClear={false}
        value={moment().format(format)}
        style={{ width: "90%" }}
        placeholder="格式化"
        format={format}
        disabledDate={date => {
          return date.isBefore(moment())
        }} />
    </Col>
  </Row>
}
export const code04 = `


import React from 'react';
import { DateTime } from "zion-ui";
import { Row, Col } from "antd";
import moment from "moment";

export const Demo = function () {
  const format = "YYYY[年]MM[月]DD[日]"
  return <Row>
    <Col span={12} style={{ padding: "10px" }}>
      <DateTime
        label="出生年月"
        required={true}
        allowClear={false}
        value={moment().format(format)}
        style={{ width: "90%" }}
        placeholder="格式化"
        format={format}
        disabledDate={date => {
          return date.isBefore(moment())
        }} />
    </Col>
  </Row>
}
`