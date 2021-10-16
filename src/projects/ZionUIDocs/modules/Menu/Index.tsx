import React, { useEffect } from "react"
import { Menu } from "zion-ui"
import { config } from "./config"
import { Service } from "./Service"

export const ModuleMenu = function () {
  useEffect(() => {
    // Service.toggleMenu({ key: "CoreIdea" })
    Service.toggleMenu({ key: "Menu" })
  }, [])
  const height = (document.body.clientHeight - 70) + "px"
  return <div style={{ width: "250px", background: "#000c17", height, maxHeight: height, overflow: "auto" }}>
    <Menu {...config} style={{ height }} />
  </div>
}