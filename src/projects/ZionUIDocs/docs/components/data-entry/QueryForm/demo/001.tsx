import React from 'react';
import { Checkbox, Input, Form, DateTime, Select, Radio, Rate, Button, StateManage, PopMessage } from "zion-ui"
import moment from 'moment';

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
            value: ["001"],
            dataSource: [
              { key: "001", label: "未开始" },
              { key: "002", label: "已开始" },
            ]
          }
        }
      },
      {
        field: "birthday",
        labelProps: {
          label: "出生日期"
        },
        controlProps: {
          type: DateTime,
          props: {
            placeholder: "请选择",
            style: { width: "100%" },
            disabledDate: (date) => date.isAfter(moment()) || date.isSame(moment())
          }
        }
      },
      {
        field: "city",
        labelProps: {
          label: "籍贯"
        },
        controlProps: {
          type: Select,
          props: {
            dataSource: [
              { key: "001", label: "广东省广州市" },
              { key: "002", label: "广东省深圳市" },
            ]
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
    <Button
      style={{ display: "block", marginBottom: "8px" }}
      text="获取表单数据"
      type="primary"
      onClick={async () => {
        const { getFormData } = StateManage.get(state)
        const formData = await getFormData(true)
        PopMessage({ type: "success", text: JSON.stringify(formData) })
      }}
    />
  </div>
}

export const code = `
import React from 'react';
import { Checkbox, Input, Form, DateTime, Select, Radio, Rate, Button, StateManage, PopMessage } from "zion-ui"
import moment from 'moment';

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
            value: ["001"],
            dataSource: [
              { key: "001", label: "未开始" },
              { key: "002", label: "已开始" },
            ]
          }
        }
      },
      {
        field: "birthday",
        labelProps: {
          label: "出生日期"
        },
        controlProps: {
          type: DateTime,
          props: {
            placeholder: "请选择",
            style: { width: "100%" },
            disabledDate: (date) => date.isAfter(moment()) || date.isSame(moment())
          }
        }
      },
      {
        field: "city",
        labelProps: {
          label: "籍贯"
        },
        controlProps: {
          type: Select,
          props: {
            dataSource: [
              { key: "001", label: "广东省广州市" },
              { key: "002", label: "广东省深圳市" },
            ]
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
    <Button
      style={{ display: "block" }}
      text="获取表单数据"
      type="primary"
      onClick={async () => {
        const { getFormData } = StateManage.get(state)
        const formData = await getFormData(true)
        PopMessage({ type: "success", text: JSON.stringify(formData) })
      }}
    />
  </div>
}
`
