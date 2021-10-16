import React from 'react';
import { Input } from "zion-ui";
import { Row, Col, Button } from "antd";
import { DownCircleTwoTone } from "@ant-design/icons"

export const Demo = function () {
  const Tpl1 = Input({
    prefix: "http://",
  }, true)
  const Tpl2 = Input({
    suffix: "@qq.com"
  }, true)
  const Tpl3 = Input({
    addonBefore: "http://"
  }, true)
  const Tpl4 = Input({
    addonAfter: "@qq.com"
  }, true)
  const Tpl5 = Input({
    addonAfter: <DownCircleTwoTone />
  }, true)
  return <Row>
    <Col span={5} style={{ padding: "5px" }}>
      <p><Button type="link">prefix</Button></p>
      <Tpl1 />
    </Col>
    <Col span={4} style={{ padding: "5px" }}>
      <p><Button type="link">suffix</Button></p>
      <Tpl2 />
    </Col>
    <Col span={5} style={{ padding: "5px" }}>
      <p><Button type="link">addonBefore</Button></p>
      <Tpl3 />
    </Col>
    <Col span={5} style={{ padding: "5px" }}>
      <p><Button type="link">addonAfter</Button></p>
      <Tpl4 />
    </Col>
    <Col span={5} style={{ padding: "5px" }}>
      <p><Button type="link">addonAfter(支持小图标)</Button></p>
      <Tpl5 />
    </Col>
  </Row>
}

export const code2_1 = `
import React from 'react';
import { Input } from "zion-ui";
import { Row, Col, Button } from "antd";
import { DownCircleTwoTone } from "@ant-design/icons"

export const Demo = function () {
	const Tpl1 = Input({
		prefix: "http://",
	}, true)
	return <Row>
		<Col span={5} style={{ padding: "5px" }}>
			<p><Button type="link">prefix</Button></p>
			<Tpl1 />
		</Col>
	</Row>
}
`
export const code2_2 = `
import React from 'react';
import { Input } from "zion-ui";
import { Row, Col, Button } from "antd";
import { DownCircleTwoTone } from "@ant-design/icons"

export const Demo = function () {
	const Tpl2 = Input({
		suffix: "@qq.com"
	}, true)

	return <Row>
		<Col span={4} style={{ padding: "5px" }}>
			<p><Button type="link">suffix</Button></p>
			<Tpl2 />
		</Col>
	</Row>
}
`
export const code2_3 = `
import React from 'react';
import { Input } from "zion-ui";
import { Row, Col, Button } from "antd";
import { DownCircleTwoTone } from "@ant-design/icons"

export const Demo = function () {
	const Tpl3 = Input({
		addonBefore: "http://"
	}, true)
	return <Row>
		<Col span={5} style={{ padding: "5px" }}>
			<p><Button type="link">addonBefore</Button></p>
			<Tpl3 />
		</Col>
	</Row>
}
`
export const code2_4 = `
import React from 'react';
import { Input } from "zion-ui";
import { Row, Col, Button } from "antd";
import { DownCircleTwoTone } from "@ant-design/icons"

export const Demo = function () {
	const Tpl4 = Input({
		addonAfter: "@qq.com"
	}, true)
	return <Row>
		<Col span={5} style={{ padding: "5px" }}>
			<p><Button type="link">addonAfter</Button></p>
			<Tpl4 />
		</Col>
	</Row>
}
`
export const code2_5 = `
import React from 'react';
import { Input } from "zion-ui";
import { Row, Col, Button } from "antd";
import { DownCircleTwoTone } from "@ant-design/icons"

export const Demo = function () {
	const Tpl5 = Input({
		addonAfter: <DownCircleTwoTone />
	}, true)
	return <Row>
		<Col span={5} style={{ padding: "5px" }}>
			<p><Button type="link">addonAfter(支持小图标)</Button></p>
			<Tpl5 />
		</Col>
	</Row>
}
`