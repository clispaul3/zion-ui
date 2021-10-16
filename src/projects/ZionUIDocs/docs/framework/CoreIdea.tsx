/**
 * @description 核心概念
 */
import React from "react"
import { Typography } from "antd"
import { CodeEditor, Row, Col } from "zion-ui"

export const CoreIdea = () => {
	const code1 = `
  const property = {
  	text: "提交按钮",
  	onClick: () => {
  		// 点击事件
  	}
  }
	`
	const code2 = `
	// Button 作为组件函数
	import { Button } from "zion-ui";
	import React from "react";
	import ReactDOM from "react-dom";
	const property = {
  	text: "提交按钮",
  	onClick: () => {
  		console.log("onClick...")
  	}
	}
	// ① state是实例对象  ② Template 是组件模板
	const [state,Template] = Button(property,true)
	ReactDOM.render(<Template />, document.getElementById("root"))
	`
	const code3 = `
	// Button 作为React组件
	import { Button } from "zion-ui";
	import React from "react";
	import ReactDOM from "react-dom";
	const property = {
  	text: "提交按钮",
  	onClick: () => {
  		console.log("onClick...")
  	}
  }
	ReactDOM.render(<Button {...property}/>, document.getElementById("root"))
	`
	const code4 = `
	import { Button, StateManage } from "zion-ui";
	import React from "react";
	import ReactDOM from "react-dom";
	const property = {
  	text: "提交按钮",
  	onClick: () => {
  		console.log("onClick...")
  	}
	}
	// ① state是实例对象  ② Template 是组件模板
	const [state,Template] = Button(property,true)
	ReactDOM.render(<Template />, document.getElementById("root"))
	setTimeout(() => {
		// 通过状态管理服务修改实例对象的属性
		StateManage.set(state,{text:"修改按钮文字"})
	}, 800)
	`
	return <Row >
		<Col span={12} style={{ padding: "20px", background: "rgba(44,144,255,0.1)" }}>
			<Typography.Title level={5}>
				1. 配置属性
		</Typography.Title>
			<ol>
				<li >
					<p style={{ color: "#1890ff" }}>
						① 用于描述组件的属性，如组件UI，事件，数据请求，生命周期; 配置属性一般是字面量对象，如：
					</p>
					<CodeEditor value={code1} language="jsx" style={{ width: "500px" }} />
				</li>
				<li>
					② 配置属性可以分为四类：
				  <Typography.Paragraph>
						<span style={{ color: "red" }}>UI属性: </span>
						<span style={{ color: "#1890ff" }}>描述组件UI相关的属性，如: style,className</span>
					</Typography.Paragraph>
					<Typography.Paragraph>
						<span style={{ color: "red" }}>事件属性: </span>
						<span style={{ color: "#1890ff" }}>组件的事件绑定，如: onClick, onFocus</span>
					</Typography.Paragraph>
					<Typography.Paragraph>
						<span style={{ color: "red" }}>数据请求属性: </span>
						<span style={{ color: "#1890ff" }}>组件数据请求相关的属性配置, 如: httpConfig.init</span>
					</Typography.Paragraph>
					<Typography.Paragraph>
						<span style={{ color: "red" }}>生命周期属性：</span>
						<span style={{ color: "#1890ff" }}>组件生命周期相关的属性配置, 如: didMount</span>
					</Typography.Paragraph>
				</li>
			</ol>
			<Typography.Title level={5}>
				2. 组件函数
		  </Typography.Title>
			<ol>
				<li>
					<p style={{ color: "#1890ff" }}>
						① 组件函数可用于生成组件模板和实例对象
					</p>
				</li>
				<CodeEditor value={code2} language="jsx" style={{ width: "500px" }} />
				<li>
					<p style={{ color: "#1890ff" }}>
						② 组件函数可当作React组件直接使用
					</p>
				</li>
				<CodeEditor value={code3} language="jsx" style={{ width: "500px" }} />
			</ol>
		</Col>
		<Col span={12} style={{ padding: "20px", background: "rgba(44,144,255,0.1)" }}>
			<Typography.Title level={5}>
				3. 组件模板
		  </Typography.Title>
			<ol>
				<li>
					<p style={{ color: "#1890ff" }}>
						① 组件模板类似于React组件，但是不支持传递props参数
					</p>
				</li>
				<CodeEditor value={code2} language="jsx" style={{ width: "500px" }} />
			</ol>
			<Typography.Title level={5}>
				4. 实例对象
		  </Typography.Title>
			<ol>
				<li>
					<p style={{ color: "#1890ff" }}>
						① 用于绑定实例模板，当实例对象发生改变时，实例模板会自动发生变化
					</p>
				</li>
				<CodeEditor value={code4} language="jsx" style={{ width: "500px" }} />
				<li>
					<p style={{ color: "#1890ff" }}>
						② 对于实例对象的修改操作，需要通过状态管理服务 StateManage
					</p>
				</li>
			</ol>
		</Col>
	</Row>
}