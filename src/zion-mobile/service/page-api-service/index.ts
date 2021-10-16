import { IframeContainer } from "../iframe-container"
import { IframeCommunicate } from "../iframe-communicate/index"

const obj: any = {
	callback: null,
	container: null
}

interface IPageApiService {
	basePath?: string
	hostname?: string
	port?: number
}

interface IPageApiServiceRequest {
	// 会拼接在url上
	params?: object
	data?: {
		title?: string
		zoomOutBtn?: boolean
		// 会通过 postmessage 的方式传递
		[key: string]: any
	}
	// 窗口打开之后的事件回调
	callback?: () => void
}


export class PageApiService {
	absolutePath: string
	hostname: string
	port: number
	basePath: string

	constructor(props: IPageApiService) {
		this.absolutePath = ""
		this.hostname = ""
		this.port = 9000

		const { basePath, hostname, port } = props

		this.hostname = "http://" + (hostname || location.hostname).replace("http://", "")
		this.port = port || location.port as unknown as number
		this.basePath = basePath || "/"
	}

	/**
	 * @description 发起请求的方法
	 * @public
	 */
	request(config: IPageApiServiceRequest) {
		const { params, data = {}, callback } = config
		this.absolutePath = this.hostname + ":" + this.port + this.basePath + (params ? ("?" + this._createQueryString(params)) : "")
		const { title = "弹窗标题" } = data
		obj.callback = callback
		const listener = this._listener
		obj.container = new IframeContainer.ModalContainer({
			url: this.absolutePath,
			containerMounted: function () {
				IframeCommunicate.toChildPage("#" + this.iframeId, "PAGE_API_SERVICE", {
					...data, ...params
				})
				IframeCommunicate.addListener(listener)
			},
			containerUnMount: function () {
				IframeCommunicate.removeListener(listener)
			},
			defaultContainer: {
				title,
				closeBtn: true,
				zoomOutBtn: data.zoomOutBtn || false
			}
		})
	}

	/**
	 * @description 生成queryString参数
	 * @private
	 */
	_createQueryString(params = {}) {
		const search = new URLSearchParams()
		Object.keys(params).forEach(key => {
			search.append(key, params[key])
		})
		return search.toString()
	}

	/**
	 * @description 注册监听器
	 */
	_listener(ev) {
		if (ev.data && ev.data.source && ev.data.source.indexOf("react-devtools") >= 0) return
		console.log("PAGE_API_SERVICE: ", ev)
		if (typeof obj.callback === "function") {
			obj.callback(ev.data)
		}
		if (obj.container && obj.container.closeIframe) {
			obj.container.closeIframe()
		}
	}
}



