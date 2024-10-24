import { ReactNode } from 'react'

export type ModalType = {
    onClose: () => void
    children: ReactNode
}
