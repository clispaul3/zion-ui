## ColorPicker 拾色器
###　完整API
```tsx
export interface IProps extends IBaseFormModel {
	/** 色值  */
  value?: string                          
}
```
### 基本使用
```tsx
import React from 'react';
import { ColorPicker } from "zion-ui"

export const Demo = function () {
  return <div style={{ padding: "20px 200px" }}>
    {/* value也可以是#eee */}
    <ColorPicker value="red" />
  </div>
}
```
![基本使用](./ColorPicker.gif)