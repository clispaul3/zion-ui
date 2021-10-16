import { BaseService } from "../../Base/BaseService"
import { StateManage, PopMessage } from "../../../../"
import { RowButtonSetting } from '../components/RowButtonSetting'
import { ColumnsSetting } from "../components/ColumnsSetting"
import { HeaderSetting } from "../components/HeaderSetting"
import { ScrollSetting } from '../components/ScrollSetting'
import { FooterSetting } from '../components/FooterSetting'

export class Service extends BaseService {
	constructor({ controlKey, FuncSetting }) {
		super({ controlKey, FuncSetting })
	}
	// 获取表格的控件编码
	getControlKey = async () => {
		const { getFormData } = StateManage.get(this.controlKey + "@UI")
		const formData = await getFormData(false)
		const { controlKey: { value: controlKey } } = formData
		return controlKey
	}

	bordered_onChange = ({ value }) => {
		this.attr_change({ value, attr: "bordered" })
	}
	isShowPagination = ({ value }) => {
		this.attr_change({ value, attr: "pagination.show" })
	}
	paginationSize_onChange = ({ value }) => {
		this.attr_change({ value, attr: "pagination.size" })
	}
	rowSelection_onChange = ({ value }) => {
		if (value === "radio" || value === "checkbox") {
			this.attr_change({ value: true, attr: "rowSelection.show" })
			this.attr_change({ value, attr: "rowSelection.mode" })
		} else {
			this.attr_change({ value: false, attr: "rowSelection.show" })
		}
	}
	// 行按钮
	buttonConfig_onChange = ({ }, state) => {
		RowButtonSetting({
			onOk: ({ config }) => {
				this.attr_change({ attr: "buttonConfig", value: config })
				StateManage.set(state, { value: config, showValue: config.rowButton.toString() ? "已配置" : null })
			},
			config: StateManage.get(state, "value")
		})
	}
	// 表头
	header_onClick = ({ }, state) => {
		HeaderSetting({
			onOk: ({ config }) => {
				this.attr_change({ attr: "header", value: config })
				StateManage.set(state, { value: config, showValue: config ? "已配置" : null })
			},
			config: StateManage.get(state, "value")
		})
	}
	// 数据源初始化
	httpConfigInit_onClick = ({ }, state) => {

	}
	// 动态查询
	httpConfigOnSearch_onClick = ({ }, state) => {

	}
	// 数据删除
	httpConfigDelete_onClick = ({ }, state) => {

	}
	// 列配置
	columns_onClick = ({ }, state) => {
		ColumnsSetting({
			columns: StateManage.get(state, "value"),
			onOk: ({ columns: value }) => {
				this.attr_change({ attr: "columns", value })
				StateManage.set(state, {
					value: value,
					showValue: value.length ? "已配置" : "未配置"
				})
			}
		})
	}
	// 滚动条配置
	scroll_onClick = ({ }, state) => {
		ScrollSetting({
			config: StateManage.get(state, "value"),
			onOk: ({ config }) => {
				this.attr_change({ attr: "scroll", value: config })
				StateManage.set(state, {
					value: config,
					showValue: config ? "已配置" : "未配置"
				})
			}
		})
	}
	// 属性监听器
	observer_onClick = ({ }, state) => {
		PopMessage({ type: "info", text: "敬请期待..." })
	}
	// 行点击事件
	onClick_onClick = ({ }, state) => {
		PopMessage({ type: "info", text: "敬请期待..." })
	}
	// 底部栏
	footer_onClick = ({ }, state) => {
		FooterSetting({
			key: StateManage.get(state, "value.key"),
			label: StateManage.get(state, "value.label"),
			onOk: ({ key, label }) => {
				this.attr_change({ attr: "footer", value: { show: (key && label) ? true : false, key, label } })
				StateManage.set(state, {
					value: { show: key && label, key, label },
					showValue: key && label ? "已配置" : null
				})
			}
		})
	}
}
