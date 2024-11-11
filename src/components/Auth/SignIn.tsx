import { useContext } from 'react'
import { observer } from 'mobx-react-lite'

import { Button, Input, Typography } from '../ui'
import { LetterIcon, LockIcon } from '../Icons'
import { RootStoreContext } from '@/store'

export const SignIn = observer(() => {
    const {
        authStore,
        uiStore: { toggleCurrentAuthPage },
    } = useContext(RootStoreContext)
    return (
        <>
            <Typography
                variant={'h1'}
                fontSize={'lg'}
                textAlign={'left'}
                color={'black'}
            >
                Login
            </Typography>
            <Typography textAlign={'left'} color={'grey-600'}>
                Add your details below to get back into the app
            </Typography>
            <fieldset
                className="fieldset"
                disabled={authStore.signInStatus.isLoading}
            >
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
                <Button
                    disabled={authStore.signInStatus.isLoading}
                    type={'submit'}
                    variant={'primary'}
                >
                    Login
                </Button>
                <Typography>
                    Don’t have an account?{' '}
                    <span
                        onClick={toggleCurrentAuthPage}
                        className={'typography-link'}
                    >
                        Create account
                    </span>
                </Typography>
            </fieldset>
        </>
    )
})
