interface IProps {
	/** 图片地址 */
	imgSrc: string
	/** 是否支持放大缩小 */
	allResize?: boolean
	/** 是否支持拖拽 */
	draggable?: boolean
	/** 支持绘制哪种图形 */
	drawType?: {
		/** 矩形 */
		rectangle?: boolean
		/** 圆形 */
		round?: boolean
		/** 多边形 */
		polygon?: boolean
		/** 折线 */
		polyline?: boolean
	}
	/** 矩形数据列表 */
	rectangleDataSource?: Array<{
		leftTop: {
			/** x坐标 */
			x: number,
			/** y坐标 */
			y: number
		},
		leftBottom: {
			/** x坐标 */
			x: number,
			/** y坐标 */
			y: number
		},
		rightTop: {
			/** x坐标 */
			x: number,
			/** y坐标 */
			y: number
		},
		rightBottom: {
			/** x坐标 */
			x: number,
			/** y坐标 */
			y: number
		}
	}>
	/** 圆形数据列表 */
	roundDataSource?: Array<{
		/** x坐标 */
		x: number,
		/** y坐标 */
		y: number
		/** 半径 */
		radius: number
	}>
	/** 多边形数据列表 */
	polygonDataSource?: Array<Array<{
		/** x坐标 */
		x: number,
		/** y坐标 */
		y: number
	}>>
	/** 折线数据列表 */
	polylineDataSource?: Array<Array<{
		/** x坐标 */
		x: number,
		/** y坐标 */
		y: number
	}>>
	/** 坐标点位 */
	pointList: Array<{
		/** 宽度 */
		width?: number | string
		/** 高度 */
		height?: number | string
		/** 背景颜色 */
		backgroundColor?: string
		/** 文字提示 */
		text?: string
		/** 是否允许拖拽 */
		draggable?: boolean
		/** 点击事件 */
		onClick: () => void
		/** 显示图标的地址 */
		imgSrc?: string
		/** 其他业务数据 */
		[key: string]: any
	}>
}