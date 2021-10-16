import React from 'react';
import { Rate, Button, StateManage } from "zion-ui"
import { HeartFilled } from "@ant-design/icons"

export const Demo = function () {
	const controlKey = {
		"001": "Rate_Demo001.001",
		"002": "Rate_Demo001.002",
		"003": "Rate_Demo001.003",
	}
	const Tpl = Rate({
		controlKey: controlKey["001"],
		tooltips: ["提示", "一般", "严重", "紧急", "致命"],
		count: 5,
		value: 3
	}, true)
	return <div>
		<Button text="全场五颗星" size="small" type="primary" onClick={() => {
			StateManage.set(controlKey["001"], { value: 5 })
			StateManage.set(controlKey["002"], { value: 5 })
			StateManage.set(controlKey["003"], { value: 5 })
		}} />
    &nbsp;
    <Button text="全场差评" size="small" type="danger" onClick={() => {
			StateManage.set(controlKey["001"], { value: 0 })
			StateManage.set(controlKey["002"], { value: 0 })
			StateManage.set(controlKey["003"], { value: 0 })
		}} />
		<Tpl />
		<Rate controlKey={controlKey["002"]} color={"red"} count={8} value={3.5} allowHalf={true} allowClear={false}></Rate>
		<Rate controlKey={controlKey["003"]} color={"blue"} count={5} character={<HeartFilled />}></Rate>
	</div>
}

export const code = `
import React from 'react';
import { Rate, Button, StateManage } from "zion-ui"
import { HeartFilled } from "@ant-design/icons"

export const Demo = function () {
	const controlKey = {
		"001": "Rate_Demo001.001",
		"002": "Rate_Demo001.002",
		"003": "Rate_Demo001.003",
	}
	const Tpl = Rate({
		controlKey: controlKey["001"],
		tooltips: ["提示", "一般", "严重", "紧急", "致命"],
		count: 5,
		value: 3
	}, true)
	return <div>
		<Button text="全场五颗星" size="small" type="primary" onClick={() => {
			StateManage.set(controlKey["001"], { value: 5 })
			StateManage.set(controlKey["002"], { value: 5 })
			StateManage.set(controlKey["003"], { value: 5 })
		}} />
    &nbsp;
    <Button text="全场差评" size="small" type="danger" onClick={() => {
			StateManage.set(controlKey["001"], { value: 0 })
			StateManage.set(controlKey["002"], { value: 0 })
			StateManage.set(controlKey["003"], { value: 0 })
		}} />
		<Tpl />
		<Rate controlKey={controlKey["002"]} color={"red"} count={8} value={3.5} allowHalf={true} allowClear={false}></Rate>
		<Rate controlKey={controlKey["003"]} color={"blue"} count={5} character={<HeartFilled />}></Rate>
	</div>
}
`