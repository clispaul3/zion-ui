/**
 * @description 动态资源加载
 */
export enum TagName { link = "link", script = "script" }
export interface IResource {
	tagName: TagName,
	url: string,
	isTheme?: boolean
}
class LoadResource {
	resourceCount: number
	hasLoaded: number
	constructor() {
		this.resourceCount = -1
		this.hasLoaded = 0
	}
	/**
	 * @description 加载资源
	 * @public
	 */
	public load(resource: IResource[]) {
		return new Promise((resolve, reject) => {
			if (resource instanceof Array) {
				this.resourceCount = resource.length
				this.hasLoaded = 0
				resource.forEach(item => {
					const { tagName, url, isTheme } = item
					if (tagName === TagName["script"]) {
						this._jsResource(url, resolve)
					}
					if (tagName === TagName["link"]) {
						this._styleResource(url, isTheme, resolve)
					}
				})
			} else {
				resolve(false)
			}
		})
	}
	/**
	 * @description 创建标签元素
	 * @private
	 */
	private _createElement({ tagName, attrMap, callback }) {
		let eleTag: string = ""
		if (tagName === TagName["link"]) {
			eleTag = "link"
		}
		if (tagName === TagName["script"]) {
			eleTag = "script"
		}
		const ele = document.createElement(eleTag)
		for (let key in attrMap) {
			ele.setAttribute(key, attrMap[key])
		}
		if (tagName === TagName["link"]) {
			const headEle = document.querySelector("head")
			if (headEle) {
				headEle.appendChild(ele)
			}
		}
		if (tagName === TagName["script"]) {
			document.body.appendChild(ele)
		}
		// 资源加载完成之后，触发回调函数
		ele.onload = () => {
			this._calculateResource(callback)
			ele.onload = null
		}
	}
	/**
	 * @description 加载js资源
	 * @private
	 */
	private _jsResource(resource: string, callback) {
		const isExist = document.getElementById(resource)
		const attrMap = {
			id: resource,
			src: resource,
			type: "text/javascript"
		}
		if (isExist) {
			this._calculateResource(callback)
			return
		}
		this._createElement({ tagName: TagName["script"], attrMap, callback })
	}
	/**
	 * @description 加载css资源
	 * @private
	 */
	private _styleResource(resource, isTheme, callback) {
		const themeLink = document.getElementById("theme_style")
		const attrMap = {
			id: isTheme ? "theme_style" : resource,
			href: resource + "?hash=" + this._randomHash(),
			rel: "stylesheet"
		}
		if (isTheme && themeLink) {
			themeLink.setAttribute("href", "./css/" + resource)
			this._calculateResource(callback)
		} else {
			const isExist = document.getElementById(resource)
			if (isExist) {
				this._calculateResource(callback)
				return
			}
			this._createElement({ tagName: TagName["link"], attrMap, callback })
		}
	}
	/**
	 * @description 统计资源是否全部加载完成
	 * @private
	 */
	private _calculateResource(callback) {
		this.hasLoaded = this.hasLoaded + 1
		if (this.hasLoaded === this.resourceCount) {
			callback(true)
		}
	}
	/**
	 * @description 生成随机hash
	 * @private
	 */
	private _randomHash() {
		return (Math.random() * 100000).toFixed(0)
	}
}

const instance = new LoadResource

export default instance


