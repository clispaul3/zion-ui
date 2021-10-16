import * as componentsDemo from "../../docs/components"
import * as appDemo from "../../docs/app"
import * as  frameworkDocs from "../../docs/framework"
import { eleId } from "../../config"
import React from "react"
import ReactDOM from "react-dom"
import { Result } from 'antd'

const allDemo = {
	...componentsDemo,
	...appDemo,
	...frameworkDocs
}

export const Service = {
	toggleMenu: function ({ key }) {
		let Template = allDemo[key]
		if (!Template) {
			Template = () => {
				return <Result status={404} />
			}
		}
		ReactDOM.render(<Template />, document.getElementById(eleId.DemoContainer))
	}
}