import React, { FormEvent, useContext, useRef } from 'react'
import { observer } from 'mobx-react-lite'

import { Logo } from '../Header/Logo'
import { RootStoreContext } from '../../store'
import { SignIn } from './SignIn'
import { SignUp } from './SignUp'

import '@style/_auth.scss'
import '@style/_header.scss'
import { Modal } from '../ui/Modal'
import { Button, Typography } from '../ui'

export const WithAuth: React.FC<{ children: React.ReactNode }> = observer(
    ({ children }) => {
        const modalRef = useRef<HTMLDialogElement>(null)
        const { authStore } = useContext(RootStoreContext)

        if (authStore.isUserAuthenticated) {
            return children
        }

        const handleOnSignInError = () => {
            authStore.toggleForm()
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
        return (
            <section className={'auth-bg'}>
                <div className="auth-wrapper">
                    <Logo />
                    <form onSubmit={handleSubmit} className="form">
                        {authStore.showSignInForm ? (
                            <SignIn onSwitch={authStore.toggleForm} />
                        ) : (
                            <SignUp onSwitch={authStore.toggleForm} />
                        )}
                    </form>
                </div>
                <Modal onClose={() => modalRef.current?.close()} ref={modalRef}>
                    {authStore.showSignInForm ? (
                        <>
                            <Typography marginBlock={'16'}>
                                User not found :(
                            </Typography>
                            <Button
                                variant={'primary'}
                                onClick={handleOnSignInError}
                            >
                                Sign up!
                            </Button>
                        </>
                    ) : (
                        authStore.signUpStatus?.error?.response?.data.message
                    )}
                </Modal>
            </section>
        )
    }
)
