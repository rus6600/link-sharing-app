import React, { FormEvent, useContext, useRef } from 'react'
import { observer } from 'mobx-react-lite'

import { Logo } from '../Header/Logo'
import { RootStoreContext } from '@/store'
import { SignIn } from './SignIn'
import { SignUp } from './SignUp'
import { Modal } from '../ui/Modal'
import { Button, Typography } from '../ui'
import { pageEnum } from '@/shared/types/Entities'

import '@styles/components/_auth.scss'
import '@styles/components/_header.scss'

export const WithAuth: React.FC<{ children: React.ReactNode }> = observer(
    ({ children }) => {
        const modalRef = useRef<HTMLDialogElement>(null)
        const { authStore, uiStore } = useContext(RootStoreContext)

        if (
            uiStore.page !== pageEnum.signIn &&
            uiStore.page !== pageEnum.signUp
        ) {
            return children
        }

        const handleOnSignInError = () => {
            uiStore.setCurrentPage(pageEnum.signUp)
            modalRef.current?.close()
        }
        const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
            e.preventDefault()
            const formData = {
                email: e.currentTarget.email.value,
                password: e.currentTarget.password.value,
            }
            authStore.handleSubmit(formData).catch(() => {
                modalRef?.current?.showModal()
            })
        }
        console.log(authStore.signInStatus)
        return (
            <section className={'auth-bg'}>
                <div className="auth-wrapper">
                    <Logo />
                    <form onSubmit={handleSubmit} className="form">
                        {uiStore.page === pageEnum.signIn ? (
                            <SignIn />
                        ) : (
                            <SignUp />
                        )}
                    </form>
                </div>
                <Modal onClose={() => modalRef.current?.close()} ref={modalRef}>
                    {uiStore.page === pageEnum.signIn ? (
                        <>
                            <Typography fontSize={'lg'}>
                                {
                                    authStore.signInStatus?.error?.response
                                        ?.data?.message
                                }
                            </Typography>
                            <Button
                                variant={'primary'}
                                onClick={handleOnSignInError}
                            >
                                Sign up!
                            </Button>
                        </>
                    ) : (
                        <Typography fontSize={'lg'}>
                            {
                                authStore.signUpStatus?.error?.response?.data
                                    ?.message
                            }
                        </Typography>
                    )}
                </Modal>
            </section>
        )
    }
)
