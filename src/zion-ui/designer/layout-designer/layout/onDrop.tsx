/**
 * @description 拖放
 */
import { eventTopic, dragLeaveStyle } from "../config"
import { Utils } from "../../.."
import { DefaultPropsMap } from "../../property/config"

export const onDrop = ({ ev, layout, callback }) => {
	ev.preventDefault()
	let { children = [] } = layout
	const eventTypes = ev.dataTransfer.types
	// 从组件面板拖出来
	if (eventTypes.toString() === eventTopic.ComDashboard) {
		let data = ev.dataTransfer.getData(eventTopic.ComDashboard)
		data = JSON.parse(data)
		console.log(data)
		const controlKey = data.key + "$$" + Utils.uuid().replace(/\-/g, "")
		let property = {
			type: "[[Col]]",
			props: {
				style: { padding: "0px 5px", width: "100%" }
			},
			children: [
				{
					type: `[[${data.key}]]`,
					props: {
						controlKey,
						...DefaultPropsMap[data["key"]]["props"]
					}
				}
			]
		}
		// 查询表单布局
		if (data.key === "QueryForm") {
			const formControlKey = "Form$$" + Utils.uuid().replace(/\-/g, "")
			property["children"][0]["props"]["formProps"]["controlKey"] = formControlKey
		}
		const eleId = ev.target.id
		if (eleId) {
			let targetIndex = -1
			children.forEach((child, index) => {
				if (child["children"][0]["props"]["controlKey"] === eleId) {
					targetIndex = index
				}
			})
			children.splice(targetIndex + 1, 0, property)
			ev.target.style.border = dragLeaveStyle
		} else {
			children.push(property)
		}
		layout["children"] = children
		callback({ layout })
	} else if (eventTypes.toString() === eventTopic.DragLayout) {  // 画布内拖动顺序
		ev.target.style.border = dragLeaveStyle
		let data = ev.dataTransfer.getData(eventTopic.DragLayout)
		data = JSON.parse(data)
		const eleId = ev.target.id
		let targetIndex = -1
		let dragIndex = -1
		const controlKey = data["children"][0]["props"]["controlKey"]
		children.forEach((child, index) => {
			if (child["children"][0]["props"]["controlKey"] === eleId) {
				targetIndex = index
			}
			if (child["children"][0]["props"]["controlKey"] === controlKey) {
				dragIndex = index
			}
		})
		children = children.filter(child => child["children"][0]["props"]["controlKey"] !== controlKey)
		children.splice(dragIndex > targetIndex ? targetIndex + 1 : targetIndex, 0, data)
		layout["children"] = children
		callback({ layout })
	}
}