import React from "react"
import { Tag, CodeEditor, PopMessage } from "zion-ui"
import { Collapse } from "antd"
import { WarningTwoTone, CloseCircleFilled, TwitterOutlined, } from "@ant-design/icons"
import { copy } from "./copy"

const { Panel } = Collapse
const text = `
  import React from "react"
  import { Tag } from "zion-ui"
  import { WarningTwoTone, CloseCircleFilled } from "@ant-design/icons"
  export const Demo = function () {
    return (<div>
      <Tag />
      <Tag text="error" type="error" />
      <Tag text="processing" type="processing" />
      <Tag text="waiting" type="waiting" />
      <Tag text="warning" type="warning" />
      <Tag text="删除" color="red" icon={<WarningTwoTone />} closable={true} />
      <Tag text="删除事件" color="pink" closable onClose={() => {}} />
      <Tag text="Twitter" icon={<TwitterOutlined />} color="#55acee" />
      </div>)
  }`

export const Demo = function () {
  return (
    <div>
      <Tag style={{ margin: "10px 10px 10px 0" }} />
      <Tag text="error" type="error" style={{ margin: "10px" }} />
      <Tag text="error" style={{ margin: "10px" }} />
      <Tag text="processing" type="processing" style={{ margin: "10px" }} />
      <Tag text="waiting" type="waiting" style={{ margin: "10px" }} />
      <Tag text="warning" type="warning" style={{ margin: "10px" }} />
      <Tag text="删除" color="red" icon={<WarningTwoTone />} closable={true} style={{ margin: "10px" }} />
      <Tag text="删除事件" color="pink" closable onClose={() => { }} style={{ margin: "10px" }} />
      <Tag text="Twitter" icon={<TwitterOutlined />} color="#55acee" style={{ margin: "10px" }} />
      <Collapse defaultActiveKey={["1"]}>
        <Panel header="展开查看代码" key="0" extra={copy(text)}>
          <CodeEditor value={text} language="jsx" />
        </Panel>
      </Collapse>
    </div>
  )
}
