import { IObservableObject } from "mobx";
import { ReactNode } from "react";

export interface IPropertyService {
	getControlProps: (Model: Function, props: object) => IObservableObject
	getObservableObj: (props: Object) => IObservableObject
	getReactElementFromJSON: (props: IJsonConfig, $params?: IParams) => ReactNode
}

export interface IParams {
	[key: string]: any
}

export interface IJsonConfig {
	type: string
	props: Object
	children?: Array<Object>
}
