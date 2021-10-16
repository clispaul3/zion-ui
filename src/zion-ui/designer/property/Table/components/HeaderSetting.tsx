/**
 * @description 表头设置
 */
import React from "react"
import { PopModal, Divider, Table, StateManage, PopTip, Utils, Input, Form, Switch, Tabs } from "../../../../"
import { RiErrorWarningLine, RiAddCircleLine, RiIndeterminateCircleLine } from "react-icons/ri"

export const HeaderSetting = ({ config, onOk }) => {
	if (!config) {
		config = {
			show: false,
			onlySearch: false,
			title: { span: 0, content: "" },
			searchInput: { span: 0, placeholder: "" },
			headerButton: { span: 0, button: [] },
			filterSetting: { span: 0 },
			customerColumns: { span: 0 },
			refreshButton: { span: 0 },
			fullscreenButton: { span: 0 }
		}
	}
	const popIconStyle: any = { position: "relative", top: "2px", left: "3px", color: "red" }
	const [formState, FormTpl] = Form({
		formConfig: {
			columns: 2
		},
		formItemConfig: [
			{
				field: "show",
				labelProps: {
					label: <PopTip content={<span>显示表头<RiErrorWarningLine style={popIconStyle} /></span>} title="值为否时，其他设置无效" />
				},
				controlProps: {
					type: Switch,
					props: {
						value: config.show,
						unCheckedChildren: "否",
						checkedChildren: "是",
						onChange: ({ value }) => {
							config.show = value
						}
					}
				}
			},
			{
				field: "onlySearch",
				labelProps: {
					label: <PopTip content={<span>只展示搜索框<RiErrorWarningLine style={popIconStyle} /></span>} title="值为是时，表头只展示搜索框" />
				},
				controlProps: {
					type: Switch,
					props: {
						value: config.onlySearch,
						unCheckedChildren: "否",
						checkedChildren: "是",
						onChange: ({ value }) => {
							config.onlySearch = value
						}
					}
				}
			}
		]
	}, false)
	// 标题
	const [titleState, TitleTpl] = Form({
		formConfig: {
			columns: 1
		},
		formItemConfig: [
			{
				field: "title.content",
				labelProps: {
					label: "标题",
				},
				controlProps: {
					type: Input,
					props: {
						placeholder: "输入表格标题",
						value: config.title.content,
						onChange: ({ value }) => {
							config.title.content = value
						}
					}
				}
			},
			{
				field: "title.span",
				labelProps: {
					label: "栅格占比",
					help: "最大值24，最小值0"
				},
				controlProps: {
					type: Input,
					props: {
						type: "number",
						max: 24,
						min: 0,
						style: { width: "100%" },
						value: config.title.span,
						onChange: ({ value }) => {
							config.title.span = value
						}
					}
				}
			}
		]
	}, false)
	// 搜索框
	const [searchState, SearchTpl] = Form({
		formConfig: {
			columns: 1
		},
		formItemConfig: [
			{
				field: "searchInput.placeholder",
				labelProps: {
					label: "输入框提示文字",
				},
				controlProps: {
					type: Input,
					props: {
						placeholder: "输入提示文字",
						value: config.searchInput.placeholder,
						onChange: ({ value }) => {
							config.searchInput.placeholder = value
						}
					}
				}
			},
			{
				field: "searchInput.span",
				labelProps: {
					label: "栅格占比",
					help: "最大值24，最小值0"
				},
				controlProps: {
					type: Input,
					props: {
						type: "number",
						max: 24,
						min: 0,
						style: { width: "100%" },
						value: config.searchInput.span,
						onChange: ({ value }) => {
							config.searchInput.span = value
						}
					}
				}
			}
		]
	}, false)
	// 其他操作
	const [otherState, OtherTpl] = Form({
		formConfig: {
			columns: 2
		},
		formItemConfig: [
			{
				field: "filterSetting",
				labelProps: {
					label: "过滤",
					tip: "栅格占比为1"
				},
				controlProps: {
					type: Switch,
					props: {
						unCheckedChildren: "否",
						checkedChildren: "是",
						value: config.filterSetting.span ? true : false,
						onChange: ({ value }) => {
							config.filterSetting.span = value ? 1 : 0
						}
					}
				}
			},
			{
				field: "customerColumns",
				labelProps: {
					label: "自定义展示列",
					tip: "栅格占比为1"
				},
				controlProps: {
					type: Switch,
					props: {
						unCheckedChildren: "否",
						checkedChildren: "是",
						value: config.customerColumns.span ? true : false,
						onChange: ({ value }) => {
							config.customerColumns.span = value ? 1 : 0
						}
					}
				}
			},
			{
				field: "refreshButton",
				labelProps: {
					label: "刷新",
					tip: "栅格占比为1"
				},
				controlProps: {
					type: Switch,
					props: {
						unCheckedChildren: "否",
						checkedChildren: "是",
						value: config.refreshButton.span ? true : false,
						onChange: ({ value }) => {
							config.refreshButton.span = value ? 1 : 0
						}
					}
				}
			},
			{
				field: "fullscreenButton",
				labelProps: {
					label: "全屏",
					tip: "栅格占比为1"
				},
				controlProps: {
					type: Switch,
					props: {
						unCheckedChildren: "否",
						checkedChildren: "是",
						value: config.fullscreenButton.span ? true : false,
						onChange: ({ value }) => {
							config.fullscreenButton.span = value ? 1 : 0
						}
					}
				}
			}
		]
	}, false)
	// 表头按钮
	const defaultButtonDataSource = [
		{ text: "新建", show: false, btnCode: "CREATE_BUTTON" },
		{ text: "导入", show: false, btnCode: "IMPORT_BUTTON" },
		{ text: "导出", show: false, btnCode: "EXPORT_BUTTON" },
		{ text: "批量删除", show: false, btnCode: "HEADER_DELETE_BUTTON" }
	]
	if (config.headerButton.button.length <= 0) {
		config.headerButton.button = defaultButtonDataSource
	}
	const createNewBtn = () => {
		return {
			$$rowKey: Utils.uuid(),
			text: "自定义按钮",
			show: true
		}
	}
	const updateRecordAttr = ({ record, key, value }) => {
		const dataSource = StateManage.get(headerBtnState, "dataSource")
		dataSource.forEach(item => {
			if (item["$$rowKey"] === record["$$rowKey"]) {
				item[key] = value
			}
		})
		StateManage.set(headerBtnState, { dataSource })
	}
	const [headerBtnState, HeaderBtnTpl] = Table({
		bordered: false,
		dataSource: config.headerButton.button.map((item: any) => {
			return {
				...item,
				$$rowKey: Utils.uuid()
			}
		}),
		columns: [
			{
				title: "按钮文字",
				dataIndex: "text", render: (text, record) => {
					return <Input
						value={text}
						style={{ width: "80%" }}
						onBlur={({ value }) => {
							updateRecordAttr({ record, key: "text", value })
						}}
					/>
				}
			},
			{
				title: "是否显示",
				dataIndex: "show",
				width: "100px",
				render: (text, record) => {
					return <Switch
						value={text}
						checkedChildren="是"
						unCheckedChildren="否"
						onChange={({ value }) => {
							updateRecordAttr({ record, key: "show", value })
						}}
					/>
				}
			},
			{
				title: "按钮事件",
				dataIndex: "{{onClick}}",
				render: (text, record) => {
					if (record.btnCode === "HEADER_DELETE_BUTTON") return null
					return <Input
						value={text}
						placeholder="绑定函数"
						style={{ width: "80%" }}
						onClick={({ }, state) => {

						}}
					/>
				}
			}
		],
		buttonConfig: {
			width: "100px",
			rowButton: [
				{
					text: <RiAddCircleLine style={{ fontSize: "20px" }} />,
					onClick: ({ index }) => {
						const newItem = createNewBtn()
						const { dataSource } = StateManage.get(headerBtnState)
						dataSource.splice(index + 1, 0, newItem)
						StateManage.set(headerBtnState, { dataSource })
					}
				},
				{
					text: <RiIndeterminateCircleLine style={{ fontSize: "20px" }} />,
					isRender: (record: any) => !record.btnCode,
					onClick: ({ record }) => {
						const { dataSource } = StateManage.get(headerBtnState)
						StateManage.set(headerBtnState, { dataSource: dataSource.filter((data) => data["$$rowKey"] !== record["$$rowKey"]) })
					}
				}
			]
		}
	}, false)
	PopModal({
		title: "表头设置",
		allowFullScreen: false,
		width: "600px",
		top: "20px",
		height: "60%",
		content: <div>
			<FormTpl />
			<Divider />
			<Tabs>
				<Tabs.TabPane tab="表格标题" key="title">
					<TitleTpl />
				</Tabs.TabPane>
				<Tabs.TabPane tab="搜索框" key="searchInput">
					<SearchTpl />
				</Tabs.TabPane>
				<Tabs.TabPane tab="表头按钮" key="headerButton">
					<Input
						label="栅格占比"
						value={config.headerButton.span}
						validateResult={{ help: "最大值24，最小值0" }}
						onChange={({ value }) => {
							config.headerButton.span = value
						}}
					/>
					<HeaderBtnTpl />
				</Tabs.TabPane>
				<Tabs.TabPane tab="其他操作" key="other">
					<OtherTpl />
				</Tabs.TabPane>
			</Tabs>
		</div>,
		onOk: ({ }, modalState) => {
			const { dataSource } = StateManage.get(headerBtnState)
			config.headerButton.button = dataSource
			onOk && onOk({ config })
			StateManage.set(modalState, { visible: false })
		}
	})
}