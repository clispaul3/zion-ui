import React from "react"
import { Button } from "zion-ui"
import { Collapse } from "antd"
import { CodeEditor } from "zion-ui"
import { copy } from "./copy"

const { Panel } = Collapse
const text = `
  import React from "react"
  import { Button } from "zion-ui"
  export const Demo = function () {
    return (<div>
      <Button />
      <Button text="警示按钮" type="danger" />
      <Button text="small" size="small" />
      <Button text="禁用按钮" disabled={true} />
      </div>)
  }`


export const Demo = function () {
  return (
    <div>
      <Button style={{ margin: "10px 10px 10px 0" }} />
      <Button text="警示按钮" type="danger"
        style={{ margin: "10px" }}
      />
      <Button text="small" size="small"
        style={{ margin: "10px" }}
      />
      <Button text="禁用按钮" disabled={true}
        style={{ margin: "10px" }}
      />
      <Collapse defaultActiveKey={["1"]}>
        <Panel header="展开查看代码" key="0" extra={copy(text)}>
          <CodeEditor value={text} language="jsx" />
        </Panel>
      </Collapse>
    </div>
  )
}
