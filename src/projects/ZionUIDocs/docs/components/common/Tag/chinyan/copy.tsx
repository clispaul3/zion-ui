import React from "react"
import { Tooltip } from "antd"
import { CopyOutlined } from '@ant-design/icons';
import { PopMessage } from "zion-ui"

/**
 * 
 * @description 复制代码
 */
export const copy = (code) => {
  return (
    <Tooltip title="复制代码">
      <CopyOutlined
        onClick={(event) => {
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
          event.stopPropagation();
        }}
      />
    </Tooltip>
  )
}