import React from 'react';
import { Checkbox } from "zion-ui"

export const Demo = function () {
  const Tpl = Checkbox({
    placement: "inline",
    value: ["001", "003"],
    httpConfig: {
      init: async () => {
        return [
          { key: "001", label: "未开始" },
          { key: "002", label: "进行中" },
          { key: "003", label: "已结束" }
        ]
      }
    }
  }, true)
  return <Tpl />
}

export const code = `
import React from 'react';
import { Checkbox } from "zion-ui"

export const Demo = function () {
	const Tpl = Checkbox({
		showAll: true,
		placement: "inline",
		value: ["001", "003"],
		httpConfig: {
			init: async () => {
				return [
					{ key: "001", label: "未开始" },
					{ key: "002", label: "进行中" },
					{ key: "003", label: "已结束" }
				]
			}
		}
	}, true)
	return <Tpl />
}
`
