import React from "react"
// import { ApiData } from "../default";
export const Service = ({ apiData }) => {
  const Service = {
    controlKey: {
      Table: "ZionUIDocs.docs.compoents.Loading.table"
    },
    // 初始化api列表数据
    table_httpConfig: {
      init: () => {
        return new Promise((reslove, reject) => {
          let data = apiData
          reslove({
            data,
            total: data.length
          })
        })

      }
    },
    // 渲染说明内容
    renderInstructions: (text) => {
      return <div style={{
        width: "inherit",
        display: "block",
        whiteSpace: "normal"
      }}>{text}</div>
    },

    renderType: (text) => {
      return <div style={{
        color: "#c41d7f", width: "inherit",
        display: "block",
        whiteSpace: "normal"
      }}>{text}</div>
    }
  }
  return Service;
}