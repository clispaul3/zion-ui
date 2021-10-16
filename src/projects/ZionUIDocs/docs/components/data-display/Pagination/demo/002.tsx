import React, { useEffect, useState } from "react"
import { Pagination, Input, Button } from "zion-ui"
import { List } from "antd"


export const Demo2 = () => {
  const [data, setData] = useState<Array<any>>()
  const [page, setPage] = useState(2)
  const [pageSize, setPageSize] = useState(10)
  const [disabled, setDisabled] = useState(false)
  const [pagetotal, setPageTotal] = useState<any>(null)
  useEffect(() => {
    createData(page, pageSize)
  }, [])
  const createData = (page, pageSize) => {
    const newData: any = []
    for (let index = 0; index < pageSize; index++) {
      newData.push(`这是第${page}页第${index + 1}条数据`)
      setData(newData)
    }
  }
  return <>
    <div style={{ display: "flex", marginBottom: "10px" }}>
      <div style={{ marginRight: "20px" }}>
        改变每页数量: <Input type={"number"} onBlur={({ value }) => {
          setPageSize(value)
        }} />
      </div>
      <Button text={"禁用"} onClick={() => {
        setDisabled(!disabled)
      }} />
      <div style={{ marginLeft: "20px" }}>
        展示每页固定数量
        <Button text={"切换"} onClick={() => {
          setPageTotal(["20", "30", "40", "10"])
        }} />
      </div>
    </div>
    <List
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
      pageSize={pageSize}
      total={100}
      onChange={(params, state) => {
        createData(params.page, params.pageSize)
        setPage(params.page)
      }}
      disabled={disabled}
      pageSizeOptions={pagetotal}
      showSizeChanger={true}
      onShowSizeChange={(params, state) => {
        setPageSize(params.pageSize)
        createData(params.page, params.pageSize)
        setPage(params.page)
      }}
      showQuickJumper={true}
    />
  </>
}

export const code2_1 = `
import React, { useEffect, useState } from "react"
import { Pagination } from "zion-ui"
import { List } from "antd"


export const Demo1 = () => {
  const [data, setData] = useState<Array<any>>()
  const [page, setPage] = useState(2)
  const [pageSize, setPageSize] = useState(10)
  useEffect(() => {
    createData(page, pageSize)
  }, [])
  const createData = (page) => {
    const newData: any = []
    for (let index = 0; index < 10; index++) {
      newData.push(这是第'page'页第'index'条数据)
      setData(newData)
    }
  }
  return <>
    <div style={{ marginRight: "10px",marginBottom:"10px" }}>
        改变每页数量: <Input type={"number"} onBlur={({ value }) => {
          setPageSize(value)
        }} />
      </div>
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
      pageSize={pageSize}
      onChange={(params, state) => {
        createData(params.page)
        setPage(params.page)
      }}
    />
  </>
}
`
export const code2_2 = `
import React, { useEffect, useState } from "react"
import { Pagination } from "zion-ui"
import { List } from "antd"


export const Demo1 = () => {
  const [data, setData] = useState<Array<any>>()
  const [page, setPage] = useState(2)
  const [disabled, setDisabled] = useState(false)
  useEffect(() => {
    createData(page, pageSize)
  }, [])
  const createData = (page) => {
    const newData: any = []
    for (let index = 0; index < 10; index++) {
      newData.push(这是第'page'页第'index'条数据)
      setData(newData)
    }
  }
  return <>
      <Button text={"禁用"} onClick={() => {
        setDisabled(!disabled)
      }} />
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
      disabled={disabled}
      onChange={(params, state) => {
        createData(params.page)
        setPage(params.page)
      }}
    />
  </>
}
`
export const code2_3 = `
import React, { useEffect, useState } from "react"
import { Pagination } from "zion-ui"
import { List } from "antd"


export const Demo1 = () => {
  const [data, setData] = useState<Array<any>>()
  const [page, setPage] = useState(2)
  const [pagetotal, setPageTotal] = useState<any>(null)
  useEffect(() => {
    createData(page, pageSize)
  }, [])
  const createData = (page) => {
    const newData: any = []
    for (let index = 0; index < 10; index++) {
      newData.push(这是第'page'页第'index'条数据)
      setData(newData)
    }
  }
  return <>
      <Button text={"禁用"} onClick={() => {
        setDisabled(!disabled)
      }} />
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
      disabled={disabled}
      onChange={(params, state) => {
        createData(params.page)
        setPage(params.page)
      }}
      pageSizeOptions={pagetotal}
      showSizeChanger={true}
      onShowSizeChange={(params, state) => {
        setPageSize(params.pageSize)
        createData(params.page, params.pageSize)
        setPage(params.page)
      }}
    />
  </>
}
`
export const code2_4 = `
import React, { useEffect, useState } from "react"
import { Pagination } from "zion-ui"
import { List } from "antd"


export const Demo1 = () => {
  const [data, setData] = useState<Array<any>>()
  const [page, setPage] = useState(2)
  useEffect(() => {
    createData(page, pageSize)
  }, [])
  const createData = (page) => {
    const newData: any = []
    for (let index = 0; index < 10; index++) {
      newData.push(这是第'page'页第'index'条数据)
      setData(newData)
    }
  }
  return <>
      <Button text={"禁用"} onClick={() => {
        setDisabled(!disabled)
      }} />
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
      disabled={disabled}
      onChange={(params, state) => {
        createData(params.page)
        setPage(params.page)
      }}
      showQuickJumper={true}
    />
  </>
}
`