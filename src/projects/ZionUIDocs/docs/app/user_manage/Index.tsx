import { Service } from "./service"
import { PropertyService } from "zion-ui"
import config from "./property/table.json"

export const Demo = function () {
	return PropertyService.getReactElementFromJSON(config, Service)
}

export const code = ``