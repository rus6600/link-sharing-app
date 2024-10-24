import React, { FormEvent, useContext } from 'react'
import { observer } from 'mobx-react-lite'

import { Logo } from '../Header/Logo'
import { RootStoreContext } from '../../store'
import { SignIn } from './SignIn'
import { SignUp } from './SignUp'

import '@style/_auth.scss'
import '@style/_header.scss'

export const Auth: React.FC = observer(() => {
    const { authStore } = useContext(RootStoreContext)
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = {
            email: e.currentTarget.email.value,
            password: e.currentTarget.password.value,
        }
        authStore.handleSubmit(formData)
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
        </section>
    )
})
