import React from 'react';
import { PopTip } from "zion-ui";

export const Demo = function () {
  const text = "这是一段很长很长很长很长很长很长很长很长很长很长很长很长很长很长的文字"
  const PopTipTest = PopTip({
    title: text,
    placement: "right",
    trigger: "click",
    content: <div style={{ width: "100px", textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }}>
      {text}
    </div>
  }, true)
  return <div>
    <PopTipTest />
    <br />
    <PopTip placement="top" title={text} content={<span style={{ color: "blue" }}>XXX系统</span>} />
  </div>
}

export const code = `
import React from 'react';
import { PopTip } from "zion-ui";

export const Demo = function () {
	const text = "这是一段很长很长很长很长很长很长很长很长很长很长很长很长很长很长的文字"
	const PopTipTest = PopTip({    //写法一
		title: text,
		placement: "right",
		content: <div style={{ width: "100px", textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }}>
			{text}
		</div>
	}, true)
	return <div>
		<PopTipTest />
		<br />
		<PopTip placement="top" title={text} content={<span style={{ color: "blue" }}>XXX系统</span>} />   //写法2
	</div>
}
`

