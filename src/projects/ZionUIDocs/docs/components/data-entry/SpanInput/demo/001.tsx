import React from 'react';
import { SpanInput } from "zion-ui"

export const Demo = function () {
	const Tpl = SpanInput({
		style: { width: "200px" },
		value: "这一段文字可编辑"
	}, true)
	return <div>
		<Tpl />
		<SpanInput style={{ width: "200px" }} value="这是一个链接" href="https://www.baidu.com" />
		<SpanInput style={{ width: "200px" }} value="默认展示编辑图标" showEdit={true} />
		<SpanInput style={{ width: "200px" }} showInput={true} value="默认展示文本框" />
	</div>
}

export const code = `
import React from 'react';
import { SpanInput } from "zion-ui"

export const Demo = function () {
  const Tpl = SpanInput({
    style: { width: "200px" },
    value: "这一段文字可编辑"
  }, true)
  return <div>
    <Tpl />
    <SpanInput style={{ width: "200px" }} value="这是一个链接" href="https://www.baidu.com" />
    <SpanInput style={{ width: "200px" }} value="默认展示编辑图标" showEdit={true} />
    <SpanInput style={{ width: "200px" }} showInput={true} value="默认展示文本框" />
  </div>
}
`
