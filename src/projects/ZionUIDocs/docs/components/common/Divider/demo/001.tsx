import React from 'react';
import { Divider } from "zion-ui"

export const Demo = function () {
	const CenterDivider = Divider({
		content: "居中显示的分割线",
	}, true)
	const DeleteDivider = Divider({
		content: "居右显示的分割线",
		placement: "right",
		dashed: true
	}, true)
	const LeftDivider = Divider({
		content: "居左显示的分割线",
		placement: "left",
		plain: true,
		style: { color: "red", fontSize: "18px" }
	}, true)
	return <div>
		<DeleteDivider />
		<CenterDivider />
		<LeftDivider />
		<Divider content="这是一条分割线" dashed={true} />
	</div>
}

export const code = `
import React from 'react';
import { Divider } from "zion-ui"

export const Demo = function () {
  const CenterDivider = Divider({
    content: "居中显示的分割线",
  }, true)
  const DeleteDivider = Divider({
    content: "居右显示的分割线",
    placement: "right",
    dashed: true
  }, true)
  const LeftDivider = Divider({
    content: "居左显示的分割线",
    placement: "left",
    plain: true,
    style: { color: "red", fontSize: "18px" }
  }, true)
  return <div>
    <DeleteDivider />
    <CenterDivider />
    <LeftDivider />
    <Divider content="这是一条分割线" dashed={true} />
  </div>
}
`


