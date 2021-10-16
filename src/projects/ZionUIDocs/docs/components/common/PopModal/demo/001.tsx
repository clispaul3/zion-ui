import React from 'react';
import { PopModal, Button } from "zion-ui"
import { DownloadOutlined } from "@ant-design/icons"
import { Button as AntButton } from "antd"

const Icon: any = DownloadOutlined

export const Demo = function () {
  const BtnTpl = Button({
    text: "open modal",
    type: "primary",
    style: { margin: "5px" },
    onClick: function () {
      PopModal({
        title: "自定义弹窗标题",
        width: "20%",
        height: "400px",
        content: <div>
          PopModal
        </div>
      })
    }
  }, true)
  const NoTitle = Button({
    text: "不展示title",
    type: "info",
    onClick: function () {
      PopModal({
        title: null,
        footer: <AntButton icon={<Icon />} type="primary" size="small">下载</AntButton>,
        width: "400px",
        height: "400px",
      })
    }
  }, true)
  return <div>
    <BtnTpl />
    <NoTitle />
  </div>
}

export const code = `
import React from 'react';
import { PopModal, Button } from "zion-ui"
import { DownloadOutlined } from "@ant-design/icons"
import { Button as AntButton } from "antd"

const Icon: any = DownloadOutlined

export const Demo = function () {
  const BtnTpl = Button({
    text: "open modal",
    type: "primary",
    style: { margin: "5px" },
    onClick: function () {
      PopModal({
        title: "自定义弹窗标题",
        width: "20%",
        height: "400px",
        content: <div>
          PopModal
				</div>
      })
    }
  }, true)
  const NoTitle = Button({
    text: "不展示title",
    type: "info",
    onClick: function () {
      PopModal({
        title: null,
        footer: <AntButton icon={<Icon />} type="primary" size="small">下载</AntButton>,
        width: "400px",
        height: "400px",
      })
    }
  }, true)
  return <div>
    <BtnTpl />
    <NoTitle />
  </div>
}
`
