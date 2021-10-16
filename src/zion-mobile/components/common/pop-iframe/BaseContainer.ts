import createHeader from "./createHeader"
/**
 * @description 嵌套iframe页面的容器
 */
class BaseContainer {
	uniqueStr: string
	iframeId
	container: any
	defaultContainer
	close
	containerUnMount
	containerMounted
	url
	childPageLoaded
	updateContainerStyle
	listenMessageFromChildPage

	constructor(config) {
		this.uniqueStr = "HY_IFRAME"
		this.validatorConfig(config)
		this.renderContainer()
	}
	// private  检验配置
	validatorConfig(config: any) {
		const {
			defaultContainer = {},
			customContainer, url,
			containerMounted, containerUnMount,
		} = config
		if (customContainer) {
			const { ele } = customContainer
			if (!ele) {
				throw new Error("ele未定义或未赋值")
			}
			if (!document.querySelector(ele)) {
				if (ele.indexOf("#") == 0 || ele.indexOf(".") == 0) {
					this.iframeId = ele.substr(1)
				}
			}
			this.container = ele
		} else {
			const {
				zoomOutBtn = false,
				closeBtn = false,
				title = ""
			} = defaultContainer
			this.defaultContainer = { title, zoomOutBtn, closeBtn }
			this.createDefaultContainer()
		}
		if (config.close) {
			this.close = config.close
		}
		this.containerUnMount = containerUnMount
		this.containerMounted = containerMounted
		this.url = url || "http://www.baidu.com"
		this.childPageLoaded = false
	}
	// private 创建iframe元素
	createTemplate() {
		this.iframeId = this.iframeId || this.uniqueStr + (Math.random() * 10000).toFixed(0)
		const size = this.defaultContainer ? "height:calc(100% - 40px);" : "height:100%"
		const template = `
            ${this.defaultContainer ? createHeader(this.defaultContainer) : ""}
            <section style="overflow:auto;position:relative;width:100%;${size}">
                <iframe src="${this.url}" id="${this.iframeId}" 
                    frameborder = 0  
                    width="100%"
                    height="100%">
                </iframe>
            </section>
        `
		return template
	}
	createDefaultContainer() {
		const defaultCon = document.createElement("div")
		const id = this.uniqueStr + (Math.random() * 10000).toFixed(0)
		this.container = "#" + id
		const style = `
            overflow:hidden;
            position:fixed;
            z-index:10000;
            top:50%;left:50%;
            background:#fff;
            transform:translate(-50%,-50%);
            width:90%;
            height:90%;
            border:1px solid #ccc;
        `
		defaultCon.setAttribute("id", id)
		defaultCon.setAttribute("style", style)
		document.body.appendChild(defaultCon)
	}
	// private 渲染iframe容器
	renderContainer() {
		const template = this.createTemplate()
		let container = document.querySelector(this.container)
		container.innerHTML = template
		container.style.display = "block";
		(document.getElementById(this.iframeId) as any).addEventListener("load", () => {
			this.iframeDidMount()
			this.childPageLoaded = true
		})
	}
	// iframe加载完成之后
	iframeDidMount() {
		this.bindBtnEvent()
		if (this.containerMounted) {
			this.containerMounted()
		}
	}
	// 关闭按钮绑定点击事件
	bindBtnEvent() {
		let container = document.querySelector(this.container)
		container.addEventListener("click", this.clickEventListener.bind(this))
	}
	clickEventListener(ev) {
		const classList = ev.target.classList
		window.event ? window.event.cancelBubble = true : ev.stopPropagation();
		if (classList.contains("iframe-close-btn")) {
			this.closeIframe()
		}
		if (classList.contains("iframe-zoomin-btn")) {
			this.zoomOutIn("in")
		}
		if (classList.contains("iframe-zoomout-btn")) {
			this.zoomOutIn("out")
		}
	}
	zoomOutIn(direction) {
		let container = document.querySelector(this.container)
		const zoominBnt: any = document.querySelector("svg.iframe-zoomin-btn")
		const zoomoutBnt: any = document.querySelector("svg.iframe-zoomout-btn")
		container.style.width = (direction == "out" ? "90%" : "50%")
		container.style.height = (direction == "out" ? "90%" : "50%")
		zoomoutBnt.style.display = (direction == "out" ? "none" : "block")
		zoominBnt.style.display = (direction == "out" ? "block" : "none")
	}
	// 关闭iframe容器
	closeIframe() {
		if (this.close) {
			this.close()
		}
		const iframeContainer = document.querySelector(this.container)
		if (this.containerUnMount) {
			this.containerUnMount()
		}
		if (this.container.indexOf(this.uniqueStr) >= 0) {
			iframeContainer.removeEventListener("click", this.clickEventListener)
			iframeContainer.parentNode.removeChild(iframeContainer)
		} else {
			iframeContainer.innerHTML = ""
			iframeContainer.style.display = "none"
		}
		this.destroy()
	}
	destroy() {
		this.container = null
		this.updateContainerStyle = null
		this.listenMessageFromChildPage = null
		this.url = null
		this.childPageLoaded = null
		this.defaultContainer = null
	}
}
export default BaseContainer
