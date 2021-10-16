import React from 'react';
import { Input } from "zion-ui";
import { Row, Col, Button } from "antd";

export const Demo = function () {
  const Tpl1 = Input({
    type: "input",
    // className: "zion-ui-no-border"
  }, true)
  const Tpl2 = Input({
    type: "number"
  }, true)
  const Tpl3 = Input({
    type: "password",
    visibilityToggle: true
  }, true)
  const Tpl4 = Input({
    type: "search"
  }, true)
  const Tpl5 = Input({
    type: "textArea"
  }, true)
  return <Row>
    <Col span={5} style={{ padding: "5px" }}>
      <p><Button type="link">input</Button></p>
      <Tpl1 />
    </Col>
    <Col span={4} style={{ padding: "5px" }}>
      <p><Button type="link">number</Button></p>
      <Tpl2 />
    </Col>
    <Col span={5} style={{ padding: "5px" }}>
      <p><Button type="link">password</Button></p>
      <Tpl3 />
    </Col>
    <Col span={5} style={{ padding: "5px" }}>
      <p><Button type="link">search</Button></p>
      <Tpl4 />
    </Col>
    <Col span={5} style={{ padding: "5px" }}>
      <p><Button type="link">textArea</Button></p>
      <Tpl5 />
    </Col>
  </Row>
}

export const code1_1 = `
import React from 'react';
import { Input } from "zion-ui";
import { Row, Col, Button } from "antd";

export const Demo = function () {
	const Tpl1 = Input({
		type: "input"
	}, true)
	return <Row>
		<Col span={5} style={{ padding: "5px" }}>
			<p><Button type="link">input</Button></p>
			<Tpl1 />
		</Col>
	</Row>
}
`
export const code1_2 = `
import React from 'react';
import { Input } from "zion-ui";
import { Row, Col, Button } from "antd";

export const Demo = function () {
	const Tpl2 = Input({
		type: "number"
	}, true)
	return <Row>
		<Col span={4} style={{ padding: "5px" }}>
			<p><Button type="link">number</Button></p>
			<Tpl2 />
		</Col>
		</Col>
	</Row>
}
`
export const code1_3 = `
import React from 'react';
import { Input } from "zion-ui";
import { Row, Col, Button } from "antd";

export const Demo = function () {
	const Tpl3 = Input({
		type: "password",
		visibilityToggle: true
	}, true)
	return <Row>
		<Col span={5} style={{ padding: "5px" }}>
			<p><Button type="link">password</Button></p>
			<Tpl3 />
		</Col>
	</Row>
}
`
export const code1_4 = `
import React from 'react';
import { Input } from "zion-ui";
import { Row, Col, Button } from "antd";

export const Demo = function () {
	const Tpl4 = Input({
		type: "search"
	}, true)
	return <Row>
		<Col span={5} style={{ padding: "5px" }}>
			<p><Button type="link">search</Button></p>
			<Tpl4 />
		</Col>
	</Row>
}
`
export const code1_5 = `
import React from 'react';
import { Input } from "zion-ui";
import { Row, Col, Button } from "antd";

export const Demo = function () {
	const Tpl5 = Input({
		type: "textArea"
	}, true)
	return <Row>
		<Col span={5} style={{ padding: "5px" }}>
			<p><Button type="link">textArea</Button></p>
			<Tpl5 />
		</Col>
	</Row>
}
`

