import React, { useEffect } from "react"
import { Select, Empty } from "antd"
import { StateManage } from "../../../service/state"
import Lodash from "lodash"
import { observer } from "mobx-react"
import { QuestionCircleFilled } from "@ant-design/icons"
import { PopTip } from "../../common/pop-tip"
import $ from "jquery"

const { Option } = Select

const SearchAutoComplete = observer((props: any) => {
	const { onSearch, dataSource = [], onSelect, value, open } = StateManage.get(props.mobx)
	const { treeService } = props
	const { mode: { isRadio } } = treeService.props
	const { treeId, showDataSourceByTree } = treeService
	const debounced = Lodash.debounce(onSearch, 300, {})
	const eleId = "select-" + treeId
	useEffect(() => {
		$("#" + eleId).unbind("keydown").bind("keydown", function (e) {
			var theEvent = e || window.event;
			var code = theEvent.keyCode || theEvent.which || theEvent.charCode;
			if (code == 13) {
				showDataSourceByTree.call(treeService, theEvent.target.value)
			}
		});
	}, [value])
	return <div style={{ position: "relative" }}>
		<Select
			id={eleId}
			style={{ width: isRadio === false ? "92%" : "100%" }}
			showSearch
			value={value}
			defaultActiveFirstOption={false}
			showArrow={true}
			allowClear={true}
			filterOption={false}
			onSearch={debounced}
			open={open}
			onClick={(ev: any) => {
				const className = ev.target.className.toString()
				if (className.indexOf("ant-select-item-option-content") >= 0) return
				onSearch(ev.target.title)
			}}
			onBlur={() => {
				StateManage.set(props.mobx, { open: false })
			}}
			labelInValue={true}
			onSelect={(current, option) => {
				onSelect("", { key: current["key"], positionType: "checkedKey", dataref: option.dataref })
			}}
			notFoundContent={dataSource.length == 0 ? <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="暂无数据" /> : null}
			placeholder="输入关键字">
			{dataSource.map((item: any) => {
				return <Option key={item["key"]} value={item["key"]} dataref={item}>{item["label"]}</Option>
			})}
		</Select >
		{isRadio === false ? <PopTip content={<QuestionCircleFilled style={{ position: "absolute", right: "0px", top: "10px", color: "#ccc" }} />} title={<span>① 点击文字，上下级不联动<br />② 点击复选框，上下级联动</span>} /> : null}
	</div>
})


export default SearchAutoComplete