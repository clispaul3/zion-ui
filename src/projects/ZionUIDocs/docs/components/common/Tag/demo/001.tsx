import React from 'react';
import { Tag } from "zion-ui"
import { WarningTwoTone, CloseCircleFilled } from "@ant-design/icons"

export const Demo = function () {
	return <div>
		<Tag text="未开始" />
		<Tag text="删除" color="red" icon={<WarningTwoTone />} closable={true} />
		<Tag text="自定义删除图标" color="blue" closeIcon={<CloseCircleFilled />} closable={true} />
	</div>
}

export const code = `
import React from 'react';
import { Tag } from "zion-ui"
import { WarningTwoTone, CloseCircleFilled } from "@ant-design/icons"

export const Demo = function () {
	return <div>
		<Tag text="未开始" />
		<Tag text="删除" color="red" icon={<WarningTwoTone />} closable={true} />
		<Tag text="自定义删除图标" color="blue" closeIcon={<CloseCircleFilled />} closable={true} />
	</div>
}
`
