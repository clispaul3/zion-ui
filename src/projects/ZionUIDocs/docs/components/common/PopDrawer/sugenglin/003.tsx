import React from 'react';
import { PopDrawer, Button, StateManage, Loading } from "zion-ui"

export const Demo = function () {
  const [btnState, BtnTpl] = Button({
    text: "事件回调",
    type: "danger",
    onClick: function () {
      PopDrawer({
        title: "自定义弹窗标题",
        onCancel: function () {
          window.alert("onCancel")
        },
        onOk: function (params, modalState) {
          console.log(params, modalState)
          StateManage.set(modalState, { visible: false })
          StateManage.set(btnState, { type: "success" })
          Loading.setGlobalLoading(true)
          const timer = setTimeout(() => {
            clearTimeout(timer)
            Loading.setGlobalLoading(false)
          }, 800)
        }
      })
    }
  }, false)

  return <div style={{ marginBottom: "10px" }}>
    <BtnTpl />
  </div>
}

export const code = `
import React from 'react';
import { PopDrawer, Button, StateManage, Loading } from "zion-ui"

export const Demo = function () {
	const [btnState, BtnTpl] = Button({
		text: "事件回调",
		type: "danger",
		onClick: function () {
			PopDrawer({
				title: "自定义弹窗标题",
				onCancel: function () {
					window.alert("onCancel")
				},
				onOk: function (params, modalState) {
					console.log(params, modalState)
					StateManage.set(modalState, { visible: false })
					StateManage.set(btnState, { type: "success" })
					Loading.setGlobalLoading(true)
					const timer = setTimeout(() => {
						clearTimeout(timer)
						Loading.setGlobalLoading(false)
					}, 800)
				}
			})
		}
	}, false)
	return <BtnTpl />
}
`
