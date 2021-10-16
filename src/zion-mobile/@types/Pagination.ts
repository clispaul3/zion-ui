import { IBaseModel } from "./Base";
import { ReactNode } from "react";
import { IObservableObject } from "mobx";

export interface IProps extends IBaseModel {
  page?: number
  pageSize?: number                                       // 每页条数
  disabled?: boolean                                      // 是否禁用
  pageSizeOptions?: string[]                              // 指定每页展示多少条数据
  showQuickJumper?: boolean                               // 是否支持快速跳转
  showSizeChanger?: boolean                                // 是否展示 pageSize 切换器，当 total 大于 50 时默认为 true
  total?: number                                          // 数据总数
  simple?: boolean                                        // 简易模式
  showTotal?: boolean | ((total: number, range: [number, number]) => ReactNode)    // 用于展示当前页数的条数
  onShowSizeChange?: (params: ({ page: number, pageSize: number }), state: IObservableObject) => void
  onChange?: (params: ({ page: number, pageSize: number }), state: IObservableObject) => void
}

export const defaultPageSizeOptions = ["10", "20", "50", "100", "200"]

export const defaultClassName = "zion-ui-pagination"

export const defaultPage = 1

export const defaultPageSize = 10
