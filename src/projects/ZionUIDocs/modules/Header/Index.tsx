import React from "react"
import { Row, Col, Typography } from "antd"
import { Input, Menu } from "zion-ui"
import { className } from './config'
import { navConfig } from "./config"

export const Header = function () {
	return <Row className={className} align="middle">
		<Col span={24}>
			<Typography.Title level={4}>zion-ui</Typography.Title>
		</Col>
		{/* <Col span={8}>
      <Input placeholder="输入关键字" type="search"></Input>
    </Col>
    <Col span={12}>
      <Menu {...navConfig}></Menu>
    </Col> */}
	</Row>
}