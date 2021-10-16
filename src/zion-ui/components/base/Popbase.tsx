/**
 * @description 基础弹窗
 */
export const Popbase = {
	/**
	 * @description 定位弹窗
	 */
  setPotion: function ({ ev, container }) {
    if (!ev) return
    const ele: any = container
    if (!ele) return
    ele.style.display = "block"
    const { clientWidth, clientHeight } = document.body
    let x = ev.clientX + 5
    let y = ev.clientY + 8
    const width = parseInt(ele.style.width)
    const height = parseInt(ele.style.height)
    if (clientWidth - x <= width) {
      x = clientWidth - width - 10
    }
    if (clientHeight - y <= height) {
      y = clientHeight - height - 10
    }
    if (ele) {
      ele.style.top = y + "px"
      ele.style.left = x + "px"
    }
  },
	/**
	 * @description 拖拽功能
	 */
  dragFunc(params: { dragbar, container, callback?}) {
    const { dragbar, container, callback } = params
    dragbar.onmousedown = function (e) {
      document.onmousemove = null;
      e = e || window.event;
      const pageX = e.pageX;
      const pageY = e.pageY;
      const boxX = pageX - container.offsetLeft;
      const boxY = pageY - container.offsetTop;
      document.onmousemove = function (e: any) {
        e = e || window.event;
        const pageX = e.pageX;
        const pageY = e.pageY;
        const left = pageX - boxX;
        const top = pageY - boxY;
        if (left <= 0 || top <= 0) return
        container.style.left = left + 'px';
        container.style.top = top + 'px';
        callback && callback({ left, top })
      }
    };
    document.onmouseup = function () {
      document.onmousemove = null;
    };
  },
	/**
	 * @description 获取元素的偏移量
	 */
  getOffset(element) {
    let totalLeft = null, totalTop = null, par = element.offsetParent;
    //首先加自己本身的左偏移和上偏移
    totalLeft += element.offsetLeft;
    totalTop += element.offsetTop
    //只要没有找到body，我们就把父级参照物的边框和偏移也进行累加
    while (par && par !== document.body) {
      if (navigator.userAgent.indexOf("MSIE 8.0") === -1) {
        //累加父级参照物的边框
        totalLeft += par.clientLeft;
        totalTop += par.clientTop
      }
      //累加父级参照物本身的偏移
      totalLeft += par.offsetLeft;
      totalTop += par.offsetTop
      par = par.offsetParent;
    }

    return {
      left: totalLeft,
      top: totalTop
    }
  },
	/**
	 * @description 拉伸功能
	 */
  resizeFunc(params: { resize, container, callback?}) {
    const { resize, container, callback } = params
    const sbox: any = resize
    const box: any = container
    sbox.onmousedown = function (e) {
      e = e || window.event;
      e.cancelBubble = true;
      const xDown = e.clientX,
        yDown = e.clientY,
        boxW = box.clientWidth,
        boxH = box.clientHeight;
      document.onmousemove = function (e: any) {
        e = e || window.event;
        const xMove = e.clientX,
          yMove = e.clientY,
          x_ = xMove - xDown, //x变化量
          y_ = yMove - yDown, // y变化量
          width = Math.max(10, x_ + boxW),
          height = Math.max(10, y_ + boxH);
        box.style.width = width + "px";
        box.style.height = height + "px";
        callback && callback({ width, height })
      }
    }
    document.onmouseup = function () {
      document.onmousemove = null;
    };
  }
}
