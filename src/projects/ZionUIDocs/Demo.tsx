import React, { useState, useEffect } from 'react';
import { Row, Col, Tree, Checkbox } from "antd";
import { Tree2, Button, StateManage } from "zion-ui";
import { DeleteColumnOutlined, EditOutlined } from "@ant-design/icons"
import { DeviceLocationTree } from "./device-location-tree"

export const Demo = function () {
	const [state, Tpl] = DeviceLocationTree({
		type: "top_0_1_2_3_4_5",
		selectType: "top_0_1_2_3_4_5",
		treeProps: {
			mode: { isAsync: true, isRadio: false }
		}
	})
	return <div style={{ padding: "20px" }}>
		<Tpl />
	</div>
}