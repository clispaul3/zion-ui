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
		label: "??????",
		dataSource: [
			{ key: "Button", label: "??????" },
			{ key: "Tag", label: "??????" },
			{ key: "Divider", label: "?????????" },
			{ key: "Title", label: "??????" },
			{ key: "Text", label: "??????" },
			{ key: "Link", label: "??????" },
			{ key: "Paragraph", label: "??????" },
			{ key: "Icon", label: "?????????" },
			{ key: "Image", label: "??????" },
			{ key: "Steps", label: "?????????" },
		]
	},
	dataEntry: {
		label: "????????????",
		dataSource: [
			{ key: "Input", label: "?????????" },
			{ key: "Radio", label: "?????????" },
			{ key: "Checkbox", label: "?????????" },
			{ key: "Select", label: "?????????" },
			{ key: "SelectMenu", label: "????????????" },
			{ key: "SelectCascade", label: "????????????" },
			{ key: "Rate", label: "??????" },
			{ key: "Switch", label: "??????" },
			{ key: "DateTime", label: "????????????" },
			{ key: "Slider", label: "?????????" },
			{ key: "SpanInput", label: "???????????????" },
			{ key: "ColorPicker", label: "?????????" },
			{ key: "FileUpload", label: "????????????" },
			{ key: "RichText", label: "?????????" }
		]
	},
	dataDisplay: {
		label: "????????????",
		dataSource: [
			{ key: "Menu", label: "??????" },
			{ key: "Table", label: "??????" },
			{ key: "EditTable", label: "????????????" },
			{ key: "List", label: "??????" },
			{ key: "Tree", label: "???" },
			{ key: "DetailForm", label: "????????????" },
			{ key: "StatisticTable", label: "????????????" },
			{ key: "Chart", label: "??????" },
			{ key: "Carousel", label: "?????????" }
		]
	},
	layout: {
		label: "??????",
		dataSource: [
			{ key: "Block", label: "?????????" },
			{ key: "Tabs", label: "????????????" },
			{ key: "Grids", label: "????????????" },
			{ key: "Flex", label: "????????????" },
			{ key: "LeftRight", label: "????????????" },
			{ key: "Collapse", label: "????????????" },
			{ key: "QueryForm", label: "????????????" },
			{ key: "Form", label: "????????????" }
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
