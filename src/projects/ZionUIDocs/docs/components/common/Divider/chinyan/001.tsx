import React from "react"
import { Tag, CodeEditor, PopMessage, Divider } from "zion-ui"
import { Collapse, Tooltip } from "antd"
import { copy } from "./copy"

const { Panel } = Collapse
const text = `
  import React from "react"
  import { Divider } from "zion-ui"
  export const Demo = function () {
    return (<div>
      <Divider />
      <Divider content="居中显示的分割线" />
      <Divider content="居右显示的分割线" placement="right" dashed={true} />
      <Divider content="居左显示的分割线" placement="left" plain={true} style={{ color: "red", fontSize: "18px"}} />
      </div>)
  }`

export const Demo = function () {
  return (
    <div style={{ padding: "10px" }}>
      <Divider style={{ marginBottom: "10px" }} />
      <Divider content="居中显示的分割线" style={{ marginBottom: "10px" }} />
      <Divider content="居右显示的分割线" placement="right" dashed={true} style={{ marginBottom: "10px" }} />
      <Divider content="居左显示的分割线" placement="left" plain={true} style={{ color: "red", fontSize: "18px", marginBottom: "10px" }} />
      <Collapse defaultActiveKey={["1"]}>
        <Panel header="展开查看代码" key="0" extra={copy(text)}>
          <CodeEditor value={text} language="jsx" />
        </Panel>
      </Collapse>
    </div>
  )
}