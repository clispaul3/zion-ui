import { IBaseFormModel } from "./Base";

export interface IProps extends IBaseFormModel {
	value?: string                          // 色值
}

export const defaultClassName = "zion-ui-color-picker"