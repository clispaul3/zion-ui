import React, { useEffect } from "react";
import { IDataSourceItem, defaultClassName } from "../../../@types/SelectMenu";
import { Dropdown, Button, Menu } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { BaseService } from "../../base";
import { Utils } from "../../../utils";
import { EventHandlerParams, MouseEventType } from "../../../@types/Base";

const { SubMenu } = Menu;

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
		const { ev } = params as any
		ev && ev.stopPropagation && ev.stopPropagation()
	}
	/**
	 * @description 菜单项的点击事件 
	 */
	onMenuClick(data: any) {
		const { key, item } = data
		const title = item.props.title
		const { onMenuClick, dataSource } = this.getProps()
		if (!this.isPureComponent) {
			this.setProps({ text: title })
		}
		if (onMenuClick && typeof onMenuClick === "function") {
			onMenuClick({ ev: null, eventName: MouseEventType.onMenuClick, value: key, data: dataSource.find((item: any) => item["key"] == key) }, this.props)
		}
	}

	/**
	 * 根据传入数据源 dataSource 生成 menu 组件
	 * @param dataSource
	 * @param options
	 */
	generateMenu = (
		dataSource: IDataSourceItem[],
		options?: {
			isSub?: boolean;
			key?: number | string;
			title?: string;
		}
	): React.ReactElement => {
		let processedGroups: any = [];
		let menus = dataSource
			.map((item: any, i: number) => {
				let curDefaultKey = options ? `${options.key}-${i}` : i;
				if (item.children && item.children.length > 0) {
					return this.generateMenu(item.children, {
						isSub: true,
						key: item.key || curDefaultKey,
						title: item.label
					});
				} else if (item.group && processedGroups.indexOf(item.group) === -1) {
					processedGroups.push(item.group);
					return (
						<Menu.ItemGroup key={item.key || curDefaultKey} title={item.label}>
							{dataSource
								.filter((gItem: any) => gItem.group === item.group)
								.map((gItem: any, j: number) => (
									<Menu.Item
										key={`${item.key || curDefaultKey}#${gItem.key || j}`}
									>
										{gItem.render ? gItem.render(item) : gItem.label}
									</Menu.Item>
								))}
						</Menu.ItemGroup>
					);
				} else if (item.divider) {
					return <Menu.Divider key={item.key || curDefaultKey} />;
				} else if (!item.group) {
					return (
						<Menu.Item
							key={item.key || curDefaultKey}
							title={item.label}
							icon={item.icon}
							disabled={item.disabled}
						>
							{item.render ? item.render(item) : item.label}
						</Menu.Item>
					);
				}
			})
			.filter(item => item);
		if (options && options.isSub) {
			return (
				<SubMenu key={options.key} title={options.title}>
					{menus}
				</SubMenu>
			);
		} else {
			return <Menu onClick={this.onMenuClick.bind(this)}>{menus}</Menu>;
		}
	};

	/**
	 * @description 生成下拉菜单载体，子组件 children 优先级高于 type
	 */
	generateContainer = () => {
		let { type, text, icon, size, buttonType } = this.getProps();
		if (type === "button") {
			return (
				<Button size={size} type={buttonType}>
					{text} {icon ? icon : <DownOutlined />}
				</Button>
			);
		} else {
			return (
				<a onClick={e => e.preventDefault()}>
					{text} <DownOutlined />
				</a>
			);
		}
	};

	onVisibleChange = (flag: boolean) => {
		let { onVisibleChange } = this.getProps();
		if (!this.isPureComponent) {
			this.setProps({ visible: flag })
		}
		if (onVisibleChange) {
			onVisibleChange(flag, this.props);
		}
	};

	/**
	 * @description 获取组件模板
	 */
	getTemplate() {
		let {
			className,
			controlKey,
			show,
			type,
			dataSource,
			placement,
			showArrow,
			trigger,
			icon,
			disabled,
			onClick,
			text,
			style,
			overlay,
		} = this.getProps();

		if (!show) return null;
		className = className ? className + " hy-select-menu" : "hy-select-menu";
		className = controlKey ? className + " " + controlKey : className;

		let props = {
			className: this.getClassName().join(" "),
			style,
			placement,
			arrow: showArrow,
			trigger,
			disabled,
			onClick: (ev: any) => {
				if (onClick) {
					onClick({ ev, eventName: MouseEventType.onClick, value: text }, this.props)
				}
			},
			overlay,
			onVisibleChange: this.onVisibleChange.bind(this)
		}
		if (type === "link") {
			Object.assign(props, { icon })
		}
		useEffect(() => {
			const overlay = this.generateMenu.call(this, Utils.getTreeData(dataSource))
			this.setProps({ overlay })
		}, [])
		const Template = <Dropdown {...props}>{this.generateContainer()}</Dropdown>;
		return this.getFormItem(Template)
	}
}

