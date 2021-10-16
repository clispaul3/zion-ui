/**
 * @description 逻辑模板
 */
import { StateManage, PopModal, PropertyService, Loading, PopMessage } from "zion-ui"
import userForm from "../property/userForm.json"
import { ManOutlined, WomanOutlined } from "@ant-design/icons"
import React from "react"

const controlKey = {
	FORM: "USER.FORM",
	TABLE: "USER.TABLE"
}
const hobbies = {
	"001": "篮球",
	"002": "足球",
	"003": "排球"
}
export const Service = {
	getHeight: document.body.clientHeight + "px",
	controlKey,
	tableService: {
		httpConfig: {
			init: async function () {
				return {
					total: 1,
					data: [
						{ username: "admin", userId: "001", sex: "male", hobby: ["001"], age: 18, appearance: 6 }
					]
				}
			},
			delete: async function ({ checkedRows }) {
				const userIds = checkedRows.map(item => item["userId"])
				let { dataSource } = StateManage.get(controlKey.TABLE)
				dataSource = dataSource.filter(data => userIds.includes(data["userId"]) == false)
				StateManage.set(controlKey.TABLE, { dataSource })
				return {
					result: true,
					message: "删除成功"
				}
			},
			onSearch: function ({ condition }) {
				const { filterConditionMap } = condition
				const searchValue = filterConditionMap["@searchValue"]
				let { dataSource } = StateManage.get(controlKey.TABLE)
				dataSource = dataSource.filter(data => data["username"].indexOf(searchValue) >= 0)
				return new Promise((resolve, reject) => {
					const timer = setTimeout(() => {
						clearTimeout(timer)
						resolve({
							data: dataSource,
							total: dataSource.length
						})
					}, 800)
				})
			}
		},
		createButton: function () {
			PopModal({
				title: "新建用户",
				height: "400px",
				content: PropertyService.getReactElementFromJSON(userForm, Service),
				onOk: function ({ }, modalState) {
					Service.tableService.submit({
						userId: null,
						callback: function () {
							StateManage.set(modalState, { visible: false })
						}
					})
				}
			})
		},
		updateButton: function ({ record }) {
			PopModal({
				height: "400px",
				title: "修改用户",
				content: PropertyService.getReactElementFromJSON(userForm, Service),
				onOk: function ({ }, modalState) {
					Service.tableService.submit({
						userId: record.userId,
						callback: function () {
							StateManage.set(modalState, { visible: false })
						}
					})
				}
			})
			Service.tableService.setUserInfo({ userInfo: record })
		},
		setUserInfo: function ({ userInfo }) {
			const { setFormData } = StateManage.get(controlKey.FORM)
			setFormData({
				username: { value: userInfo.username },
				sex: { value: userInfo.sex },
				hobby: { value: userInfo.hobby.toString().split(",") },
				age: { value: userInfo.age },
				appearance: { value: userInfo.appearance }
			})
		},
		submit: async function ({ userId, callback }) {
			const { getFormData } = StateManage.get(controlKey.FORM)
			const formData = await getFormData(true)
			Loading.setGlobalLoading(true)
			const { age, appearance, hobby, sex, username } = formData
			const { dataSource } = StateManage.get(controlKey.TABLE)
			const nextUser = {
				userId: userId || (Math.random() * 10000000).toFixed(0),
				age: age["value"].toString(),
				appearance: appearance["value"].toString(),
				hobby: hobby["value"].toString(),
				sex: sex["value"].toString(),
				username: username["value"].toString()
			}
			if (!userId) {
				dataSource.push(nextUser)
			}
			if (userId) {
				dataSource.forEach(user => {
					if (user["userId"] === userId) {
						Object.assign(user, nextUser)
					}
				})
			}
			const timer = setTimeout(() => {
				Loading.setGlobalLoading(false)
				clearTimeout(timer)
				StateManage.set(controlKey.TABLE, { dataSource })
				callback && callback()
			}, 800)
		},
		render_sex: function (text, record, index) {
			const { sex } = record
			if (sex === "male") return <span>
				<ManOutlined />男
      </span>
			return <span>
				<WomanOutlined />女
      </span>
		},
		render_hobby: function (text, record, index) {
			const { hobby = "" } = record
			let hobbyname: any = []
			hobby.toString().split(",").forEach(item => {
				hobbyname.push(hobbies[item])
			})
			return hobbyname.join(", ")
		},
		importButton: function () {
			PopMessage({ type: "error", text: "导入失败" })
		},
		exportButton: function ({ checkedRows }) {
			if (checkedRows.length <= 0) {
				PopModal.confirm({
					title: "导出数据",
					content: "确认导出全部数据?",
					onOk: function () {
						PopMessage({ type: "error", text: "导出失败" })
					}
				})
				return
			}
			PopMessage({ type: "info", text: "请调用导出接口" })
		}
	}
}

