import React from 'react';
import { Input } from "zion-ui";
import { Row, Col, Button } from "antd";

export const Demo = function () {
  const Tpl1 = Input({
    disableOnChange: true
  }, true)
  const Tpl2 = Input({
    allowSpace: false
  }, true)
  const Tpl3 = Input({
    type: "number",
    max: 5
  }, true)
  const Tpl4 = Input({
    type: "number",
    onlyInt: true
  }, true)
  return <Row>
    <Col span={6} style={{ padding: "5px" }}>
      <p><Button type="link">disableOnChange(无法输入)</Button></p>
      <Tpl1 />
    </Col>
    <Col span={6} style={{ padding: "5px" }}>
      <p><Button type="link">allowSpace(文末不允许输入空格)</Button></p>
      <Tpl2 />
    </Col>
    <Col span={6} style={{ padding: "5px" }}>
      <p><Button type="link">max</Button></p>
      <Tpl3 />
    </Col>
    <Col span={6} style={{ padding: "5px" }}>
      <p><Button type="link">onlyInt(输入小数试试)</Button></p>
      <Tpl4 />
    </Col>
  </Row>
}

export const code5_1 = `
import React from 'react';
import { Input } from "zion-ui";
import { Row, Col, Button } from "antd";

export const Demo = function () {
	const Tpl1 = Input({
		disableOnChange: true
	}, true)
	return <Row>
		<Col span={6} style={{ padding: "5px" }}>
			<p><Button type="link">onlyInt(输入小数试试)</Button></p>
			<Tpl4 />
		</Col>
	</Row>
}
`
export const code5_2 = `
import React from 'react';
import { Input } from "zion-ui";
import { Row, Col, Button } from "antd";

export const Demo = function () {
	const Tpl2 = Input({
		allowSpace: false
	}, true)
	return <Row>
		<Col span={6} style={{ padding: "5px" }}>
			<p><Button type="link">allowSpace(文末不允许输入空格)</Button></p>
			<Tpl2 />
		</Col>
	</Row>
}
`
export const code5_3 = `
import React from 'react';
import { Input } from "zion-ui";
import { Row, Col, Button } from "antd";

export const Demo = function () {
	const Tpl3 = Input({
		type: "number",
		max: 5
	}, true)
	return <Row>
		<Col span={6} style={{ padding: "5px" }}>
			<p><Button type="link">max</Button></p>
			<Tpl3 />
		</Col>
	</Row>
}
`
export const code5_4 = `
import React from 'react';
import { Input } from "zion-ui";
import { Row, Col, Button } from "antd";

export const Demo = function () {
	const Tpl4 = Input({
		type: "number",
		onlyInt: true
	}, true)
	return <Row>
		<Col span={6} style={{ padding: "5px" }}>
			<p><Button type="link">onlyInt(输入小数试试)</Button></p>
			<Tpl4 />
		</Col>
	</Row>
}
`
