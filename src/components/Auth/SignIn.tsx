import React from 'react'
import { Button, Input, Typography } from '../ui'
import { LetterIcon, LockIcon } from '../Icons'
import { AuthFormComponentProps } from '../../shared/types/components/Auth'

export const SignIn: React.FC<AuthFormComponentProps> = ({ onSwitch }) => {
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
                <Button disabled={false} type={'submit'} variant={'primary'}>
                    Login
                </Button>
                <Typography>
                    Don’t have an account?{' '}
                    <span onClick={onSwitch} className={'typography-link'}>
                        Create account
                    </span>
                </Typography>
            </fieldset>
        </>
    )
}
