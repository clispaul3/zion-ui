import React from 'react';
import { Input } from "zion-ui";
import { Row, Col, Button } from "antd";

export const Demo = function () {
  const Tpl1 = Input({
    allowClear: true,
    value: "回填数据",
    maxLength: 5,
    showTitle: true
  }, true)
  const Tpl2 = Input({
    type: "number",
    min: 5
  }, true)
  const Tpl3 = Input({
    type: "number",
    max: 5
  }, true)
  const Tpl4 = Input({
    type: "number",
    onlyInt: true
  }, true)
  const Tpl5 = Input({
    type: "textArea"
  }, true)
  return <Row>
    <Col span={6} style={{ padding: "5px" }}>
      <p><Button type="link">maxLength、showTitle</Button></p>
      <Tpl1 />
    </Col>
    <Col span={6} style={{ padding: "5px" }}>
      <p><Button type="link">min</Button></p>
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

export const code4_1 = `
import React from 'react';
import { Input } from "zion-ui";
import { Row, Col, Button } from "antd";

export const Demo = function () {
	const Tpl1 = Input({
		allowClear: true,
		value: "回填数据",
		maxLength: 5,
		showTitle: true
	}, true)
	return <Row>
		<Col span={6} style={{ padding: "5px" }}>
			<p><Button type="link">maxLength、showTitle</Button></p>
			<Tpl1 />
		</Col>
	</Row>
}
`
export const code4_2 = `
import React from 'react';
import { Input } from "zion-ui";
import { Row, Col, Button } from "antd";

export const Demo = function () {
	const Tpl2 = Input({
		type: "number",
		min: 5
	}, true)
	return <Row>
		<Col span={6} style={{ padding: "5px" }}>
			<p><Button type="link">min</Button></p>
			<Tpl2 />
		</Col>
	</Row>
}
`

export const code4_3 = `
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

export const code4_4 = `
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
