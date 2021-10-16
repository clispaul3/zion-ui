import React from "react"
import UIjson from "./property/UI.json"
import LifeCycleJson from "./property/LifeCycle.json"
import EventJson from "./property/Event.json"
import { BaseProperty } from "../Base/BaseProperty"
import { Service } from "./service"

export { defaultProps } from "./property/defaultProps"

export const FormProperty = function ({ controlKey, property, FuncSetting }) {
	return <BaseProperty
		controlKey={controlKey}
		Property={property}
		UIjson={UIjson as any}
		EventJson={EventJson as any}
		LifeCycleJson={LifeCycleJson as any}
		Service={Service}
		FuncSetting={FuncSetting}
	/>
}