import React from 'react';
import { Loading, Button, ButtonProps } from "zion-ui"
import { RedoOutlined } from "@ant-design/icons"

const LoadingIcon: any = RedoOutlined

export const Demo = function () {
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
    &nbsp;
		<Button text="自定义图标" onClick={() => {
			Loading.setGlobalLoading(true, { icon: <LoadingIcon spin style={{ fontSize: "60px", color: "red" }} /> })
			const timer = setTimeout(() => {
				Loading.setGlobalLoading(false)
				clearTimeout(timer)
			}, 800)
		}} />
	</div>
}

export const code = `
import React from 'react';
import { Loading, Button, ButtonProps } from "zion-ui"
import { RedoOutlined } from "@ant-design/icons"

const LoadingIcon: any = RedoOutlined

export const Demo = function () {
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
