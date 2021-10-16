import React from 'react';
import { SelectMenu, Tag } from "zion-ui"
import { WarningTwoTone } from "@ant-design/icons"

export const Demo = function () {
  const Status = SelectMenu({
    text: "未开始",
    placement: "topCenter",
    trigger: ["hover"],
    dataSource: [
      { key: "1", label: "未开始" },
      { key: "111", uiPid: "1", label: "children" },
      {
        key: "2", label: "进行中", render: item => {
          const Tpl = Tag({
            type: "processing",
            text: item["label"]
          }, true)
          return <Tpl />
        }
      },
      { key: "3", label: "已暂停", icon: <WarningTwoTone /> },
      { key: "4", label: "已结束", disabled: true }
    ],
    label: "状态",
    required: true,
    hasFeedback: true,
    autoValidate: true,
    layout: {
      labelCol: { span: 10 }
    }
  }, true)

  return <div style={{ width: "200px" }}>
    <Status />
  </div>
}

export const code = `
import React from 'react';
import { SelectMenu, Tag } from "zion-ui"
import { WarningTwoTone } from "@ant-design/icons"

export const Demo = function () {
	const Status = SelectMenu({
		text: "未开始",
		placement: "topCenter",
		trigger: ["hover"],
		dataSource: [
			{ key: "1", label: "未开始" },
			{ key: "111", uiPid: "1", label: "children" },
			{
				key: "2", label: "进行中", render: item => {
					const Tpl = Tag({
						type: "processing",
						text: item["label"]
					}, true)
					return <Tpl />
				}
			},
			{ key: "3", label: "已暂停", icon: <WarningTwoTone /> },
			{ key: "4", label: "已结束", disabled: true }
		],
		label: "状态",
		required: true,
		hasFeedback: true,
		autoValidate: true,
		layout: {
			labelCol: { span: 10 }
		}
	}, true)

	return <div style={{ width: "200px" }}>
		<Status />
	</div>
}
`
