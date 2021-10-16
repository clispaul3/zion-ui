import React from "react"
import { Demo as Demo001, code as Code001 } from "./001"
import { Demo as Demo002, code as Code002 } from "./002"
import { Demo as Demo003, code as Code003 } from "./003"
import { Demo as Demo004, code as Code004 } from "./004"
import { CodeEditor, Row, Col } from "zion-ui"

export const ButtonDemo = () => {
  return <Row style={{ width: "100%" }}>
    <Row style={{ width: "100%" }}>
      <Col span={11} style={{ border: "1px solid #1890ff", borderRadius: "3px", padding: "5px", margin: "5px" }}>
        <Demo001 />
        <CodeEditor value={Code001} language="jsx" style={{ paddingTop: "10px" }} />
      </Col>
      <Col span={11} style={{ border: "1px solid #1890ff", borderRadius: "3px", padding: "5px", margin: "5px" }}>
        <Demo002 />
        <CodeEditor value={Code002} language="jsx" style={{ paddingTop: "10px" }} />
      </Col>
      <Col span={11} style={{ border: "1px solid #1890ff", borderRadius: "3px", padding: "5px", margin: "5px" }}>
        <Demo003 />
        <CodeEditor value={Code003} language="jsx" style={{ paddingTop: "10px" }} />
      </Col>
      <Col span={11} style={{ border: "1px solid #1890ff", borderRadius: "3px", padding: "5px", margin: "5px" }}>
        <Demo004 />
        <CodeEditor value={Code004} language="jsx" style={{ paddingTop: "10px" }} />
      </Col>
    </Row>
  </Row>
}