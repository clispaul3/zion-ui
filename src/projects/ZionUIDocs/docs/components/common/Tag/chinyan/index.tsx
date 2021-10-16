import React from "react"
import { Demo as Tag01 } from "./001"
import { tagApi as TagApi } from "./api"
import { Row, Col } from "zion-ui"

export const TagDemo = () => {
  const flexStyle = {
    display: "flex", justifyContent: "space-between", margin: "10px", alignItems: "flex-start"
  }
  const modelCard = {
    width: "100%", backgroundColor: "#FAFAFA", borderRadius: "5px", boxShadow: "5px 5px 3px #888888", padding: "10px"
  }
  return (
    <div>
      <div style={flexStyle}>
        <div style={modelCard}><Tag01 /></div>
      </div>
      <TagApi />
    </div>
  )

}