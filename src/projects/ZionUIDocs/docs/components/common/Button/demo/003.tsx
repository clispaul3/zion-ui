import React from "react"
import { Button } from "zion-ui"

export const Demo = function () {
	const BtnTpl = Button({ text: "small", size: "small" }, true)
	return <BtnTpl />
}

export const code = `
import React from "react"
import { Button } from "zion-ui"

export const Demo = function () {
	const BtnTpl = Button({ text: "small", size:"small" }, true)
	return <BtnTpl />
}
`