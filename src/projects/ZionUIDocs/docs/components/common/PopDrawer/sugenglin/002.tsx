import React from 'react';
import { PopDrawer, Button } from "zion-ui"

export const Demo = function () {
  const RightBtn = Button({
    text: "right",
    type: "primary",
    style: { margin: "0px 5px" },
    onClick: function () {
      PopDrawer({
        placement: "right"
      })
    }
  }, true)
  const TopBtn = Button({
    text: "top",
    type: "primary",
    style: { margin: "0px 5px" },
    onClick: function () {
      PopDrawer({
        placement: "top"
      })
    }
  }, true)
  const BottomBtn = Button({
    text: "bottom",
    type: "primary",
    style: { margin: "0px 5px" },
    onClick: function () {
      PopDrawer({
        placement: "bottom"
      })
    }
  }, true)
  const LeftBtn = Button({
    text: "left",
    type: "primary",
    style: { margin: "0px 5px" },
    onClick: function () {
      PopDrawer({
        placement: "left"
      })
    }
  }, true)
  return <div style={{ marginBottom: "10px" }}>
    <RightBtn />
    <TopBtn />
    <BottomBtn />
    <LeftBtn />
  </div>
}

export const code2_1 = `
import React from 'react';
import { PopDrawer, Button } from "zion-ui"

export const Demo = function () {
	const RightBtn = Button({
		text: "right",
		type: "primary",
		style: { margin: "0px 5px" },
		onClick: function () {
			PopDrawer({
				placement: "right"
			})
		}
	}, true)
	return <div>
		<RightBtn />
	</div>
}
`
export const code2_2 = `
import React from 'react';
import { PopDrawer, Button } from "zion-ui"

export const Demo = function () {
	const TopBtn = Button({
		text: "top",
		type: "primary",
		style: { margin: "0px 5px" },
		onClick: function () {
			PopDrawer({
				placement: "top"
			})
		}
	}, true)

	return <div>
		<TopBtn />
	</div>
}
`
export const code2_3 = `
import React from 'react';
import { PopDrawer, Button } from "zion-ui"

export const Demo = function () {
	const BottomBtn = Button({
		text: "bottom",
		type: "primary",
		style: { margin: "0px 5px" },
		onClick: function () {
			PopDrawer({
				placement: "bottom"
			})
		}
	}, true)

	return <div>
		<BottomBtn />
	</div>
}
`
export const code2_4 = `
import React from 'react';
import { PopDrawer, Button } from "zion-ui"

export const Demo = function () {
	const LeftBtn = Button({
		text: "left",
		type: "primary",
		style: { margin: "0px 5px" },
		onClick: function () {
			PopDrawer({
				placement: "left"
			})
		}
	}, true)
	return <div>
		<LeftBtn />
	</div>
}
`

