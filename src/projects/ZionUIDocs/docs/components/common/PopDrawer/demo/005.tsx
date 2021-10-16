import { Typography } from 'antd';
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
	return <div>
		<Typography.Paragraph mark>仅当placement = top | bottom 时，设置高度有效</Typography.Paragraph>
		<Typography.Paragraph mark>仅当placement = right | left 时，设置宽度有效</Typography.Paragraph>
		<WidthBtn />
		&nbsp;
		<HeightBtn />
	</div>
}

export const code = `
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
	return <div>
		<WidthBtn />
		&nbsp;
		<HeightBtn />
	</div>
}
`
