import { ReactNode } from "react"

export interface IProps {
	footer?: ReactNode | null
	content: ReactNode
	onConfirm?: () => void
	onCancel?: () => void
	onClose?: () => void
	okText?: ReactNode | string
	cancelText?: ReactNode | string
}