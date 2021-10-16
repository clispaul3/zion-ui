import React from 'react';
import { PopDrawer, Button, ButtonProps, PopMessage } from "zion-ui"
import { DownloadOutlined } from "@ant-design/icons"
import { Button as AntButton } from "antd"

export const Demo = function () {
  const btnProps: ButtonProps = {
    text: "PopDrawer",
    type: "primary",
    style: { margin: "5px" },
    onClick: function () {
      PopDrawer({
        title: "自定义弹窗标题",
        width: "20%",
        content: <div>
          content
        </div>
      })
    }
  }
  const NoTitle = Button({
    text: "不展示title",
    type: "info",
    onClick: function () {
      PopDrawer({
        title: null,
        placement: "top",
        footer: <div style={{ textAlign: "right" }}>
          <AntButton icon={<DownloadOutlined />} type="primary" size="small">下载</AntButton>
        </div>,
        width: "400px",
        height: "400px",
      })
    }
  }, true)
  return <div style={{ marginBottom: "10px" }}>
    <Button {...btnProps} />
    <NoTitle />
  </div>
}

export const code1_1 = `
import React from 'react';
import { PopDrawer, Button, ButtonProps } from "zion-ui"
import { DownloadOutlined } from "@ant-design/icons"
import { Button as AntButton } from "antd"

export const Demo = function () {
	const btnProps: ButtonProps = {
		text: "PopDrawer",
		type: "primary",
		style: { margin: "5px" },
		onClick: function () {
			PopDrawer({
				title: "自定义弹窗标题",
				width: "20%",
				content: <div>
					content
				</div>
			})
		}
	}
	return <div>
		<Button {...btnProps} />
	</div>
}
`
export const code1_2 = `
import React from 'react';
import { PopDrawer, Button, ButtonProps } from "zion-ui"
import { DownloadOutlined } from "@ant-design/icons"
import { Button as AntButton } from "antd"

export const Demo = function () {
	const NoTitle = Button({
		text: "不展示title",
		type: "info",
		onClick: function () {
			PopDrawer({
				title: null,
				placement: "top",
				footer: <div style={{ textAlign: "right" }}>
					<AntButton icon={<DownloadOutlined />} type="primary" size="small">下载</AntButton>
				</div>,
				width: "400px",
				height: "400px",
			})
		}
	}, true)
	return <div>
		<NoTitle />
	</div>
}
`