import React from "react"
import { Pagination } from "zion-ui"

export const Demo3 = () => {
  const [state, Tpl] = Pagination({
    page: 1,
    total: 50
  }, false)
  const Template = Pagination({
    page: 1,
    total: 50
  }, true)
  return <div>
    <Pagination
      page={1}
      total={50}
    />
    <Tpl />
    <Template />
  </div>
}