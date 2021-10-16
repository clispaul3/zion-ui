import { IProps, defaultType } from "../../../@types/PopMessage";
import { message } from "antd";

export const PopMessage = function (config: IProps) {
	const { type = defaultType, duration, title, onClose, text } = config
	message[type]({
		content: title || text,
		duration,
		onClose
	})
}