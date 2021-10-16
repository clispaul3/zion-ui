import React from 'react';
import { Checkbox, Input, Form, Radio, Button, StateManage } from "zion-ui"

export const Demo002 = function () {
  const [state, Tpl] = Form({
    status: "insert",
    formConfig: {
      columns: 1,
      labelCol: { span: 6 },
      wrapperCol: { span: 12 }
    },
    formItemConfig: [
      {
        field: "username",
        labelProps: {
          label: "用户名",
          required: true
        },
        controlProps: {
          type: Input,
          props: {
            placeholder: "输入用户名",
          }
        }
      },
      {
        field: "sex",
        labelProps: {
          label: "性别",
          required: true
        },
        controlProps: {
          type: Radio,
          props: {
            value: "2",
            httpConfig: {
              init: async () => {
                return [
                  { key: "1", label: "男" },
                  { key: "2", label: "女" }
                ]
              }
            }
          }
        }
      },
      {
        field: "status",
        labelProps: {
          label: "状态",
          required: true
        },
        controlProps: {
          type: Checkbox,
          props: {
            dataSource: [
              { key: "001", label: "未开始" },
              { key: "002", label: "已开始" },
            ]
          }
        }
      }
    ]
  }, false)
  return <div>
    <Tpl></Tpl>
    <Button
      style={{ display: "block" }}
      text="表单数据回填"
      type="primary"
      onClick={async () => {
        const { setFormData } = StateManage.get(state)
        setFormData({
          "username": { value: "H02477", showValue: "admin" },
          "sex": { value: "1" },
          "status": { value: ["001", "002"] }
        })
      }}
    />
  </div>
}

export const code002 = `
import React from 'react';
import { Checkbox, Input, Form, Radio, Button, StateManage } from "zion-ui"

export const Demo002 = function () {
  const [state, Tpl] = Form({
    status: "insert",
    formConfig: {
      columns: 1,
      labelCol: { span: 6 },
      wrapperCol: { span: 12 }
    },
    formItemConfig: [
      {
        field: "username",
        labelProps: {
          label: "用户名",
          required: true
        },
        controlProps: {
          type: Input,
          props: {
            placeholder: "输入用户名",
          }
        }
      },
      {
        field: "sex",
        labelProps: {
          label: "性别",
          required: true
        },
        controlProps: {
          type: Radio,
          props: {
            value: "2",
            httpConfig: {
              init: async () => {
                return [
                  { key: "1", label: "男" },
                  { key: "2", label: "女" }
                ]
              }
            }
          }
        }
      },
      {
        field: "status",
        labelProps: {
          label: "状态",
          required: true
        },
        controlProps: {
          type: Checkbox,
          props: {
            dataSource: [
              { key: "001", label: "未开始" },
              { key: "002", label: "已开始" },
            ]
          }
        }
      }
    ]
  }, false)
  return <div>
    <Tpl></Tpl>
    <Button
      style={{ display: "block" }}
      text="表单数据回填"
      type="primary"
      onClick={async () => {
        const { setFormData } = StateManage.get(state)
        setFormData({
          "username": { value: "H02477", showValue: "admin" },
          "sex": { value: "1" },
          "status": { value: ["001", "002"] }
        })
      }}
    />
  </div>
}`

