import { MenuProps } from "zion-ui"
export const className = "zion-ui-docs-header"

export const navs = [
	{
		key: "framework",
		label: "架构设计"
	},
	{
		key: "components",
		label: "组件",
		isSubMenu: true,
		children: [
			{
				key: "components.common",
				label: "通用组件"
			},
			{
				key: "components.data-entry",
				label: "数据录入组件"
			},
			{
				key: "components.data-display",
				label: "数据展示组件"
			}
		]
	},
	{
		key: "service",
		label: "基础服务"
	},
	{
		key: "config",
		label: "配置"
	},
	{
		key: "examples",
		label: "案例"
	},
	{
		key: "helper",
		label: "帮助"
	},
	{
		key: "github",
		label: "GitHub"
	}
]

export const navConfig: MenuProps = {
	// dataSource: navs.filter(),
	layout: "horizontal",
	selectedKeys: ["components.common"],
	style: { textAlign: "center" }
}
