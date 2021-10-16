import React, { useEffect, useState } from "react"
import { Pagination } from "zion-ui"
import { List } from "antd"


export const Demo1 = () => {
  const [data, setData] = useState<Array<any>>()
  const [page, setPage] = useState(2)
  useEffect(() => {
    createData(1)
  }, [])
  const createData = (page) => {
    const newData: any = []
    for (let index = 0; index < 10; index++) {
      newData.push(`这是第${page}页第${index}条数据`)
      setData(newData)
    }
  }
  return <>
    <List
      header={<div>Header</div>}
      footer={<div>Footer</div>}
      bordered
      dataSource={data}
      renderItem={item => (
        <List.Item>
          {item}
        </List.Item>
      )}
    />
    <Pagination
      page={page}
      total={100}
      onChange={(params, state) => {
        createData(params.page)
        setPage(params.page)
      }}
    />
  </>
}

export const code1_1 = `
import React, { useEffect, useState } from "react"
import { Pagination } from "zion-ui"
import { List } from "antd"


export const Demo1 = () => {
  const [data, setData] = useState<Array<any>>()
  const [page, setPage] = useState(2)
  useEffect(() => {
    createData(1)
  }, [])
  const createData = (page) => {
    const newData: any = []
    for (let index = 0; index < 10; index++) {
      newData.push(这是第'page'页第'index'条数据)
      setData(newData)
    }
  }
  return <>
    <List
      header={<div>Header</div>}
      footer={<div>Footer</div>}
      bordered
      dataSource={data}
      renderItem={item => (
        <List.Item>
          {item}
        </List.Item>
      )}
    />
    <Pagination
      page={page}
      total={100}
      onChange={(params, state) => {
        createData(params.page)
        setPage(params.page)
      }}
    />
  </>
}
`