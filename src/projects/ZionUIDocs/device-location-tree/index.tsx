/**
 * @description 设备位置树
 */
import { Tree2, TreeProps } from "zion-ui"
import Service from "./Service"
interface IProps {
	checkedKeys?: string[]
	treeProps?: TreeProps
	type?: string,
	selectType?: string,
	filter?: (originData: object[]) => void,
	deviceMainType?: string[],
	deviceType?: string[],
	isHasStrategy?: boolean,
	strategyType?: "1" | "2",
	filterCondition?: any[]
}
export const DeviceLocationTree = function (props: IProps) {
	if (!props.treeProps) {
		props.treeProps = {}
	}
	const service = new Service(props)
	const { mode = {} } = props.treeProps
	const httpConfig = {
		init: service.httpInit.bind(service),
		expand: service.httpExpand.bind(service),
		search: service.httpSearch.bind(service),
		select: service.httpSelect.bind(service)
	}
	if (mode.isAsync === false) {
		httpConfig.init = service.httpGetAllData.bind(service)
	}
	const { checkedKeys = [] } = props
	const treeProps = {
		...props.treeProps,
		httpConfig,
		positionKey: checkedKeys.length > 0 ? checkedKeys[0] : "",
	}
	const [state, Template] = Tree2(treeProps, false)
	return [state, Template]
}
