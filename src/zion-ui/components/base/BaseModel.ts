import { IBaseModel } from "../../@types/Base"
import { IObservableObject } from "mobx"

export abstract class BaseModel implements IBaseModel {
	controlKey?: string
	size?: "small" | "middle" | "large"
	className?: string
	show?: boolean
	observer?: (count: number, state: IObservableObject) => void
	style?: object
	didMount?: (state: IObservableObject) => void
	extraData?: object
	constructor(props: any) {
		this.controlKey = props.controlKey || null
		this.size = props.size || "middle"
		this.show = props.show === false ? false : true
		this.observer = props.observer || null
		this.className = props.className || ""
		this.style = props.style || null
		this.didMount = props.didMount || null
		this.extraData = props.extraData || null
	}
}
