import { PopMessage, StateManage } from "zion-ui";
import React from "react"
import { DownSquareOutlined, UpSquareOutlined, CopyOutlined } from '@ant-design/icons';
import { Popover } from 'antd'
import { LoadingApiData } from "../default";
export const Service = {
  controlKey: {
    Table: "ZionUIDocs.docs.compoents.Loading.table"
  },
  copyDemoCode: (code) => {
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
  },
  // 判断需要哪个标签
  handleBel: (setIsDisplay, isDisplay) => {
    if (!isDisplay) {
      return <Popover content={<div>展开详细代码</div>} ><DownSquareOutlined key="setting" onClick={() => {
        setIsDisplay(true)
      }} /></Popover>
    } else {
      return <Popover content={<div>收起详细代码</div>} ><UpSquareOutlined onClick={() => {
        setIsDisplay(false)
      }} /></Popover>
    }
  },
  // 初始化api列表数据
  table_httpConfig: {
    init: () => {
      return new Promise((reslove, reject) => {
        let data = LoadingApiData
        reslove({
          data,
          total: data.length
        })
      })

    }
  },
  // 渲染说明内容
  renderInstructions: (text) => {
    return <div style={{
      width: "inherit",
      display: "block",
      whiteSpace: "normal"
    }}>{text}</div>
  },
  // 渲染参数
  renderParameter: (text) => {
    return <div style={{
      width: "inherit",
      display: "block",
      whiteSpace: "normal",
      color: "#c41d7f"
    }}>{text}</div>
  }

}