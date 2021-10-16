import { ReactNode } from 'react';
import { IBaseFormModel } from './Base';

export interface IProps extends IBaseFormModel {
	value?: boolean                         // 是否选中
	checkedChildren?: string | ReactNode    // 选中时显示的内容
	unCheckedChildren?: string | ReactNode  // 非选中时显示的内容
}

export const defaultClassName = "zion-ui-switch"