import React from "react"
import ReactDOM from "react-dom"
import { Button } from "zion-mobile"

const App = () => {
	return <div style={{ margin: "100px 100px" }}>
		<Button
			text="zion-mobile"
			type="primary"
			onClick={() => {
				alert("zion-mobile")
			}}
		/>
	</div>
}

ReactDOM.render(<App />, document.getElementById("zion-ui"))
