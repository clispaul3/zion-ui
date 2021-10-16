/**
 * @description 选择图标
 */
import React, { CSSProperties, useState } from "react";
import { PopModal, StateManage } from "../../";
import * as PCIcons from "@ant-design/icons";

interface ISelectIcon {
	onOk?: ({ selectedIcon, allIcons }) => void;
	selectedIcon?: string;
}

export const SelectIcon = function ({ onOk, selectedIcon }: ISelectIcon) {
	let selectedIconRes = null;
	const Content = function () {
		const AllIconsList: any = [];
		const iconStyle: CSSProperties = {
			display: "inline-block",
			textAlign: "center",
			padding: "10px 10px",
			borderRadius: "3px",
			margin: "5px 5px",
			boxShadow: "0 1px 3px 0 rgba(0, 0, 0, .1), 0 1px 2px 0 rgba(0, 0, 0, .06)",
			border: "2px solid #fff",
			cursor: "pointer",
		};
		Object.keys(PCIcons).forEach((key, index) => {
			const Icon = PCIcons[key];
			if (index <= 300) {
				AllIconsList.push([key, <Icon style={{ fontSize: "18px" }} />]);
			}
		});
		const [activeIcon, setActiveIcon] = useState(
			selectedIcon || AllIconsList[0][0]
		);
		selectedIconRes = activeIcon;
		return (
			<div>
				{AllIconsList.map(([key, Icon], index) => {
					return (
						<span
							key={key}
							onClick={() => {
								setActiveIcon(key);
							}}
							style={{
								...iconStyle,
								border:
									activeIcon == key ? "2px solid #1890ff" : "2px solid #fff",
							}}
						>
							{Icon}
						</span>
					);
				})}
			</div>
		);
	};
	PopModal({
		title: "选择图标",
		top: "50px",
		height: "450px",
		width: "800px",
		allowFullScreen: false,
		content: <Content />,
		onConfirm: function ({ }, modalState) {
			onOk &&
				onOk({
					selectedIcon: selectedIconRes,
					allIcons: PCIcons,
				});
			StateManage.set(modalState, { visible: false });
		},
	});
};
