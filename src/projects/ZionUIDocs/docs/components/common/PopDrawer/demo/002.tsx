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
	return <div>
		<RightBtn />
		<TopBtn />
		<BottomBtn />
		<LeftBtn />
	</div>
}

export const code = `
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
	return <div>
		<RightBtn />
		<TopBtn />
		<BottomBtn />
		<LeftBtn />
	</div>
}
`
