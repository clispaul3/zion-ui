/**
 * @description 代理配置
 * @param targetIp 在 ../devConfig.js 配置
 */

module.exports = function (targetIp) {
	const defaultPort = 8088
	return {
		"/api": {
			target: targetIp + ":" + defaultPort,
			changeOrigin: true,
			pathRewrite: {
				"^/api": "/FlowHYS",
			},
		},
		"/dpApi": {
			target: targetIp + ":6088",
			changeOrigin: true,
			pathRewrite: { "/dpApi": "" },
		},
		"/file": {
			target: targetIp + ":" + defaultPort,
			changeOrigin: true,
			pathRewrite: { "/file": "" },
		},
		"/stomp1/websocket": {
			target: targetIp + ":" + defaultPort,
			ws: true,
			pathRewrite: {
				"^/stomp1/websocket": "/FlowHYS/stomp1/websocket",
			},
			changeOrigin: true,
		},
		"/videoApi": {
			target: "http://192.168.2.15:3000",
			changeOrigin: true,
			pathRewrite: {
				"/videoApi": "",
			},
		},
		"/iotmpCustomApi": {
			target: targetIp + ":9000",
			changeOrigin: true,
		},
		"/formAtt": {
			target: targetIp + ":9000",
			changeOrigin: true,
			pathRewrite: {
				"/formAtt": "/file/formAtt",
			},
		},
		"/authorityApiV2/*": {
			target: targetIp + ":8988",
			pathRewrite: { "^/authorityApiV2": "" },
			changeOrigin: true,
		},
		"/FrontEndLogger": {
			target: targetIp + ":8899",
			pathRewrite: { "^/FrontEndLogger": "" },
			changeOrigin: true,
		},
		"/Schedule/api": {
			target: "http://192.168.2.103:20067",
			pathRewrite: { "^/Schedule/api": "/api" },
			changeOrigin: true,
		},
		"/PrinterApi": {
			target: "http://10.7.1.104:20221/",
			pathRewrite: { "^/PrinterApi": "/PrinterApi" },
			changeOrigin: true,
		},
		"/sharpeyesApi": {
			target: "http://192.168.14.178:9003",
			pathRewrite: { "^/sharpeyesApi": "/sharpeyesApi" },
			changeOrigin: true,
		},
		"/wangeditor": {
			target: targetIp + ":8088",
			pathRewrite: { "^/wangeditor": "/FlowHYS/wangeditor" },
			changeOrigin: true,
		},
		"/uwb/Statistics/": {
			target: targetIp + ":1973",
			pathRewrite: { "^/uwb/Statistics": "/Statistics" },
			changeOrigin: true,
		},
		"/uwb/Policy/": {
			target: targetIp + ":" + 9000,
			pathRewrite: { "^/uwb/Policy": "/uwb/Policy" },
			changeOrigin: true,
		},
	};
}
