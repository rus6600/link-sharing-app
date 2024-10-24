import React from 'react'
import { Button, Input, Typography } from '../ui'
import { LetterIcon, LockIcon } from '../Icons'
import { AuthFormComponentProps } from '../../shared/types/components/Auth'

export const SignUp: React.FC<AuthFormComponentProps> = ({ onSwitch }) => {
    return (
        <>
            <Typography
                variant={'h1'}
                fontSize={'lg'}
                textAlign={'left'}
                color={'black'}
            >
                Create account
            </Typography>
            <Typography textAlign={'left'} color={'grey-600'}>
                Let’s get you started sharing your links!
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
                    minLength={8}
                    name="password"
                    label="Create password"
                    type={'password'}
                    placeholder={'At least 8 characters'}
                    errorText="Please check again"
                    icon={<LockIcon />}
                />
                {/*<Input*/}
                {/*    required*/}
                {/*    minLength={8}*/}
                {/*    name="password"*/}
                {/*    label="Confirm password"*/}
                {/*    type={'password'}*/}
                {/*    placeholder={'At least 8 characters'}*/}
                {/*    errorText="Please check again"*/}
                {/*    icon={<LockIcon />}*/}
                {/*/>*/}
                <Typography
                    color={'grey-600'}
                    textAlign={'left'}
                    fontSize={'sm'}
                >
                    Password must contain at least 8 characters
                </Typography>
                <Button type={'submit'} variant={'primary'}>
                    Create new account
                </Button>
                <Typography color={'grey-600'}>
                    Already have an account?{' '}
                    <span onClick={onSwitch} className={'typography-link'}>
                        Login
                    </span>
                </Typography>
            </fieldset>
        </>
    )
}
