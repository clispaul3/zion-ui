import { ReactNode } from 'react';
import { IBaseFormModel } from './Base';

export interface IProps extends IBaseFormModel {
	allowClear?: boolean                    // 是否允许再次点击后清除
	allowHalf?: boolean                     // 是否允许半选
	character?: ReactNode                   // 自定义字符
	count?: number                          // 数量
	value?: number                          // 分数
	color?: string                          // 填充颜色
	disabled?: boolean                      // 是否禁用
	tooltips?: string[]                     // 鼠标移入时的文字提示
	onHoverChange?: (value: number) => void // 鼠标hover时的回调
}

export const defaultClassName = "zion-ui-rate"