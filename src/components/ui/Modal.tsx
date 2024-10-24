import { forwardRef } from 'react'
import { ModalType } from '../../shared/types/components/ui/ModalType'

import '@style/ui/_modal.scss'
import { Typography } from './Typography'

export const Modal = forwardRef<HTMLDialogElement, ModalType>(
    ({ children, onClose }, ref) => {
        return (
            <dialog className={'dialog'} ref={ref}>
                <div className={'dialog__content'}>
                    <button
                        onClick={onClose}
                        className={'dialog__content_exit_btn'}
                    ></button>
                    <Typography fontSize={'lg'}>Sorry...</Typography>
                    <Typography> {children}</Typography>
                </div>
            </dialog>
        )
    }
)
