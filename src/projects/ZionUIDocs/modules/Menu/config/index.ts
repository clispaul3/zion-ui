import { MenuProps, StateManage } from "zion-ui"
import { commontComs } from './commonComs'
import { dataEntryComs } from "./dataEntryComs"
import { dataDisplayComs } from "./dataDisplayComs"
import { Service } from "../Service"
import { appDemo } from "./appDemo"

const topLevelMenuKeys = ["common", "data-entry", "data-display", "App"]

export const config: MenuProps = {
  theme: "dark",
  layout: "inline",
  openKeys: ["common"],
  selectedKeys: ["Menu"],
  onClick: function ({ value }) {
    Service.toggleMenu({ key: value })
  },
  onOpenChange: function ({ openKeys }, state) {
    if (openKeys.length) {
      const latestKey = openKeys[openKeys.length - 1]
      if (topLevelMenuKeys.includes(latestKey) == false) return
      StateManage.set(state, { openKeys: [latestKey] })
    } else {
      StateManage.set(state, { openKeys: [] })
    }
  },
  dataSource: [
    {
      key: "framework",
      label: "架构文档",
      isSubMenu: true,
      children: [
        {
          key: "CoreIdea",
          label: "核心概念"
        },
        {
          key: "BaseModel",
          label: "基础模型"
        },
        {
          key: "BaseService",
          label: "基础服务"
        }
      ]
    },
    {
      key: "common",
      label: "通用组件" + `【${commontComs.length}】`,
      isSubMenu: true,
      children: commontComs
    },
    {
      key: "data-entry",
      label: "数据录入组件" + `【${dataEntryComs.length}】`,
      isSubMenu: true,
      children: dataEntryComs
    },
    {
      key: "data-display",
      label: "数据展示组件" + `【${dataDisplayComs.length}】`,
      isSubMenu: true,
      children: dataDisplayComs
    },
    {
      key: "App",
      label: "综合案例" + `【${appDemo.length}】`,
      isSubMenu: true,
      children: appDemo
    }
  ]
}