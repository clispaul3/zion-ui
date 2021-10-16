
import React from 'react';
import { ColorPicker } from "zion-ui"

export const Demo01 = function () {
  return <div>
    <ColorPicker value="red" onChange={(params,) => {
      console.log("params", params);
      console.log("mobxProps");
    }} />
  </div>
}
export const code01 = `
import React from 'react';
import { ColorPicker } from "zion-ui"

export const Demo01 = function () {
  return <div>
    <ColorPicker value="red" />
  </div>
}
`