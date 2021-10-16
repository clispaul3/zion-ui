import React from 'react';
import { DateTime } from "zion-ui";
import { Row, Col } from "antd";

export const Demo = function () {
  return <Row>
    <Col span={6} style={{ padding: "10px" }}>
      <DateTime placeholder="DATE" />
    </Col>
    <Col span={6} style={{ padding: "10px" }}>
      <DateTime type="DATETIME" placeholder="DATETIME" />
    </Col>
    <Col span={6} style={{ padding: "10px" }}>
      <DateTime type="MONTH" placeholder="MONTH" />
    </Col>
    <Col span={6} style={{ padding: "10px" }}>
      <DateTime type="TIME" placeholder="TIME" />
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
      <DateTime placeholder="DATE" />
    </Col>
    <Col span={6} style={{ padding: "10px" }}>
      <DateTime type="DATETIME" placeholder="DATETIME" />
    </Col>
    <Col span={6} style={{ padding: "10px" }}>
      <DateTime type="MONTH" placeholder="MONTH" />
    </Col>
    <Col span={6} style={{ padding: "10px" }}>
      <DateTime type="TIME" placeholder="TIME" />
    </Col>
  </Row>
}
`
