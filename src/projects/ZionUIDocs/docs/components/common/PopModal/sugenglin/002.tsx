import React from 'react';
import { PopModal, Button } from "zion-ui"


export const Demo = function () {
  const DragBtn = Button({
    text: "可拖拽",
    type: "primary",
    style: { margin: "0px 5px" },
    onClick: function () {
      PopModal({
        title: "自定义弹窗标题",
        allowDrag: true
      })
    }
  }, true)
  const ResizeBtn = Button({
    text: "可拉伸",
    type: "primary",
    style: { margin: "0px 5px" },
    onClick: function () {
      PopModal({
        title: "自定义弹窗标题",
        allowResize: true
      })
    }
  }, true)
  const FullScreenBtn = Button({
    text: "可全屏",
    type: "primary",
    style: { margin: "0px 5px" },
    onClick: function () {
      PopModal({
        title: "自定义弹窗标题",
        allowFullScreen: true
      })
    }
  }, true)

  return <div style={{ paddingBottom: "10px" }}>
    <DragBtn />
    <ResizeBtn />
    <FullScreenBtn />
  </div>
}

export const code2_1 = `
import React from 'react';
import { PopModal, Button } from "zion-ui"

export const Demo = function () {
  const DragBtn = Button({
    text: "可拖拽",
    type: "primary",
    style: { margin: "0px 5px" },
    onClick: function () {
      PopModal({
        title: "自定义弹窗标题",
        allowDrag: true
      })
    }
  }, true)
  return <div>
    <DragBtn />
  </div>
}
`
export const code2_2 = `
import React from 'react';
import { PopModal, Button } from "zion-ui"

export const Demo = function () {
  const ResizeBtn = Button({
    text: "可拉伸",
    type: "primary",
    style: { margin: "0px 5px" },
    onClick: function () {
      PopModal({
        title: "自定义弹窗标题",
        allowResize: true
      })
    }
  }, true)
  return <div>
    <ResizeBtn />
  </div>
}
`
export const code2_3 = `
import React from 'react';
import { PopModal, Button } from "zion-ui"

export const Demo = function () {
  const FullScreenBtn = Button({
    text: "可全屏",
    type: "primary",
    style: { margin: "0px 5px" },
    onClick: function () {
      PopModal({
        title: "自定义弹窗标题",
        allowFullScreen: true
      })
    }
  }, true)
  return <div>
    <FullScreenBtn />
  </div>
}
`