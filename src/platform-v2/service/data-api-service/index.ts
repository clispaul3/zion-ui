import { selectData } from "./api/selectData"
import { deleteData } from "./api/deleteData"
import { insertData } from "./api/insertData"
import { updateData } from "./api/updateData"
import { getUserInfo } from "./api/getUserInfo"
import { isOnly } from "./api/isOnly"
import { webLogin } from "./api/webLogin"
import { webLogout } from "./api/webLogout"
import { getFunCodeAuth } from "./api/getFunCodeAuth"
import { getDictionaryData } from "./api/getDictionaryData"
import { exportData } from "./api/exportData"
import { playVideoByCSplayer } from "./api/playVideoByCSplayer"
import { autoLogin } from "./api/autoLogin"
import { request } from "./api/request"
import { getParents } from "./api/getParents"
import { getChildren } from "./api/getChildren"
import { getFilterCondition } from "./api/utils/getFilterCondition"
import { getOrderBy } from "./api/utils/getOrderBy"
import { showTableData } from "./api/showTableData"
import { postOperaLog } from "./api/postOperaLog"
import { getTableMeta } from "./api/getTableMeta"

export const Http = {
	selectData,
	deleteData,
	insertData,
	updateData,
	getUserInfo,
	isOnly,
	webLogin,
	webLogout,
	getFunCodeAuth,
	getDictionaryData,
	exportData,
	playVideoByCSplayer,
	autoLogin,
	request,
	getParents,
	getChildren,
	showTableData,
	/** 传入 selectData 格式的 filterCondition， 得到 showTableData 需要的 filterCondition */
	getFilterCondition,
	/** 传入 selectData 格式的 orderBy， 得到 showTableData 需要的 orderBy */
	getOrderBy,
	postOperaLog,
	getTableMeta
}
