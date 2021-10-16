import React from "react"
import ReactDOM from "react-dom"

import { ModuleMenu } from "./modules/Menu"
import { Header } from './modules/Header'
import { Content } from "./modules/Content/Index"

const ZionUIDocs = function () {
	return <div>
		<Header />
		<div style={{ height: "5px" }}></div>
		<div style={{ display: "flex" }}>
			<ModuleMenu />
			<Content />
		</div>
	</div>
}

ReactDOM.render(<ZionUIDocs />, document.getElementById("zion-ui"))




