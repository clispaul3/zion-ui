
import React from 'react';
import { Slider } from "zion-ui"
import { Row, Col } from "antd"

export const Demo01 = function () {
  return <Row>
    <Col span={11}>
      <Slider />
    </Col>
    <Col span={1}></Col>
    <Col span={12}>
      <Slider label="进度" value={20} required={true} tooltip={{ content: (value) => value + "%" }} />
    </Col>
  </Row>
}
export const code01 = `

import React from 'react';
import { Slider } from "zion-ui"
import { Row, Col } from "antd"

export const Demo = function () {
	return <Row>
		<Col >
			<Slider value={10} tooltip={{ visible: true }} />
		</Col>
	</Row>
}
`
export const code02 = `

import React from 'react';
import { Slider } from "zion-ui"
import { Row, Col } from "antd"

export const Demo = function () {
	return <Row>
		<Col>
			<Slider label="进度" value={20} required={true} tooltip={{ content: (value) => value + "%" }} />
		</Col>
	</Row>
}
`