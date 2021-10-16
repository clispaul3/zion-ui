import React from 'react';
import { DateTime } from "zion-ui";
import { Row, Col } from "antd";

export const Demo = function () {
  return <Row>
    <Col span={6} style={{ padding: "10px" }}>
      <DateTime placeholder="WEEK" type="WEEK" />
    </Col>
    <Col span={6} style={{ padding: "10px" }}>
      <DateTime type="RANGEDATE" placeholder={["开始日期", "结束日期"]} />
    </Col>
    <Col span={6} style={{ padding: "10px" }}>
      <DateTime type="RANGEDATETIME" placeholder={["开始时间", "结束时间"]} />
    </Col>
    <Col span={6} style={{ padding: "10px" }}>
      <DateTime type="RANGEMONTH" placeholder={["开始月份", "结束月份"]} />
    </Col>
  </Row>
}

export const code = `
import React from 'react';
import { DateTime } from "zion-ui";
import { Row, Col } from "antd";

export const Demo = function () {
  return <Row>
    <Col span={6} style={{ padding: "10px" }}>
      <DateTime placeholder="" type="WEEK" />
    </Col>
    <Col span={6} style={{ padding: "10px" }}>
      <DateTime type="RANGEDATE" placeholder={["开始日期", "结束日期"]} />
    </Col>
    <Col span={6} style={{ padding: "10px" }}>
      <DateTime type="RANGEDATETIME" placeholder={["开始时间", "结束时间"]} />
    </Col>
    <Col span={6} style={{ padding: "10px" }}>
      <DateTime type="RANGEMONTH" placeholder={["开始月份", "结束月份"]} />
    </Col>
  </Row>
}
`