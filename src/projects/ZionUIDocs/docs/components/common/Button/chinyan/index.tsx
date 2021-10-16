import React from "react"
import { Demo as Button01 } from "./001"
import { Demo as Button02 } from "./002"
import { buttonApi as ButtonApi } from "./api"

export const ButtonDemo = () => {
  const flexStyle = {
    display: "flex", justifyContent: "space-between", margin: "10px", alignItems: "flex-start"
  }
  const modelCard = {
    width: "48%", backgroundColor: "#FAFAFA", borderRadius: "5px", boxShadow: "5px 5px 3px #888888", padding: "10px"
  }
  return (
    <div>
      <div style={flexStyle}>
        <div style={modelCard}><Button01 /></div>
        <div style={modelCard}><Button02 /></div>
      </div>
      <ButtonApi />
    </div>
  )
}