import React from 'react';
import { PopDrawer, Button } from "zion-ui"

export const Demo = function () {
  const WidthBtn = Button({
    text: "自定义宽度",
    type: "primary",
    onClick: function () {
      PopDrawer({
        width: "80%"
      })
    }
  }, true)
  const HeightBtn = Button({
    text: "自定义高度",
    type: "primary",
    onClick: function () {
      PopDrawer({
        placement: "top",
        height: "80%"
      })
    }
  }, true)
  return <div style={{ marginBottom: "10px" }}>
    <WidthBtn />
    &nbsp;
    <HeightBtn />
  </div>
}

export const code5_1 = `
import React from 'react';
import { PopDrawer, Button } from "zion-ui"

export const Demo = function () {
	const WidthBtn = Button({
		text: "自定义宽度",
		type: "primary",
		onClick: function () {
			PopDrawer({
				width: "80%"
			})
		}
	}, true)

	return <div>
		<WidthBtn />
	</div>
}
`
export const code5_2 = `
import React from 'react';
import { PopDrawer, Button } from "zion-ui"

export const Demo = function () {
	const HeightBtn = Button({
		text: "自定义高度",
		type: "primary",
		onClick: function () {
			PopDrawer({
				placement: "top",
				height: "80%"
			})
		}
	}, true)
	return <div>
		<HeightBtn />
	</div>
}
`
