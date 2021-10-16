import React from "react"
import UIjson from "./property/UI.json"
import LifeCycleJson from "./property/LifeCycle.json"
import EventJson from "./property/Event.json"
import DataJson from "./property/Data.json"
import { BaseProperty } from "../Base/BaseProperty"
import { Service } from "./service"

export { defaultProps } from "./property/defaultProps"

export const RadioProperty = function ({ controlKey, property }) {
	return <BaseProperty
		controlKey={controlKey}
		Property={property}
		UIjson={UIjson as any}
		DataJson={DataJson as any}
		EventJson={EventJson as any}
		LifeCycleJson={LifeCycleJson as any}
		Service={Service}
	/>
}