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
	return <div>
		<DragBtn />
		<ResizeBtn />
		<FullScreenBtn />
	</div>
}

export const code = `
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
  return <div>
    <DragBtn />
    <ResizeBtn />
    <FullScreenBtn />
  </div>
}
`
