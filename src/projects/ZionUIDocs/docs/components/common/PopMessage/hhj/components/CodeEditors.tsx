import React, { useState } from "react"
import { Card, Collapse, Popover } from "antd"
import { CopyOutlined } from "_@ant-design_icons@4.6.2@@ant-design/icons";
import { Service } from "../service"
import { CodeEditor, PopMessage } from "zion-ui";
import { DownSquareOutlined, UpSquareOutlined } from '@ant-design/icons';
export const CodeEditors = function ({ code }) {
  const [isDisplay, setIsDisplay] = useState(false)
  return <Card actions={[
    handleBel(setIsDisplay, isDisplay),
    <Popover content={<div>复制代码</div>} ><CopyOutlined key="edit" onClick={() => { copyDemoCode(code) }} /></Popover>,
  ]}>
    <Card style={{ display: isDisplay ? "inline" : "none" }}>
      <CodeEditor value={code} language="jsx" style={{ paddingTop: "10px" }} />
    </Card>
  </Card>
}
// 判断需要哪个标签
function handleBel(setIsDisplay, isDisplay) {
  if (!isDisplay) {
    return <DownSquareOutlined key="setting" onClick={() => {
      setIsDisplay(true)
    }} />
  } else {
    return <UpSquareOutlined onClick={() => {
      setIsDisplay(false)
    }} />
  }
}
// 复制代码
function copyDemoCode(code) {
  const input = document.createElement('input')
  document.body.appendChild(input)
  input.setAttribute('value', code)
  input.select()
  if (document.execCommand('copy')) {
    document.execCommand('copy')
    PopMessage({
      type: "success",
      text: "复制成功"
    })
  } else {
    PopMessage({
      type: "error",
      text: "复制失败"
    })
  }
}