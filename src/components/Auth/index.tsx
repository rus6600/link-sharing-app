import React, { FormEvent, useContext } from 'react'

import { Logo } from '../Header/Logo'
import { Button, Input, Typography } from '../ui'
import { LetterIcon, LockIcon } from '../Icons'

import '@style/_auth.scss'
import '@style/_header.scss'
import { RootStoreContext } from '../../store'
import { observer } from 'mobx-react-lite'

export const Auth: React.FC = observer(() => {
    const { authStore } = useContext(RootStoreContext)
    console.log(authStore.postUser().status)
    console.log(authStore.showPassword)

    return (
        <section className={'auth-bg'}>
            <div className="auth-wrapper">
                <Logo />
                <form
                    onSubmit={(e: FormEvent<HTMLFormElement>) => {
                        e.preventDefault()
                        authStore.postUser().mutate({
                            email: e.currentTarget.email.value,
                            password: e.currentTarget.password.value,
                        })
                    }}
                    className="form"
                >
                    <Typography
                        variant={'h1'}
                        fontSize={'lg'}
                        textAlign={'left'}
                        color={'black'}
                    >
                        Login
                    </Typography>
                    <Typography color={'grey-600'}>
                        Add your details below to get back into the app
                    </Typography>
                    <fieldset className="fieldset">
                        <Input
                            required
                            name="email"
                            label="Email address"
                            type="email"
                            placeholder={'e.g. alex@email.com'}
                            errorText="Can’t be empty"
                            icon={<LetterIcon />}
                        />
                        <Input
                            required
                            name="password"
                            label="Password"
                            type={'password'}
                            placeholder={'Enter your password'}
                            errorText="Please check again"
                            icon={<LockIcon />}
                        />
                        <Button type={'submit'} variant={'primary'}>
                            Login
                        </Button>
                        <Typography>
                            Don’t have an account?{' '}
                            <span className={'typography-link'}>
                                Create account
                            </span>
                        </Typography>
                    </fieldset>
                </form>
            </div>
        </section>
    )
})
