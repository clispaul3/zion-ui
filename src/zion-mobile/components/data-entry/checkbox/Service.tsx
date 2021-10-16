import React, { CSSProperties, useEffect } from "react"
import { Checkbox } from 'antd'
import { EventHandlerParams, MouseEventType } from "../../../@types/Base"
import { defaultClassName, IDataSourceItem } from "../../../@types/Checkbox"
import { BaseService } from "../../base"
export class Service extends BaseService {
  verticalStyle: CSSProperties
  allItemKey: string = "$$ALL_ITEM$$"
  privateProperty: any
  constructor(props: Object, isPureComponent?: boolean) {
    super(props, isPureComponent)
    this.verticalStyle = {
      display: 'flex',
      height: '30px',
      lineHeight: '30px'
    }
    this.privateProperty = {
      allItemKey: this.allItemKey,
      allItem: { key: this.allItemKey, label: "全部" },
      checkedAll: false
    }
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
   * @description 修改复选框选中的keys
   * @param ev {checked: boolean, value: string}
   * @param item {key: string, value: string, disabled: boolean}
   */
  updateCheckedKeys(ev: { checked: boolean, value: string }, item: any) {
    const { checked, value } = ev
    const { dataSource, onChange, value: prevValue } = this.getProps()
    let keys = []
    if (value === this.privateProperty.allItemKey) {  // 全部选项
      if (checked) {
        keys = dataSource.filter((item: any) => !item.disabled && item.key !== this.allItemKey).map((item: any) => item.key)
      } else {
        keys = []
      }
    } else {  // 其他选项
      if (checked) {
        if (prevValue.includes(value) === false) {
          prevValue.push(value)
        }
        keys = prevValue
      } else {
        keys = prevValue.filter((item: any) => item !== value && item !== this.allItemKey)
      }
    }
    if (!this.isPureComponent) {
      this.setProps({ value: keys })
    }
    if (onChange && typeof onChange === "function") {
      onChange({ ev: null, eventName: MouseEventType.onChange, checked, current: item, value: keys }, this.props)
    }
  }
  /**
   * @description 渲染全部的半选状态
   * @param item {key: string, value: string, disabled: boolean}
   */
  renderIndeterminate(item: any) {
    if (item["key"] === this.privateProperty.allItemKey) {
      const { value } = this.getProps()
      if (!value || value.length == 0) return false
      return !this.privateProperty.checkedAll
    }
    return item["indeterminate"] || false
  }
  /**
   * @description 获取组件模板
   */
  getTemplate() {
    let {
      dataSource,
      value,
      show,
      showAll,
      disabled,
      style,
      placement,
      httpConfig = {}
    } = this.getProps()
    if (!show) return null
    const className = this.getClassName()
    if (showAll) {
      if (dataSource.length === value.length) {   // 全部选中
        value.unshift(this.privateProperty.allItemKey)
        this.privateProperty.checkedAll = true
      } else {
        this.privateProperty.checkedAll = false
      }
      dataSource.unshift(this.privateProperty.allItem)
    }
    useEffect(() => {
      if (httpConfig && httpConfig.init) {
        httpConfig.init().then((res: IDataSourceItem[]) => {
          this.setProps({ dataSource: res })
        })
      }
    }, [])
    const Template = <Checkbox.Group
      value={value}
      disabled={disabled}
      style={style}>
      {dataSource.map((item: any) => {
        return <Checkbox
          style={placement === "vertical" ? (item.key === this.allItemKey ? { ...this.verticalStyle, marginLeft: 8 } : this.verticalStyle) : {}}
          key={item.key}
          value={item.key}
          className={className.join(" ")}
          indeterminate={this.renderIndeterminate.call(this, item)}
          disabled={item.disabled}
          onChange={(ev) => {
            const params = { checked: ev.target.checked, value: ev.target.value }
            this.updateCheckedKeys(params, item)
          }}>
          {item.label}
        </Checkbox>
      })}
    </Checkbox.Group>
    return this.getFormItem(Template)
  }
}
