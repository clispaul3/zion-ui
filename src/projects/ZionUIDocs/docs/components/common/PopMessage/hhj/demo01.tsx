
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
          duration: 1,
          text: "保存成功",
          onClose: function () {
            console.log("close...")

          }
        })
        Loading.setGlobalLoading(false)
      }, 800)
    }
  }, true)
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
    <SuccessBtn />
    &nbsp;
    <WarningBtn />
    &nbsp;
    <InfoBtn />
    &nbsp;
    <ErrorBtn />
  </div>
}
export const code = `

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
            console.log("close...")
          }
        })
        Loading.setGlobalLoading(false)
      }, 800)
    }
  }, true)
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
    <SuccessBtn />
    &nbsp;
    <WarningBtn />
    &nbsp;
    <InfoBtn />
    &nbsp;
    <ErrorBtn />
  </div>
}
`