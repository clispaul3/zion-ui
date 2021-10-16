import React from 'react';
import { Radio, RadioProps } from "zion-ui"

export const Demo = function () {
	const props: RadioProps = {
		placement: "vertical",
		value: "001",
		allowCancel: true,
		httpConfig: {
			init: async () => {
				return [
					{ key: "001", label: "未开始" },
					{ key: "002", label: "进行中", disabled: true },
					{ key: "003", label: "已结束" }
				]
			}
		}
	}
	return <div>
		<Radio {...props} />
	</div>
}

export const code = `
import React from 'react';
import { Radio, RadioProps } from "zion-ui"

const Demo = function () {
	const props: RadioProps = {
		placement: "vertical",
		value: "001",
		allowCancel: true,
		httpConfig: {
			init: async () => {
				return [
					{ key: "001", label: "未开始" },
					{ key: "002", label: "进行中", disabled: true },
					{ key: "003", label: "已结束" }
				]
			}
		}
	}
	return <div>
		<Radio {...props} />
	</div>
}
`