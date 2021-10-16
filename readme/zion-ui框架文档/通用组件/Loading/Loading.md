## Loading 全局Loading
### 基本使用
```tsx
import React from 'react';
import { Loading, Button, ButtonProps } from "zion-ui"

export const Demo = function () {
  const btnProps: ButtonProps = {
    text: "基本使用",
    type: "primary",
    onClick: function () {
      // 开始Loading
      Loading.setGlobalLoading(true)
      const timer = setTimeout(() => {
        // 结束Loading
        Loading.setGlobalLoading(false)
        clearTimeout(timer)
      }, 800)
    }
  }
  return <div style={{ padding: "20px 20px" }}>
    <Button {...btnProps} />
  </div>
}
```
![基本使用](./baseUse.gif)
### 自定义图标
```tsx
import React from 'react';
import { Loading, Button } from "zion-ui"
import { RedoOutlined } from "@ant-design/icons"

const LoadingIcon: any = RedoOutlined
export const Demo = function () {
  return <div style={{ padding: "20px 20px" }}>
    <Button text="自定义图标" onClick={() => {
      Loading.setGlobalLoading(true, { icon: <LoadingIcon spin style={{ fontSize: "60px", color: "red" }} /> })
      const timer = setTimeout(() => {
        Loading.setGlobalLoading(false)
        clearTimeout(timer)
      }, 800)
    }} />
  </div>
}
```
![自定义图标](./iconUse.gif)