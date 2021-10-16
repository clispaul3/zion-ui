import React from 'react';
import { Input, Form, Radio, Rate, StateManage } from "zion-ui"

export const Demo003 = function () {
  const [state, Tpl] = Form({
    status: "insert",
    formConfig: {
      columns: 1,
      labelCol: { span: 6 },
      wrapperCol: { span: 8 }
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
            placeholder: "输入刘德华试试",
            onChange: function ({ value }) {
              const { setFormControlProps } = StateManage.get(state)
              if (value === "刘德华") {
                setFormControlProps("sex", { value: "1" })
                setFormControlProps("appearance", { value: 5 })
              } else {
                setFormControlProps("sex", { value: "2" })
                setFormControlProps("appearance", { value: 1 })
              }
            }
          }
        }
      },
      {
        field: "sex",
        labelProps: {
          label: "性别",
          required: true,
          help: "取消性别试试"
        },
        controlProps: {
          type: Radio,
          props: {
            value: "2",
            allowCancel: true,
            onChange: function ({ value }) {
              const { setFormLabelProps } = StateManage.get(state)
              if (!value) {
                setFormLabelProps("sex", { validateStatus: "error", help: "性别必填" })
              } else {
                setFormLabelProps("sex", { validateStatus: "success", help: "" })
              }
            },
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
        field: "appearance",
        labelProps: {
          label: "颜值"
        },
        controlProps: {
          type: Rate,
          props: {
            value: 3,
            count: 5,
            tooltips: ["一般", "还可以", "帅气", "盛世容颜", "一笑倾城"]
          }
        }
      }
    ]
  }, false)
  return <div>
    <Tpl></Tpl>
  </div>
}

export const code003 = `
import React from 'react';
import { Input, Form, Radio, Rate, StateManage } from "zion-ui"

export const Demo = function () {
  const [state, Tpl] = Form({
    status: "insert",
    formConfig: {
      columns: 1,
      labelCol: { span: 6 },
      wrapperCol: { span: 8 }
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
            placeholder: "输入刘德华试试",
            onChange: function ({ value }) {
              const { setFormControlProps } = StateManage.get(state)
              if (value === "刘德华") {
                setFormControlProps("sex", { value: "1" })
                setFormControlProps("appearance", { value: 5 })
              } else {
                setFormControlProps("sex", { value: "2" })
                setFormControlProps("appearance", { value: 1 })
              }
            }
          }
        }
      },
      {
        field: "sex",
        labelProps: {
          label: "性别",
          required: true,
          help: "取消性别试试"
        },
        controlProps: {
          type: Radio,
          props: {
            value: "2",
            allowCancel: true,
            onChange: function ({ value }) {
              const { setFormLabelProps } = StateManage.get(state)
              if (!value) {
                setFormLabelProps("sex", { validateStatus: "error", help: "性别必填" })
              } else {
                setFormLabelProps("sex", { validateStatus: "success", help: "" })
              }
            },
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
        field: "appearance",
        labelProps: {
          label: "颜值"
        },
        controlProps: {
          type: Rate,
          props: {
            value: 3,
            count: 5,
            tooltips: ["一般", "还可以", "帅气", "盛世容颜", "一笑倾城"]
          }
        }
      }
    ]
  }, false)
  return <div>
    <Tpl></Tpl>
  </div>
}
`

