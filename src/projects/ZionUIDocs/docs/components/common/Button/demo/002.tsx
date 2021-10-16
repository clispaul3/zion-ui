import React from "react"
import { Button } from "zion-ui"

export const Demo = function () {
	const [btnState, BtnTpl] = Button({ text: "warning", type: "warning" }, false)
	return <BtnTpl />
}

export const code = `
import React from "react"
import { Button } from "zion-ui"

export const Demo = function () {
	const [btnState, BtnTpl] = Button({ text: "warning", type: "warning" }, false)
	return <BtnTpl />
}
`