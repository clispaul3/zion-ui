import React from 'react';
import { Checkbox, CheckboxProps, Button, PopMessage, StateManage } from "zion-ui"

export const Demo = function () {
  const controlKey = "Checkbox_Demo002.Checkbox"
  const props: CheckboxProps = {
    controlKey,
    showAll: true,
    placement: "vertical",
    value: ["001", "003"],
    httpConfig: {
      init: async () => {
        return [
          { key: "001", label: "未开始" },
          { key: "002", label: "进行中", disabled: true },
          { key: "003", label: "已结束" }
        ]
      }
    }
  }
  return <div>
    <Checkbox {...props} />
    <br /><br />
    <Button text="获取复选框选中的值" onClick={() => {
      const { value } = StateManage.get(controlKey)
      PopMessage({
        type: "success",
        text: value?.toString()
      })
    }} />
    <br /><br />
    <Button text="全部选中" onClick={() => {
      StateManage.set(controlKey, {
        placement: "inline",
        value: ["001", "002", "003"]
      })
    }} />
  </div>
}

export const code = `
import React from 'react';
import { Checkbox, CheckboxProps, Button, PopMessage, StateManage } from "zion-ui"

export const Demo = function () {
	const controlKey = "Checkbox_Demo002.Checkbox"
	const props: CheckboxProps = {
		controlKey,
		showAll: true,
		placement: "vertical",
		value: ["001", "003"],
		httpConfig: {
			init: async () => {
				return [
					{ key: "001", label: "未开始" },
					{ key: "002", label: "进行中", disabled: true },
					{ key: "003", label: "已结束" }
				]
			}
		}
	}
	return <div>
		<Checkbox {...props} />
		<Button text="获取复选框选中的值" onClick={() => {
			const { value } = StateManage.get(controlKey)
			PopMessage({
				type: "success",
				text: value?.toString()
			})
		}} />
		<br /><br />
		<Button text="全部选中" onClick={() => {
			StateManage.set(controlKey, {
				placement: "inline",
				value: ["001", "002", "003"]
			})
		}} />
	</div>
}
`
