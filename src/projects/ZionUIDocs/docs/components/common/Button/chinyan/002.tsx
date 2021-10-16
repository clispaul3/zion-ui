import React from "react"
import { Button } from "zion-ui"
import { Collapse } from "antd"
import { CodeEditor, PopMessage } from "zion-ui"
import { DownloadOutlined } from '@ant-design/icons';
import { copy } from "./copy"

const { Panel } = Collapse
const text = `
  import React from "react"
  import { Button, PopMessage } from "zion-ui"
  import { DownloadOutlined } from "@ant-design/icons"
  export const Demo = function () {
    return (<div>
      <Button text="点击事件" type="primary"
          onClick={() => {
            PopMessage({ type: "success", text: "我被点了" })
          }}/>
      <Button text="下载" type="primary"
          icon={<DownloadOutlined />}
          onClick={() => {
            PopMessage({ type: "error", text: "下载失败" })
          }} />
    </div>)
  }`

export const Demo = function () {
  return (
    <div>
      <Button text="点击事件" type="primary" style={{ margin: "10px 10px 10px 0" }}
        onClick={() => {
          PopMessage({
            type: "success",
            text: "我被点了"
          })
        }} />
      <Button text="下载" type="primary" style={{ margin: "10px" }}
        icon={<DownloadOutlined />}
        onClick={() => {
          PopMessage({
            type: "error",
            text: "下载失败"
          })
        }} />
      <Collapse>
        <Panel header="展开查看代码" key="0" extra={copy(text)}>
          <CodeEditor value={text} language="jsx" />
        </Panel>
      </Collapse>
    </div>
  )
}
