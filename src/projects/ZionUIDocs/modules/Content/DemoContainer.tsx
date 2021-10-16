import React, { CSSProperties } from "react"
import { observer } from 'mobx-react'
import { PropertyService, StateManage, Menu, Divider, CodeEditor, Row, Col } from "zion-ui"
import { controlKey } from "../../config"
import { Typography, Result } from 'antd'
import { AppstoreOutlined } from '@ant-design/icons'

const className = "zion-ui-docs-demo-container"
const AppstoreOutlinedIcon: any = AppstoreOutlined
const menuIconStyle: CSSProperties = {
	position: "fixed",
	right: "20px",
	top: "10px"
}
const state = PropertyService.getObservableObj({
	demoList: [],
	openTitle: []
})
StateManage.addState(controlKey.DemoContainer, state)

export const DemoContainer = observer(function () {
	let { demoList, openTitle } = StateManage.get(state)
	const interfaceAPI = demoList.find(item => item[0].indexOf("interface") >= 0)
	demoList = demoList.filter(item => item[0].indexOf("interface") < 0)
	const dataSource = demoList.map(([title]) => ({ key: title, label: <a key={title} href={"#" + title}>{title}</a> }))
	if (interfaceAPI) {
		dataSource.unshift({ key: "interface", label: "完整API", url: interfaceAPI[1] })
	}
	if (demoList.length <= 0) return <Result status="404" title="404" />
	return <div>
		{demoList.map(([title, Demo, Code], index) => {
			return <div className={className} key={title}>
				<Typography.Title id={title} key={title} level={4}>{title}</Typography.Title>
				{Demo ? <Demo key={index} /> : null}
				{openTitle.includes(title) ? (title === "API" ? <Row>
					{Code.map((str, idx) => {
						return <Col span={24 / Code.length}>
							<CodeEditor value={str} language="jsx" key={idx} />
						</Col>
					})}
				</Row> : <CodeEditor value={Code} language="jsx" style={{ paddingTop: "10px" }} />) : null}
				{Code ?
					<Divider
						placement="right"
						content={<Typography.Paragraph style={{ marginBottom: "0px" }} copyable={{ text: Code }}>
							<AppstoreOutlinedIcon
								style={{ cursor: "pointer", color: "#1890ff" }}
								onClick={() => {
									if (openTitle.includes(title)) {
										openTitle = openTitle.filter(_title => _title !== title)
									} else {
										openTitle.push(title)
									}
									StateManage.set(state, { openTitle })
								}}
							/>
						</Typography.Paragraph>}
					/> : null
				}
			</div>
		})}
		<div style={menuIconStyle}>
			<Menu show={true} dataSource={dataSource} layout="horizontal" onClick={({ value, current }) => {
				if (value === "interface") {
					window.open(current["url"])
				}
			}} />
		</div>
	</div>
})





