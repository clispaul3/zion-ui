import { ButtonProperty, defaultProps as ButtonDefaultProps } from "./Button"
import { InputProperty, defaultProps as InputDefaultProps } from "./Input"
import { RadioProperty, defaultProps as RadioDefaultProps } from "./Radio"
import { CheckboxProperty, defaultProps as CheckboxDefaultProps } from "./Checkbox"
import { SelectProperty, defaultProps as SelectDefaultProps } from "./Select"
import { TableProperty, defaultProps as TableDefaultProps } from "./Table"
import { TagProperty, defaultProps as TagDefaultProps } from "./Tag"
import { DateTimeProperty, defaultProps as DateTimeDefaultProperty } from "./DateTime"
import { SliderProperty, defaultProps as SliderDefaultProperty } from "./Slider"
import { SelectCascadeProperty, defaultProps as SelectCascadeDefaultProperty } from "./SelectCascade"
import { SelectMenuProperty, defaultProps as SelectMenuDefaultProperty } from "./SelectMenu"
import { FormProperty, defaultProps as FormDefaultProperty } from "./Form"
import { QueryFormProperty, defaultProps as QueryFormDefaultProperty } from "./QueryForm"

export const DefaultPropsMap = {
	"Button": {
		component: ButtonProperty,
		props: ButtonDefaultProps
	},
	"Tag": {
		component: TagProperty,
		props: TagDefaultProps
	},
	"Input": {
		component: InputProperty,
		props: InputDefaultProps
	},
	"Radio": {
		component: RadioProperty,
		props: RadioDefaultProps
	},
	"Checkbox": {
		component: CheckboxProperty,
		props: CheckboxDefaultProps
	},
	"Select": {
		component: SelectProperty,
		props: SelectDefaultProps
	},
	"SelectCascade": {
		component: SelectCascadeProperty,
		props: SelectCascadeDefaultProperty
	},
	"SelectMenu": {
		component: SelectMenuProperty,
		props: SelectMenuDefaultProperty
	},
	"Slider": {
		component: SliderProperty,
		porps: SliderDefaultProperty
	},
	"DateTime": {
		component: DateTimeProperty,
		props: DateTimeDefaultProperty
	},
	"Table": {
		component: TableProperty,
		props: TableDefaultProps
	},
	"Form": {
		component: FormProperty,
		props: FormDefaultProperty
	},
	"QueryForm": {
		component: QueryFormProperty,
		props: QueryFormDefaultProperty
	}
}

export const baseControls = {
	common: {
		label: "通用",
		dataSource: [
			{ key: "Button", label: "按钮" },
			{ key: "Tag", label: "标签" },
			{ key: "Divider", label: "分割线" },
			{ key: "Title", label: "标题" },
			{ key: "Text", label: "文本" },
			{ key: "Link", label: "链接" },
			{ key: "Paragraph", label: "段落" },
			{ key: "Icon", label: "小图标" },
			{ key: "Image", label: "图片" },
			{ key: "Steps", label: "步骤条" },
		]
	},
	dataEntry: {
		label: "数据录入",
		dataSource: [
			{ key: "Input", label: "文本框" },
			{ key: "Radio", label: "单选框" },
			{ key: "Checkbox", label: "复选框" },
			{ key: "Select", label: "下拉框" },
			{ key: "SelectMenu", label: "下拉菜单" },
			{ key: "SelectCascade", label: "下拉级联" },
			{ key: "Rate", label: "评分" },
			{ key: "Switch", label: "开关" },
			{ key: "DateTime", label: "日期时间" },
			{ key: "Slider", label: "进度条" },
			{ key: "SpanInput", label: "可编辑文本" },
			{ key: "ColorPicker", label: "拾色器" },
			{ key: "FileUpload", label: "文件上传" },
			{ key: "RichText", label: "富文本" }
		]
	},
	dataDisplay: {
		label: "数据展示",
		dataSource: [
			{ key: "Menu", label: "菜单" },
			{ key: "Table", label: "表格" },
			{ key: "EditTable", label: "动态表格" },
			{ key: "List", label: "列表" },
			{ key: "Tree", label: "树" },
			{ key: "DetailForm", label: "对象表单" },
			{ key: "StatisticTable", label: "统计表格" },
			{ key: "Chart", label: "图表" },
			{ key: "Carousel", label: "轮播图" }
		]
	},
	layout: {
		label: "布局",
		dataSource: [
			{ key: "Block", label: "块布局" },
			{ key: "Tabs", label: "标签布局" },
			{ key: "Grids", label: "栅格布局" },
			{ key: "Flex", label: "弹性布局" },
			{ key: "LeftRight", label: "左右布局" },
			{ key: "Collapse", label: "折叠面板" },
			{ key: "QueryForm", label: "查询表单" },
			{ key: "Form", label: "普通表单" }
		]
	}
}

export const layoutAcceptConfig = {
	Form: {
		accept: [
			"Input", "Select", "Radio", "SelectMenu",
			"SelectCascade", "Checkbox", "DateTime",
			"Rate", "Switch", "ColorPicker", "SpanInput",
			"Slider", "RichText", "FileUpload"
		]
	}
}
