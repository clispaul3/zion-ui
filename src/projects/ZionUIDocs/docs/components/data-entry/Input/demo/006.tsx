import React from 'react';
import { Input, StateManage } from "zion-ui";
import { Row, Col, Button } from "antd";
import { IObservableObject } from 'mobx';

export const Demo = function () {
	const Tpl1 = Input({
		label: "用户名",
		required: true,
	}, true)
	const Tpl2 = Input({
		label: "邮箱",
		required: true,
		addonAfter: "@qq.com",
		autoValidate: true,
		layout: {
			wrapperCol: { span: 16 },
			labelCol: { span: 8 }
		}
	}, true)
	const Tpl3 = Input({
		label: "密码",
		required: true,
		hasFeedback: true,
		placeholder: "输入密码",
		visibilityToggle: true,
		layout: {
			wrapperCol: { span: 16 },
			labelCol: { span: 8 }
		},
		onChange: function ({ value }, state) {
			if (value.length <= 6) {
				StateManage.set(state, { validateResult: { status: "error", help: "请输入6位数以上密码" } })
			} else {
				StateManage.set(state, { validateResult: { status: "success" } })
			}
		}
	}, true)
	let state4: IObservableObject, Tpl4, state5: IObservableObject, Tpl5;
	[state4, Tpl4] = Input({
		label: "输入数字",
		required: true,
		placeholder: "输入数字",
		hasFeedback: true,
		visibilityToggle: true,
		layout: {
			wrapperCol: { span: 8 },
			labelCol: { span: 10 }
		},
		onChange: function ({ value }, state) {
			const { validate } = StateManage.get(state5)
			validate({ value })
			StateManage.set(state, { label: "输入数字" + value })
		}
	}, false);
	[state5, Tpl5] = Input({
		label: "输入大于100的数字",
		required: true,
		hasFeedback: true,
		disabled: true,
		layout: {
			wrapperCol: { span: 8 },
			labelCol: { span: 10 }
		}
	}, false)
	return <Row>
		<Col span={12} style={{ padding: "5px" }}>
			<p style={{ textAlign: "center" }}><Button type="link">label、required</Button></p>
			<Tpl1 />
		</Col>
		<Col span={12} style={{ padding: "5px" }}>
			<p style={{ textAlign: "center" }}><Button type="link">autoValidate</Button></p>
			<Tpl2 />
		</Col>
		<Col span={12} style={{ padding: "5px" }}>
			<p style={{ textAlign: "center" }}><Button type="link">自定义校验、hasFeedback</Button></p>
			<Tpl3 />
		</Col>
		<Col span={12} style={{ padding: "5px" }}>
			<p style={{ textAlign: "center" }}><Button type="link">关联检验</Button></p>
			<Tpl4 />
			<Tpl5 />
		</Col>
	</Row>
}

export const code = `
import React from 'react';
import { Input, StateManage } from "zion-ui";
import { Row, Col, Button } from "antd";
import { IObservableObject } from 'mobx';

export const Demo = function () {
	const Tpl1 = Input({
		label: "用户名",
		required: true,
	}, true)
	const Tpl2 = Input({
		label: "邮箱",
		required: true,
		addonAfter: "@qq.com",
		autoValidate: true,
		layout: {
			wrapperCol: { span: 16 },
			labelCol: { span: 8 }
		}
	}, true)
	const Tpl3 = Input({
		label: "密码",
		required: true,
		hasFeedback: true,
		placeholder: "输入密码",
		visibilityToggle: true,
		layout: {
			wrapperCol: { span: 16 },
			labelCol: { span: 8 }
		},
		onChange: function ({ value }, state) {
			if (value.length <= 6) {
				StateManage.set(state, { validateResult: { status: "error", help: "请输入6位数以上密码" } })
			} else {
				StateManage.set(state, { validateResult: { status: "success" } })
			}
		}
	}, true)
	let state4: IObservableObject, Tpl4, state5: IObservableObject, Tpl5;
	[state4, Tpl4] = Input({
		label: "输入数字",
		required: true,
		placeholder: "输入数字",
		hasFeedback: true,
		visibilityToggle: true,
		layout: {
			wrapperCol: { span: 8 },
			labelCol: { span: 10 }
		},
		onChange: function ({ value }, state) {
			const { validate } = StateManage.get(state5)
			validate({ value })
			StateManage.set(state, { label: "输入数字" + value })
		}
	}, false);
	[state5, Tpl5] = Input({
		label: "输入大于100的数字",
		required: true,
		hasFeedback: true,
		disabled: true,
		layout: {
			wrapperCol: { span: 8 },
			labelCol: { span: 10 }
		}
	}, false)
	return <Row>
		<Col span={6} style={{ padding: "5px" }}>
			<p><Button type="link">label、required</Button></p>
			<Tpl1 />
		</Col>
		<Col span={6} style={{ padding: "5px" }}>
			<p><Button type="link">autoValidate</Button></p>
			<Tpl2 />
		</Col>
		<Col span={6} style={{ padding: "5px" }}>
			<p><Button type="link">自定义校验、hasFeedback</Button></p>
			<Tpl3 />
		</Col>
		<Col span={12} style={{ padding: "5px" }}>
			<p><Button type="link">关联检验</Button></p>
			<Tpl4 />
			<Tpl5 />
		</Col>
	</Row>
}
`
