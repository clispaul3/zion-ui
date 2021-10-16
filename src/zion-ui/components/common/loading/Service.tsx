/**
 * @description loading组件,可用于设置全局loading
 */
import React, { ReactNode } from "react";
import { observer } from "mobx-react";
import { Spin } from 'antd';
import { StateManage } from "../../../service/state";
import { PropertyService } from "../../../service/property";
import { IObservableObject } from 'mobx';
import ReactDOM from "react-dom";

export class Service {
	randomEleID: string
	private defaultClassName = "zion-ui-loading"
	hasRenderGlobalLoading: boolean = false

	globalStyle: any = {
		position: "fixed",
		zIndex: 10000,
		top: "0px", left: "0px",
		bottom: "0px", right: "0px",
		background: "rgba(238,238,238, .3)",
		lineHeight: document.body.clientHeight + "px"
	}
	globalLoadingProps: IObservableObject

	constructor() {
		this.randomEleID = this.createElement()
		this.globalLoadingProps = PropertyService.getObservableObj({ loading: true })
	}
	private createElement(): string {
		const ele = document.createElement("div")
		const randomId = this.defaultClassName + (Math.random() * 1000).toFixed(0)
		ele.id = randomId
		document.body.appendChild(ele)
		return randomId
	}
	private renderGlobalLoading() {
		const GlobalLoading = observer(() => {
			const { loading, icon } = StateManage.get(this.globalLoadingProps)
			this.globalStyle.lineHeight = document.body.clientHeight + "px"
			return <Spin
				indicator={icon}
				spinning={loading}
				style={this.globalStyle}
				size="large"
			/>
		})
		ReactDOM.render(<GlobalLoading />, document.getElementById(this.randomEleID))
	}

	setGlobalLoading(loading: boolean, options?: { icon: ReactNode }) {
		const { icon } = options || {}
		StateManage.set(this.globalLoadingProps, { loading, icon })
		if (this.hasRenderGlobalLoading) {
			return
		}
		this.renderGlobalLoading()
		this.hasRenderGlobalLoading = true
	}
}
