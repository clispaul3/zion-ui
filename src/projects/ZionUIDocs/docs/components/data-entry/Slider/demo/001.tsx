import React from 'react';
import { Slider } from "zion-ui"
import { Row, Col } from "antd"

export const Demo = function () {
	return <Row>
		<Col span={11}>
			<Slider value={10} tooltip={{ visible: true }} />
		</Col>
		<Col span={1}></Col>
		<Col span={12}>
			<Slider label="进度" value={20} required={true} tooltip={{ content: (value) => value + "%" }} />
		</Col>
	</Row>
}

export const code = `
import React from 'react';
import { Slider } from "zion-ui"
import { Row, Col } from "antd"

export const Demo = function () {
	return <Row>
		<Col span={11}>
			<Slider value={10} tooltip={{ visible: true }} />
		</Col>
		<Col span={1}></Col>
		<Col span={12}>
			<Slider label="进度" value={20} required={true} tooltip={{ content: (value) => value + "%" }} />
		</Col>
	</Row>
}
`