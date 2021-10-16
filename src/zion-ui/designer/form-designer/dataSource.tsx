export const dataSource = [
	{
		key: "Input",
		label: "文本框",
		props: {
			style: { width: "100%" }
		}
	},
	{
		key: "Radio",
		label: "单选框",
		props: {
			dataSource: [
				{ key: "0", label: "选项1" },
				{ key: "1", label: "选项2" }
			]
		}
	},
	{
		key: "Checkbox",
		label: "复选框",
		props: {
			dataSource: [
				{ key: "0", label: "选项1" },
				{ key: "1", label: "选项2" }
			]
		}
	},
	{
		key: "Select",
		label: "下拉框",
		props: {
			dataSource: [
				{ key: "0", label: "选项1" },
				{ key: "1", label: "选项2" }
			]
		}
	},
	{
		key: "SelectMenu",
		label: "下拉菜单",
		props: {
			text: "选项1",
			dataSource: [
				{ key: "0", label: "选项1" },
				{ key: "1", label: "选项2" }
			]
		}
	},
	{
		key: "SelectCascade",
		label: "下拉级联",
		props: {
			dataSource: [
				{ key: "0", label: "选项1", uiPid: null },
				{ key: "1", label: "选项2", uiPid: null },
				{ key: "3", label: "选项11", uiPid: "0" },
				{ key: "4", label: "选项22", uiPid: "1" },
			]
		}
	},
	{
		key: "Rate",
		label: "评分",
		props: {
			count: 5,
			value: 4
		}
	},
	{
		key: "Switch",
		label: "开关",
		props: {
			value: true
		}
	},
	{
		key: "DateTime",
		label: "日期时间",
		props: {
			style: { width: "100%" }
		}
	},
	{
		key: "Slider",
		label: "进度条",
		props: {
			value: 60
		}
	},
	{
		key: "SpanInput",
		label: "可编辑文本",
		props: {
			value: "可编辑文本"
		}
	},
	{
		key: "ColorPicker",
		label: "拾色器",
		props: {
			value: "#000"
		}
	},
	{
		key: "FileUpload",
		label: "文件上传",
		props: {}
	},
	{
		key: "RichText",
		label: "富文本",
		props: {
			value: "富文本"
		}
	}
]
