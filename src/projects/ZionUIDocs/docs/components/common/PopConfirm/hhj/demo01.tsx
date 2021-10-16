import React from 'react';
import { PopConfirm, Tag } from "zion-ui"
import { WarningTwoTone, SyncOutlined } from "@ant-design/icons"

export const Demo = function () {
  const content = <button color="red" style={{ cursor: "pointer" }}>删除button</button>
  const DeleteConfirm = PopConfirm({
    title: "确认删除?",
    cancelText: "取消",
    trigger: "click",
    placement: "right",
    onCancel: function () { },
    onConfirm: function () { },
    icon: <WarningTwoTone style={{ color: "red" }} />,
    content
  }, true)
  return <>
    <DeleteConfirm />
    &nbsp;
    <PopConfirm title="二次确认是否删除?" content={content} icon={<SyncOutlined spin style={{ color: "red" }} />}></PopConfirm>
  </>
}
