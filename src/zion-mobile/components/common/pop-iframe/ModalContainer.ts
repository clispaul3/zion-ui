import BaseContainer from "./BaseContainer"
import createHeader from "./createHeader"

/**
 * @description 模态框容器
 */
class ModalContainer extends BaseContainer {
	width

	constructor(config) {
		super(config)
	}
	validatorConfig(config: any) {
		const { url, defaultContainer, containerMounted, close } = config
		this.url = url || "http://www.baidu.com"
		this.iframeId = this.iframeId || this.uniqueStr + (Math.random() * 10000).toFixed(0)
		this.container = "div." + this.iframeId
		if (defaultContainer) {
			this.defaultContainer = defaultContainer
		}
		if (containerMounted) {
			this.containerMounted = containerMounted
		}
		if (close) {
			this.close = config.close
		}
	}
	// private 创建iframe元素
	createTemplate(): any {
		const styleObj = `
            overflow:auto;position: fixed;
            top: 0;right: 0;bottom: 0;left: 0;
            z-index: 10000;
            background-color:rgba(0,0,0,.45);`
		const template = document.createElement("div")
		template.setAttribute("style", styleObj)
		template.setAttribute("class", this.iframeId)
		const width = new URLSearchParams(this.url).get("width")
		if (width) {
			if (width.includes("%")) {
				this.width = width
			} else {
				this.width = width + "px"
			}
		} else {
			this.width = this._calculateSize(0.96)["width"]
		}
		const modalContentStyle = `overflow:hidden;position:absolute;z-index:10000;top:50%;left:50%;background:#fff;transform:translate(-50%,-50%);width:${this.width};height:96%;border:1px solid #ccc;`
		template.innerHTML = `
			<section style=${modalContentStyle} class="${this.iframeId}">
				${this.defaultContainer ? createHeader(this.defaultContainer) : ""}
				<iframe src="${this.url}"
					frameborder = 0  id=${this.iframeId}
					style="background-color:#FFF;width:100%;height:calc(100% - 40px);">
				</iframe>
			</section>`
		return template
	}
	// private 渲染iframe容器
	renderContainer() {
		const template = this.createTemplate()
		document.body.appendChild(template)
		const selector = "iframe#" + this.iframeId
		template.querySelector(selector).addEventListener("load", () => {
			this.iframeDidMount()
			this.childPageLoaded = true
		})
	}
	// 放大缩小
	zoomOutIn(direction) {
		let container: any = document.querySelector("section." + this.iframeId)
		const zoominBnt: any = document.querySelector("svg.iframe-zoomin-btn")
		const zoomoutBnt: any = document.querySelector("svg.iframe-zoomout-btn")
		container.style.width = (direction == "out" ? this._calculateSize(0.9)["width"] : this.width)
		container.style.height = (direction == "out" ? this._calculateSize(0.9)["height"] : this._calculateSize(0.8)["height"])
		zoomoutBnt.style.display = (direction == "out" ? "none" : "block")
		zoominBnt.style.display = (direction == "out" ? "block" : "none")
	}

	// 计算高度与高度
	_calculateSize(scale = 0.8) {
		return {
			width: scale * 100 + "%",
			height: scale * 100 + "%"
		}
	}
}

export default ModalContainer
