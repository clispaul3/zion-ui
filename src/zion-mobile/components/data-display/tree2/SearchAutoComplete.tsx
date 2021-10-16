import React, { useEffect } from "react"
import { Select, Empty } from "antd"
import { StateManage } from "../../../service/state"
import Lodash from "lodash"
import { observer } from "mobx-react"
import { QuestionCircleFilled } from "@ant-design/icons"
import { PopTip } from "../../common/pop-tip"
import $ from "jquery"

const { Option } = Select

const SearchAutoComplete = observer(({ mobx, treeId, mode, showDataSourceByTree }) => {
	const { onSearch, dataSource = [], onSelect, loading, open } = StateManage.get(mobx)
	const eleId = "select-" + treeId.replace(/\./g, "-")
	const debounced = Lodash.debounce(onSearch, 300, {})
	useEffect(() => {
		$("#" + eleId).unbind("keydown").bind("keydown", function (e) {
			var theEvent = e || window.event;
			var code = theEvent.keyCode || theEvent.which || theEvent.charCode;
			if (code == 13) {
				const value = theEvent.target.value
				if (mode.isRadio === false && !!value) {
					showDataSourceByTree(value)
				}
			}
		});
	}, [dataSource])
	return <div style={{ position: "relative" }}>
		<Select
			id={eleId}
			loading={loading}
			style={{ width: mode?.isRadio === false ? "92%" : "100%", background: "#fff" }}
			showSearch
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
				StateManage.set(mobx, { open: false })
			}}
			labelInValue={true}
			onSelect={(current: any, option) => {
				onSelect({ key: current["key"], positionType: "checkedKey", dataref: option.dataref })
			}}
			notFoundContent={dataSource.length == 0 ? <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="暂无数据" /> : null}
			placeholder="输入关键字">
			{dataSource.map((item: any) => {
				return <Option key={item["key"]} value={item["key"]} dataref={item}>{item["label"]}</Option>
			})}
		</Select >
		{mode?.isRadio === false ? <PopTip content={<QuestionCircleFilled style={{ position: "absolute", right: "0px", top: "10px", color: "#ccc" }} />} title={<span>① 点击文字，上下级不联动<br />② 点击复选框，上下级联动</span>} /> : null}
	</div>
})


export default SearchAutoComplete