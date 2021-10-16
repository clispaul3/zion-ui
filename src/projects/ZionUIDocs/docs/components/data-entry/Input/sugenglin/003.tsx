import React from 'react';
import { Input, PopMessage } from "zion-ui";
import { Row, Col, Button } from "antd";

export const Demo = function () {
  const Tpl1 = Input({
    onClick: function (params, state) {
      PopMessage({
        type: "success",
        title: "onClick"
      })
    }
  }, true)
  const Tpl2 = Input({
    onFocus: function (params, state) {
      PopMessage({
        type: "success",
        title: "onFocus"
      })
    }
  }, true)
  const Tpl3 = Input({
    onChange: function (params, state) {
      PopMessage({
        type: "success",
        title: "onChange"
      })
    }
  }, true)
  const Tpl4 = Input({
    onPressEnter: function (params, state) {
      PopMessage({
        type: "success",
        title: "onPressEnter"
      })
    }
  }, true)
  const Tpl5 = Input({
    type: "search",
    onSearch: function (params, state) {
      PopMessage({
        type: "success",
        title: "onSearch"
      })
    }
  }, true)
  const Tpl6 = Input({
    onBlur: function (params, state) {
      PopMessage({
        type: "success",
        title: "onBlur"
      })
    }
  }, true)
  return <Row>
    <Col span={4} style={{ padding: "5px" }}>
      <p><Button type="link">onClick</Button></p>
      <Tpl1 />
    </Col>
    <Col span={4} style={{ padding: "5px" }}>
      <p><Button type="link">onFocus</Button></p>
      <Tpl2 />
    </Col>
    <Col span={4} style={{ padding: "5px" }}>
      <p><Button type="link">onChange</Button></p>
      <Tpl3 />
    </Col>
    <Col span={4} style={{ padding: "5px" }}>
      <p><Button type="link">onPressEnter</Button></p>
      <Tpl4 />
    </Col>
    <Col span={4} style={{ padding: "5px" }}>
      <p><Button type="link">onSearch</Button></p>
      <Tpl5 />
    </Col>
    <Col span={4} style={{ padding: "5px" }}>
      <p><Button type="link">onBlur</Button></p>
      <Tpl6 />
    </Col>
  </Row>
}

export const code3_1 = `
import React from 'react';
import { Input, PopMessage } from "zion-ui";
import { Row, Col, Button } from "antd";

export const Demo = function () {
	const Tpl1 = Input({
		onClick: function (params, state) {
			PopMessage({
				type: "success",
				title: "onClick"
			})
		}
	}, true)
	return <Row>
		<Col span={4} style={{ padding: "5px" }}>
			<p><Button type="link">onClick</Button></p>
			<Tpl1 />
		</Col>
	</Row>
}
`
export const code3_2 = `
import React from 'react';
import { Input, PopMessage } from "zion-ui";
import { Row, Col, Button } from "antd";

export const Demo = function () {
	const Tpl2 = Input({
		onFocus: function (params, state) {
			PopMessage({
				type: "success",
				title: "onFocus"
			})
		}
	}, true)
	return <Row>
		<Col span={4} style={{ padding: "5px" }}>
			<p><Button type="link">onFocus</Button></p>
			<Tpl2 />
		</Col>
	</Row>
}
`
export const code3_3 = `
import React from 'react';
import { Input, PopMessage } from "zion-ui";
import { Row, Col, Button } from "antd";

export const Demo = function () {
	const Tpl3 = Input({
		onChange: function (params, state) {
			PopMessage({
				type: "success",
				title: "onChange"
			})
		}
	}, true)
	return <Row>
		<Col span={4} style={{ padding: "5px" }}>
			<p><Button type="link">onChange</Button></p>
			<Tpl3 />
		</Col>
	</Row>
}
`
export const code3_4 = `
import React from 'react';
import { Input, PopMessage } from "zion-ui";
import { Row, Col, Button } from "antd";

export const Demo = function () {
	const Tpl4 = Input({
		onPressEnter: function (params, state) {
			PopMessage({
				type: "success",
				title: "onPressEnter"
			})
		}
	}, true)
	return <Row>
		<Col span={4} style={{ padding: "5px" }}>
			<p><Button type="link">onPressEnter</Button></p>
			<Tpl4 />
		</Col>
	</Row>
}
`
export const code3_5 = `
import React from 'react';
import { Input, PopMessage } from "zion-ui";
import { Row, Col, Button } from "antd";

export const Demo = function () {
	const Tpl5 = Input({
		type: "search",
		onSearch: function (params, state) {
			PopMessage({
				type: "success",
				title: "onSearch"
			})
		}
	}, true)
	return <Row>
		<Col span={4} style={{ padding: "5px" }}>
			<p><Button type="link">onSearch</Button></p>
			<Tpl5 />
		</Col>
	</Row>
}
`
export const code3_6 = `
import React from 'react';
import { Input, PopMessage } from "zion-ui";
import { Row, Col, Button } from "antd";

export const Demo = function () {
	const Tpl6 = Input({
		onBlur: function (params, state) {
			PopMessage({
				type: "success",
				title: "onBlur"
			})
		}
	}, true)
	return <Row>
		<Col span={4} style={{ padding: "5px" }}>
			<p><Button type="link">onBlur</Button></p>
			<Tpl6 />
		</Col>
	</Row>
}
`