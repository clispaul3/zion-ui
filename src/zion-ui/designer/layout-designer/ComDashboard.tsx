/**
 * @description 组件列表
 */
import React from "react"
import { Collapse } from "antd"
import * as AllIcons from "@ant-design/icons"
import { baseControls } from "../property/config"
import { eventTopic } from "./config"

const AllIconsList: any = []
Object.keys(AllIcons).forEach((key, index) => {
  const Icon = AllIcons[key];
  if (index <= 300 && index > 1) {
    AllIconsList.push([key, <Icon style={{ fontSize: "14px" }} />]);
  }
});

export const ComDashboard = function () {
  const onDragStart = function (ev, menuData) {
    ev.dataTransfer.setData(eventTopic.ComDashboard, JSON.stringify(menuData))
  }
  return <div style={{ height: "100%" }}>
    <Collapse defaultActiveKey={Object.keys(baseControls)} style={{ height: "100%", border: "0 none", backgroundColor: "#fff" }}>
      {Object.keys(baseControls).map((key, idx) => {
        return <Collapse.Panel header={baseControls[key]["label"] + `【${baseControls[key]["dataSource"].length}】`} key={key}>
          {baseControls[key]["dataSource"].map((item, index) => {
            return <span
              draggable={true} onDragStart={(ev) => onDragStart(ev, item)}
              style={{ color: "#1890ff", position: "relative", display: "inline-block", padding: "3px 0px 3px 8px", width: "120px", boxSizing: "border-box", margin: "5px", background: "rgba(44,144,255,.1)", cursor: "move" }}
              key={item.key}>
              {AllIconsList[idx * baseControls[key]["dataSource"].length + index][1]}&nbsp;&nbsp;
            <span style={{ position: "absolute" }}>{item.label}</span>
            </span>
          })}
        </Collapse.Panel>
      })}
    </Collapse>
  </div>
}