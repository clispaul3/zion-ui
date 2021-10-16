import { Select, Button, Empty, Spin } from 'antd'
import React from "react"
import { BaseService } from "../../base"
import {
	defaultClassName, IDataSourceItem, notFoundContent,
	defaultPlaceholder, selectAll, cancelAll
} from "../../../@types/Select"
import debounce from "lodash/debounce"
import { EventHandlerParams, MouseEventType, DebounceDelay } from "../../../@types/Base"

const { Option } = Select

export class Service extends BaseService {
	constructor(props: Object, isPureComponent?: boolean) {
		super(props, isPureComponent)
		this.onSearch = debounce(this.onSearch.bind(this), DebounceDelay)
		this.onClick = debounce(this.onClick.bind(this), DebounceDelay)
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
	 * @description onChange事件
	 */
	onChange(params: { value: any, option: any }) {
		const { value, option } = params
		this.setProps({ value })
		const { onChange } = this.getProps()
		onChange && onChange({ ev: null, value, data: option, eventName: MouseEventType.onChange }, this.props)
	}
	onClick(params: EventHandlerParams) {
		const { ev, eventName } = params as any
		const classList = ev?.target?.classList
		if (!classList) return
		if (classList.contains("ant-select-selection-overflow") || classList.contains("ant-select-selection-item-content")) {
			const { onClick, value } = this.getProps()
			onClick && onClick({ ev: typeof ev === "object" ? ev : null, eventName, value }, this.props)
		}
	}
	onFocus(params: EventHandlerParams) {
		const { ev, eventName } = params
		const { onFocus, value, httpConfig, dataSource = [] } = this.getProps()
		onFocus && onFocus({ ev: typeof ev === "object" ? ev : null, eventName, value }, this.props)
		const { init } = httpConfig || {}
		if (init && dataSource.length <= 0) {
			this.setProps({ loading: true })
			init({ ev: null, eventName: MouseEventType.init, value }, this.props).then((initDataSource: IDataSourceItem[]) => {
				this.setProps({ dataSource: initDataSource })
				this.setProps({ loading: false })
			})
		}
	}
	onBlur(params: EventHandlerParams) {
		const { ev, eventName } = params
		const { onBlur, value } = this.getProps()
		// this.sortDataSource()
		onBlur && onBlur({ ev: typeof ev === "object" ? ev : null, eventName, value }, this.props)
	}

	filter(value: any, option: any) {
		return option.datalabel.toLowerCase().includes(value.toLowerCase())
	}
	/**
	 * @description onFooter
	 */
	onFooter(type: string) {
		const { dataSource, onChange } = this.getProps()
		let value: string[] | [] = []
		if (type === selectAll) {
			value = dataSource.filter((data: IDataSourceItem) => !data["disabled"]).map((item: IDataSourceItem) => item["key"])
		}
		if (type === cancelAll) {
			value = []
		}
		this.setProps({ value })
		onChange && onChange({ ev: null, eventName: MouseEventType.onChange, value }, this.props)
	}

	/**
	 * @description onLoad
	 */
	onLoad(ev: React.MouseEvent<HTMLElement>) {
		ev && ev.stopPropagation && ev.stopPropagation()
		const { dataSource, httpConfig } = this.getProps()
		if (httpConfig.onLoad) {
			this.setProps({ loading: true })
			httpConfig.onLoad({
				ev: null,
				eventName: MouseEventType.onLoad,
				length: dataSource.length
			}, this.props).then((result: IDataSourceItem) => {
				this.setProps({ dataSource: dataSource.concat(result), loading: true })
			})
		}
	}

	/**
	 * @description 渲染全选，反选按钮
	 */
	rendeFooter(menu: any) {
		const { httpConfig = {}, mode } = this.getProps()
		return <div>
			{menu}
			{mode === "checkbox" ? <div style={{ textAlign: "center", paddingTop: "5px", paddingBottom: "3px", borderTop: "1px solid #eee" }}>
				<Button type="primary" size="small" onClick={() => this.onFooter(selectAll)}>
					全选
        </Button>
        &nbsp;&nbsp;
        <Button size="small" onClick={() => this.onFooter(cancelAll)}>
					反选
        </Button>
			</div> : null}
		</div>
	}

	/**
	 * @description onSearch
	 */
	onSearch(value: string) {
		const { httpConfig = {} } = this.getProps()
		if (httpConfig && httpConfig.onSearch) {
			this.setProps({ loading: true })
			const promise = httpConfig.onSearch({ ev: null, eventName: "onSearch", value }, this.props)
			if (promise && promise.then) {
				promise.then((dataSource: IDataSourceItem[]) => {
					this.setProps({ dataSource, loading: false })
				})
			}
		}
	}
	/**
	 * @description renderOption
	 */
	renderOption(): React.ReactElement | null {
		const { dataSource = [] } = this.getProps()
		return dataSource.map((data: IDataSourceItem) => {
			return <Option
				key={data.key}
				value={data.key}
				dataItem={data}
				datalabel={data.label}
				disabled={data.disabled}>
				{data.icon}{data.render ? data.render(data) : <span title={data.label}>{data.label}</span>}
			</Option>
		})
	}

	/**
	 * @description 渲染下拉提示
	 */
	renderTips() {
		const { loading } = this.getProps()
		if (loading) return <Spin size="small" />
		return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={notFoundContent} />
	}

	/**
	 * @description 将选中的数据排在最前面
	 */
	sortDataSource() {
		const { dataSource, value = [] } = this.getProps()
		if (!value || value.length <= 0) return
		const nextDataSource: IDataSourceItem[] = []
		dataSource.forEach((data: IDataSourceItem) => {
			if ((value || "").includes(data["key"])) {
				nextDataSource.push(data)
			}
		})
		dataSource.forEach((data: IDataSourceItem) => {
			if ((value || "").includes(data["key"]) == false) {
				nextDataSource.push(data)
			}
		})
		this.setProps({ dataSource: nextDataSource })
	}

	getTemplate() {
		let {
			disabled,
			mode,
			value = [],
			style = {},
			show,
			validate,
			autoFocus,
			showFooter,
			allowClear,
			placeholder = defaultPlaceholder,
			size,
			autoValidate,
			dataSource,
			maxTagCount,
			httpConfig = {}
		} = this.getProps()
		if (!show) return null
		const className = this.getClassName()
		const props: any = {
			className: className.join(" "),
			optionFilterProp: "label",
			disabled,
			allowClear,
			title: dataSource.filter(data => value.includes(data["key"])).map(data => data["label"]).toString(),
			filterOption: httpConfig?.onSearch ? false : this.filter.bind(this),
			showSearch: true,
			onSearch: this.onSearch,
			onFocus: (ev: React.MouseEvent<HTMLElement>) => this.onFocus({ ev, eventName: MouseEventType.onFocus }),
			onBlur: (ev: React.MouseEvent<HTMLElement>) => this.onBlur({ ev, eventName: MouseEventType.onBlur }),
			onClick: (ev: React.MouseEvent<HTMLElement>) => this.onClick({ ev, eventName: MouseEventType.onClick }),
			size,
			style: { width: "100%", ...style },
			placeholder: placeholder || defaultPlaceholder,
			autoFocus: (autoValidate || validate) || autoFocus, validate,
		}
		if (mode === "checkbox") {
			props.mode = "multiple"
			props.maxTagCount = maxTagCount
			if (!value.toString()) {
				value = []
			}
			if (showFooter && dataSource.length > 0) {
				props.dropdownRender = this.rendeFooter.bind(this)
			}
		}
		if (value && mode === "radio") {
			value = value.toString() || null
		}
		const TargetControl = <Select
			{...props}
			value={value}
			notFoundContent={this.renderTips.call(this)}
			onChange={(value, option) => this.onChange({ value, option })}
		>
			{this.renderOption.call(this)}
		</Select>
		return this.getFormItem(TargetControl)
	}
}
