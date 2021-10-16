import React, { useEffect } from "react";
import { IDataSourceItem, defaultClassName, defaultPlaceholder, defaultNotFoundContent } from "../../../@types/SelectCascade";
import { Cascader } from "antd";
import { BaseService } from "../../base";
import { Utils } from "../../../utils";
import { EventHandlerParams, MouseEventType } from "../../../@types/Base";
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
   * @description loadData
   */
  loadData(selectedOptions: any) {
    const targetOption = selectedOptions[selectedOptions.length - 1];
    const { onExpand, httpConfig = {}, dataSource } = this.getProps()
    onExpand && onExpand({ ev: null, eventName: MouseEventType.onExpand, data: targetOption }, this.props)
    if (httpConfig && httpConfig.onExpand) {
      targetOption.loading = true;
      httpConfig.onExpand(targetOption).then((res: IDataSourceItem[]) => {
        const nextDataSource = dataSource.concat(res)
        this.setProps({ dataSource: nextDataSource })
        targetOption.loading = false
      })
    }
  }
  /**
   * @description onFocus
   */
  onFocus() {
    const { httpConfig = {}, dataSource = [] } = this.getProps()
    if (dataSource && dataSource.length > 0) return
    if (httpConfig && httpConfig.init) {
      httpConfig.init().then((dataSource: IDataSourceItem[]) => {
        this.setProps({ dataSource })
      })
    }
  }
  /**
   * @description onChange
   */
  onChange(value: any, selectedOptions: any) {
    const { onChange } = this.getProps()
    this.setProps({ value: value, showValue: selectedOptions.map((item: { key: string, label: string }) => item["label"]) })
    onChange && onChange({ ev: null, eventName: MouseEventType.onChange, value }, this.props)
  }

  /**
   * @description setValue
   */
  setValue(value: string[] | [], dataSource: IDataSourceItem[]) {
    const { httpConfig = {} } = this.getProps()
    if (value.length > 0 && !httpConfig.onExpand) {
      const currentValue = value[value.length - 1]
      const parents = Utils.getParents(currentValue, dataSource)
      parents.push(currentValue)
      this.setProps({ value: parents })
    }
  }
  /**
   * @description onSearch
   */
  onSearch(value: string, path) {
    return path.some(option => option.label.toLowerCase().indexOf(value.toLowerCase()) > -1);
  }

  /**
   * @description 递归查找上级
   */
  getParents(value: string[] | [], dataSource: IDataSourceItem[]) {
    const { httpConfig } = this.getProps()
    if (value.length > 0 && !httpConfig.onExpand && dataSource.length) {
      const currentValue = value[value.length - 1]
      const parents = Utils.getParents(currentValue, dataSource)
      parents.push(currentValue)
      return parents
    }
    return value
  }

  /**
   * @description 获取组件模板
   */
  getTemplate() {
    let {
      show,
      dataSource,
      trigger,
      disabled,
      placeholder,
      changeOnSelect,
      allowSearch,
      allowClear,
      style = {},
      value,
      showValue,
      httpConfig = {},
    } = this.getProps();
    if (!show) return null;

    useEffect(() => {
      if (dataSource && dataSource.length > 0 && value && value.length > 0 && !httpConfig.onExpand) {
        this.setValue(value, dataSource)
      }
      if (httpConfig && httpConfig.init) {
        httpConfig.init().then((dataSource: IDataSourceItem[]) => {
          this.setProps({ dataSource })
          this.setValue(value, dataSource)
        })
      }
    }, [])
    value = this.getParents(value, dataSource)
    let props = {
      className: this.getClassName().join(" "),
      trigger,
      title: (showValue || value || "").toString().replace(/\,/ig, "/"),
      value: Array.isArray(value) ? value.filter((val: any) => val) : (value ? [value] : []),
      disabled,
      changeOnSelect,
      allowClear,
      style: { width: "100%", ...style },
      showSearch: allowSearch ? { filter: this.onSearch.bind(this) } : false,
      placeholder: placeholder || defaultPlaceholder,
      options: Utils.getTreeData(dataSource),
      loadData: this.loadData.bind(this),
      onFocus: this.onFocus.bind(this),
      notFoundContent: defaultNotFoundContent,
      onChange: this.onChange.bind(this)
    }
    const Template = <Cascader {...props} />;
    return this.getFormItem(Template);
  }
}

