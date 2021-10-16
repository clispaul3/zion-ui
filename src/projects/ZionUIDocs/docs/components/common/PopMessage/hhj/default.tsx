export const LoadingApiData = [
  {
    parameter: "title",
    instructions: "全局提示的标题内容",
    default: "",
    type: "string | ReactNode",
    select: "-"
  },
  {
    parameter: "text",
    instructions: "全局提示的提示内容",
    default: "",
    type: "string | ReactNode",
    select: "-"
  },
  {
    parameter: "type",
    instructions: "全局提示的类型",
    default: "info",
    type: "string",
    select: `"info" | "warn" | "warning" | "success" | "error"`
  },
  {
    parameter: "duration",
    instructions: "全局提示的停留时间",
    default: "",
    type: "number",
    select: ``
  },

]
export const apiDataEvent = [
  {
    parameter: "onClose",
    instructions: "关闭后的回调",
    default: "",
    type: "() => void",
    select: "-"
  }
]
export const code1 = `
import React from 'react';
import { PopMessage, Button, Loading } from "zion-ui"

export const Demo = function () {
  const SuccessBtn = Button({
    text: "提交",
    type: "success",
    onClick: function () {
      Loading.setGlobalLoading(true)
      const timer = setTimeout(() => {
        clearTimeout(timer)
        PopMessage({
          type: "success",
          text: "保存成功",
          onClose: function () {
          }
        })
        Loading.setGlobalLoading(false)
      }, 800)
    }
  }, true)
  return <div>
    <SuccessBtn />
  </div>
},
`
export const code2 = `
import React from 'react';
import { PopMessage, Button, Loading } from "zion-ui"

export const Demo = function () {
   const InfoBtn = Button({
    text: "提交",
    type: "info",
    onClick: function () {
      Loading.setGlobalLoading(true)
      const timer = setTimeout(() => {
        clearTimeout(timer)
        PopMessage({
          type: "info",
          text: "保存成功"
        })
        Loading.setGlobalLoading(false)
      }, 800)
    }
  }, true)
  return <div>
    <InfoBtn />
  </div>
}
`
export const code3 = `
import React from 'react';
import { PopMessage, Button, Loading } from "zion-ui"

export const Demo = function () {
   const WarningBtn = Button({
    text: "提交",
    type: "warning",
    onClick: function () {
      Loading.setGlobalLoading(true)
      const timer = setTimeout(() => {
        clearTimeout(timer)
        PopMessage({
          type: "warning",
          text: "保存成功"
        })
        Loading.setGlobalLoading(false)
      }, 800)
    }
  }, true)
  return <div>
    <WarningBtn />
  </div>
}
`
export const code4 = `
import React from 'react';
import { PopMessage, Button, Loading } from "zion-ui"

export const Demo = function () {
   const ErrorBtn = Button({
    text: "提交",
    type: "danger",
    onClick: function () {
      Loading.setGlobalLoading(true)
      const timer = setTimeout(() => {
        clearTimeout(timer)
        PopMessage({
          type: "error",
          text: "保存失败"
        })
        Loading.setGlobalLoading(false)
      }, 800)
    }
  }, true)
  return <div>
    <ErrorBtn />
  </div>
}
`
