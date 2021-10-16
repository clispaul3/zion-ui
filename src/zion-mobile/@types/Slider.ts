import { ReactNode } from 'react';
import { IBaseFormModel } from './Base';

export interface IProps extends IBaseFormModel {
	value?: number
	placement?: "vertical" | "inline"
	min?: number
	max?: number
	tooltip?: {
		visible?: boolean
		content?: (value) => ReactNode | string
		placement?: "top" | "left" | "right" | "bottom" | "topLeft" | "topRight" | "bottomLeft" | "bottomRight" | "leftTop" | "leftBottom" | "rightTop" | "rightBottom"
	}
}

export const defaultClassName = "zion-ui-slider"