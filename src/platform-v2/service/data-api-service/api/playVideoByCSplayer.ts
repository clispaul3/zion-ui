/**
 * @description 调用客户端播放器播放视频
 * @param {String} command 客户端要执行的命令
 * @param {Object} params 指令需要的参数
 */
type Command = "StartPreview" | "VideoPlayback" | "VIDEOPLAYBACKBYTIME" | "IPTalkPlayBack"

// 视频预览的参数格式
interface IStartPreview {
	deviceid: string
}

// 录像回放的参数格式
interface VIDEOPLAYBACKBYTIME {
	deviceid: string
	starttime: string
	stoptime: string
}

// 事件录像回放的格式
interface IVIDEOPLAYBACK {
	devId: string
	objId: {
		devId: string
		startTime: string
		filepath: string
		filename: string
	}[]
}

interface IIPTalkPlayBack {
	RecordInfo: any
}

export const playVideoByCSplayer = (command: Command, params: IStartPreview[] | VIDEOPLAYBACKBYTIME[] | IVIDEOPLAYBACK[] | IIPTalkPlayBack) => {
	const browser = { name: "chrome" };
	try {
		switch (browser && browser.name) {
			case 'chrome':
				(window as any).csobj.JSMessage(command, JSON.stringify(params));
				break;

			case 'ie':
			case 'edge':
				(window.external as any).JSMessage(command, JSON.stringify(params));
				break;
			default:
				break;
		}
	} catch (e) {
		console.log('调用客户端方法异常');
	}
}
