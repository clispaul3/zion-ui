import React from "react"
import { Menu, Empty } from "antd"
import { BaseService } from "../../base"
import { defaultClassName } from "../../../@types/Menu"
import { EventHandlerParams, MouseEventType } from "../../../@types/Base"

const { Item: MenuItem, SubMenu, ItemGroup: MenuGroup } = Menu

export class Service extends BaseService {
	constructor(props: Object, isPureComponent?: boolean) {
		super(props, isPureComponent)
	}
	/**
	 * @description 获取类名
	 */
	getClassName() {
		const { className } = this.getProps()
		let nextClassName = super.getClassName(defaultClassName)
		if (className) {
			nextClassName.push(className)
		}
		return nextClassName
	}
	/**
	 * @description 事件处理
	 */
	eventHandler(params: EventHandlerParams) {
		const { ev, eventName } = params
		const { disabled, loading } = this.getProps()
		ev && ev.stopPropagation && ev.stopPropagation()
		if (disabled || loading) return;
		(this as any)[eventName]({ ev, eventName })
	}
	/**
	 * @description onClick事件
	 * @param data 
	 */
	onClick({ key, current }) {
		const { onClick } = this.getProps()
		if (!this.isPureComponent) {
			this.setProps({ selectedKeys: [key] })
		}
		if (onClick && typeof onClick === "function") {
			onClick({ ev: null, value: key, current, eventName: MouseEventType.onClick }, this.props)
		}
	}
	/**
	 * @description SubMenu 展开/关闭的回调
	 */
	onOpenChange(openKeys) {
		const { onOpenChange } = this.getProps()
		if (!this.isPureComponent) {
			this.setProps({ openKeys })
		}
		if (onOpenChange && typeof onOpenChange === "function") {
			onOpenChange({ openKeys }, this.props)
		}
	}
	/**
	 * @description 渲染单个菜单节点
	 */
	renderMenuItem(data) {
		const { isGroupMenu, isSubMenu, key, label, children = [], icon } = data
		if (isGroupMenu) {
			if (children.length <= 0) return null
			const Title = function () {
				if (icon) {
					return <span style={{ paddingLeft: "8px" }}>
						{icon}&nbsp;&nbsp;{label}
					</span>
				}
				return <span style={{ paddingLeft: "8px" }}>{label}</span>
			}
			return <MenuGroup key={key} title={<Title />}>
				{children.map(data => {
					return this.renderMenuItem(data)
				})}
			</MenuGroup>
		}
		if (isSubMenu) {
			if (children.length <= 0) return null
			return <SubMenu key={key} title={label} icon={icon} onTitleClick={({ key }) => {
				// console.log(key)
			}}>
				{children.map(data => {
					return this.renderMenuItem(data)
				})}
			</SubMenu>
		}
		return <MenuItem
			key={key}
			title={label}
			onClick={({ key }) => {
				this.onClick({ key, current: data })
			}} icon={icon}>
			{data.render ? data.render(data) : label}
		</MenuItem>
	}
	/**
	 * @description 获取组件模板
	 */
	getTemplate(): React.ReactElement | null {
		let { dataSource, selectedKeys, style, openKeys, theme, layout, show } = this.getProps()
		if (!show) return null
		const allProps: any = {
			className: this.getClassName().join(" "),
			style,
			mode: layout,
			theme,
			openKeys,
			selectedKeys,
			onOpenChange: this.onOpenChange.bind(this)
		}
		// 通过mobx受控
		if (!this.isPureComponent) {
			allProps.selectedKeys = selectedKeys
		}
		if (dataSource.length <= 0) {
			return <Empty description={<span style={{ color: "#ccc", fontSize: "12px" }}>暂无数据</span>} />
		}
		return <Menu {...allProps}>
			{dataSource.map(data => {
				return this.renderMenuItem(data)
			})}
		</Menu>
	}
}
