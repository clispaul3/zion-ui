export const LoadingApiData = [
  {
    parameter: "loading: boolean，options?: { icon: ReactNode })",
    instructions: "设置全局Loading状态,loading表示状态是否激活，options可选，表示图标",
    default: "-",
    fuc: "setGlobalLoading"
  }
]

export const code1 = `
import React from 'react';
import { Loading, Button, ButtonProps } from "zion-ui"
import { RedoOutlined } from "@ant-design/icons"

const LoadingIcon: any = RedoOutlined

export const Demo01 = function () {
  const btnProps: ButtonProps = {
    text: "基本使用",
    type: "primary",
    onClick: function () {
      Loading.setGlobalLoading(true)
      const timer = setTimeout(() => {
        Loading.setGlobalLoading(false)
        clearTimeout(timer)
      }, 800)
    }
  }
  return <div>
    <Button {...btnProps} />
  </div>
}
`
export const code2 = `
import React from 'react';
import { Loading, Button, ButtonProps } from "zion-ui"
import { RedoOutlined } from "@ant-design/icons"

const LoadingIcon: any = RedoOutlined

export const Demo01 = function () {
  return <div>
    <Button text="自定义图标" onClick={() => {
      Loading.setGlobalLoading(true, { icon: <LoadingIcon spin style={{ fontSize: "60px", color: "red" }} /> })
      const timer = setTimeout(() => {
        Loading.setGlobalLoading(false)
        clearTimeout(timer)
      }, 800)
    }} />
  </div>
}
`