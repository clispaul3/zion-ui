import React from 'react';
import { Checkbox, Input, Form, Radio, FormProps } from "zion-ui"

export const Demo004 = function () {
  const formProps: FormProps = {
    status: "detail",
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
  }
  return <div>
    <Form {...formProps} />
  </div>
}

export const code004 = `
import React from 'react';
import { Checkbox, Input, Form, Radio, FormProps } from "zion-ui"

export const Demo = function () {
  const formProps: FormProps = {
    status: "detail",
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
  }
  return <div>
    <Form {...formProps} />
  </div>
}
`

