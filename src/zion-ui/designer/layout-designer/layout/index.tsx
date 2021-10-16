/**
 * @description 组件设计画布
 */
import React from "react"
import { observer, PropertyService, StateManage } from "../../../"
import { CloseCircleOutlined, EditOutlined } from "@ant-design/icons"
import { cloneDeep } from "lodash"
import { eventTopic, containerClassName, dragOverStyle, dragLeaveStyle } from "../config"
import { onEdit } from "./onEdit"
import { onDrop } from "./onDrop"
import { onDelete } from "./onDelete"

export const Layout = ({ config }) => {
	const state = PropertyService.getObservableObj({ config })
	const Template = observer(function () {
		const config = StateManage.get(state, "config")
		const { children = [] } = config
		const onDragStart = (ev, data) => {
			ev.dataTransfer.setData(eventTopic.DragLayout, JSON.stringify(data))
		}
		const onDragOver = (ev, data) => {
			ev.preventDefault()
			if (ev.target.classList.contains(containerClassName)) {
				ev.target.style.border = dragOverStyle
			}
		}
		return <div
			style={{ width: "100%", height: "100%", background: "#fff" }}
			onDrop={(ev) => onDrop({
				ev,
				layout: config,
				callback: ({ layout }) => {
					StateManage.set(state, { config: layout })
				}
			})}
			onDragOver={(ev) => ev.preventDefault()}>
			{children.map(child => {
				return <div
					draggable={true}
					key={child["children"][0]["props"]["controlKey"]}
					id={child["children"][0]["props"]["controlKey"]}
					onDragStart={(ev) => onDragStart(ev, child)}
					onDragOver={(ev) => onDragOver(ev, child)}
					onDragLeave={(ev: any) => {
						ev.preventDefault()
						ev.target.style.border = dragLeaveStyle
					}}
					style={{ border: dragLeaveStyle, cursor: "move", position: "relative" }}
					className={containerClassName}>
					{PropertyService.getReactElementFromJSON(cloneDeep(child))}
					<CloseCircleOutlined
						className={"close-icon"}
						onClick={() => onDelete({
							config: child,
							layout: config,
							callback: ({ layout }) => {
								StateManage.set(state, { config: layout })
							}
						})}
					/>
					<EditOutlined
						className={"edit-icon"}
						onClick={() => onEdit({
							config: child,
							layout: config,
							callback: ({ layout }) => {
								StateManage.set(state, { config: layout })
							}
						})}
					/>
				</div>
			})}
		</div>
	})
	return [state, Template]
}