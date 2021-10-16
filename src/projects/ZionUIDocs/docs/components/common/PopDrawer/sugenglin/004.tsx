import React from 'react';
import { PopDrawer, Button, StateManage } from "zion-ui"

export const Demo = function () {
  const DefaultFooter = Button({
    text: "默认footer",
    type: "primary",
    style: { margin: "0px 5px" },
    onClick: function () {
      PopDrawer({
      })
    }
  }, true)
  const ShowOkBtn = Button({
    text: "展示确定按钮",
    type: "primary",
    style: { margin: "0px 5px" },
    onClick: function () {
      PopDrawer({
        onConfirm: (params, state) => {
          StateManage.set(state, { visible: false })
        }
      })
    }
  }, true)
  const CustomerFooter = Button({
    text: "自定义Footer",
    type: "primary",
    style: { margin: "0px 5px" },
    onClick: function () {
      PopDrawer({
        footer: <div>
          <DefaultFooter />
          <ShowOkBtn />
          <CustomerFooter />
        </div>
      })
    }
  }, true)
  const NoFooterBtn = Button({
    text: "不展示底部",
    type: "primary",
    style: { margin: "0px 5px" },
    onClick: function () {
      PopDrawer({
        footer: null
      })
    }
  }, true)
  return <div style={{ marginBottom: "10px" }}>
    <DefaultFooter />
    <ShowOkBtn />
    <CustomerFooter />
    <NoFooterBtn />
  </div>
}

export const code4_1 = `
import React from 'react';
import { PopDrawer, Button, StateManage } from "zion-ui"

export const Demo = function () {
	const DefaultFooter = Button({
		text: "默认footer",
		type: "primary",
		style: { margin: "0px 5px" },
		onClick: function () {
			PopDrawer({
			})
		}
	}, true)
	return <div>
		<DefaultFooter />
	</div>
}
`
export const code4_2 = `
import React from 'react';
import { PopDrawer, Button, StateManage } from "zion-ui"

export const Demo = function () {
	const ShowOkBtn = Button({
		text: "展示确定按钮",
		type: "primary",
		style: { margin: "0px 5px" },
		onClick: function () {
			PopDrawer({
				onConfirm: (params, state) => {
					StateManage.set(state, { visible: false })
				}
			})
		}
	}, true)

	return <div>
		<ShowOkBtn />
	</div>
}
`
export const code4_3 = `
import React from 'react';
import { PopDrawer, Button, StateManage } from "zion-ui"

export const Demo = function () {
	const CustomerFooter = Button({
		text: "自定义Footer",
		type: "primary",
		style: { margin: "0px 5px" },
		onClick: function () {
			PopDrawer({
				footer: <div>
					<DefaultFooter />
					<ShowOkBtn />
					<CustomerFooter />
				</div>
			})
		}
	}, true)

	return <div>
		<CustomerFooter />
	</div>
}
`
export const code4_4 = `
import React from 'react';
import { PopDrawer, Button, StateManage } from "zion-ui"

export const Demo = function () {
	const NoFooterBtn = Button({
		text: "不展示底部",
		type: "primary",
		style: { margin: "0px 5px" },
		onClick: function () {
			PopDrawer({
				footer: null
			})
		}
	}, true)
	return <div>
		<NoFooterBtn />
	</div>
}
`