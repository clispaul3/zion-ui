/**
 * @description 表单组件
 */
import { IBaseModel } from "./Base";
import { ReactNode } from 'react';
import { IObservableObject } from "mobx";

export interface IProps extends IBaseModel {
  status?: "insert" | "update" | "detail"
  formConfig?: IFormConfig
  formItemConfig?: IFormItem[]
}

export interface IMobxState {
  setFormData?: (data: { [field: string]: IFormData }) => void
  getFormData?: () => { [field: string]: IFormData }
  resetForm?: () => { [field: string]: IFormData }    // 根据配置属性进行重置
  setFormControlProps?: (field: string, nextProps: object) => void
  setFormLabelProps?: (field: string, nextProps: ILabelProps) => void
}

export interface IFormConfig {
  layout?: "horizontal" | "vertical" | "inline"
  labelCol?: object
  wrapperCol?: object
  columns?: number
}

export interface IFormItem {
  rowCol?: number
  field: string
  order?: number
  labelProps: ILabelProps,
  show?: boolean
  controlProps: {
    type: (props: object, bool?: boolean) => [IObservableObject, ReactNode]
    props: any
  }
}

export interface ILabelProps {
  label?: string | ReactNode
  labelCol?: number
  required?: boolean
  validateStatus?: "" | "success" | "error"
  help?: string | ReactNode
  tail?: string | ReactNode
  tip?: string | ReactNode
}

export interface IFormData {
  value: string
  showValue: string
}

export interface IValidateResult {
  validateStatus?: "" | "success" | "error" | "validating",
  help?: string | ReactNode
}

export const defaultClassName = "zion-ui-form"

