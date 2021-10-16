/**
 * @description 
 * @param config {"type":"[[Row]]","props":{},"children":[]}
 */
import React from "react"
import { ComDashboard } from "./ComDashboard"
import { Layout } from "./layout"
import { Tabs } from "../../"
import { OutlineTree } from "./OutlineTree"
import { RiFunctionLine, RiGitMergeLine } from "react-icons/ri"

export const LayoutDesigner = function (params: { config?: object | null, height: number }) {
	let { config, height } = params
	if (!config) {
		config = {
			type: "[[Row]]",
			props: {},
			children: []
		}
	}
	const _height = height + "px"
	const [state, Tpl]: any = Layout({ config })
	const Template = () => {
		return <div >
			<div style={{ display: "flex", height: _height, overflow: "auto" }}>
				<div style={{ width: "312px", height: _height, overflow: "auto" }}>
					<Tabs style={{ paddingLeft: "8px", borderRight: "1px solid #eee" }}>
						<Tabs.TabPane tab={<span><RiFunctionLine style={{ position: "relative", top: "2px", left: "-1px" }} />组件库</span>} key="ComDashboard">
							<div style={{ height: height - 62 + "px", overflow: "auto" }}>
								<ComDashboard />
							</div>
						</Tabs.TabPane>
						<Tabs.TabPane tab={<span><RiGitMergeLine style={{ position: "relative", top: "2px", left: "-1px" }} />大纲树</span>} key="OutlineTree">
							<OutlineTree />
						</Tabs.TabPane>
					</Tabs>
				</div>
				<div style={{ maxHeight: _height, overflow: "auto", flex: 1, padding: "20px" }}>
					<Tpl />
				</div>
			</div>
		</div>
	}
	return [state, Template]
}

