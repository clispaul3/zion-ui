import React from 'react';
import { Radio } from "zion-ui"

export const Demo = function () {
  const Tpl = Radio({
    placement: "inline",
    allowCancel: true,
    onChange: (a) => {
      console.log(a);

    },
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
import { Radio } from "zion-ui"

export const Demo = function () {
	const Tpl = Radio({
		placement: "inline",
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
