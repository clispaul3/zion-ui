import React from "react"
import { eleId } from "../../config"

export const Content = function () {
	const height = (document.body.clientHeight - 70) + "px"
	return <div
		id={eleId.DemoContainer}
		style={{
			flex: 1,
			position: "relative",
			background: "#fff",
			padding: "5px 5px 5px 5px",
			height, maxHeight: height, overflow: "auto"
		}}
	/>
}