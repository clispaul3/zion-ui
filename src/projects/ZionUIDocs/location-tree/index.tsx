/**
 * @description 位置树
 * @author zhangyangbin
 * 业务说明：0->建筑物分组 1->建筑物 2->楼层 3->区域 4->点位
 * ① 建筑物分组下可以挂建筑物或建筑物分组
 * ② 建筑物可以挂在分组下，也可以不挂
 * ③ 楼层只能挂在建筑物下
 * ④ 区域可以挂在建筑物下或楼层下
 * ⑤ 点位只能挂在区域下
 */
import { Tree, TreeProps } from "zion-ui"
import Service from "./Service"

interface IProps {
	treeProps: TreeProps
	checkedKeys?: string[]
	requestParams?: {
		/** 与 showTableData接口 保持一致 */
		filterCondition?: object[]
		/** 与 showTableData接口 保持一致 */
		orderBy?: object[]
		/** 需要过滤的位置id */
		filterNodeId?: string[]
		/** 为true时，查询建筑物分组和建筑物信息（过滤pid为null的建筑物信息） */
		buildGroup?: boolean
		/** 二次过滤函数 */
		filter?: (originData: object[], action: string) => object[]
	}
	/** 指定什么类型的节点可以选择，如：3_4 表示区域和点位可以被选择(树节点前有单选框或复选框) */
	selectType?: string
	/** 指定展示什么类型的节点, 如:0_1 表示只展示建筑物分组和建筑物 */
	type?: string
}

export const LocationTree = function (props: IProps) {
	const service = new Service(props)
	const { checkedKeys = [] } = props
	const httpConfig = {
		init: service.httpInit.bind(service),
		search: service.httSearch.bind(service),
		expand: service.httpExpand.bind(service),
		select: service.httpSelect.bind(service)
	}
	const [state, Template] = Tree({
		...props.treeProps,
		positionKey: checkedKeys.length > 0 ? checkedKeys[0] : "",
		httpConfig
	}, false)
	return [state, Template]
}
