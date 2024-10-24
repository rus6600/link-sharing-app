import React, { useContext, useRef } from 'react'
import { Button, Input, Typography } from '../ui'

import { LetterIcon, LockIcon } from '../Icons'
import { AuthFormComponentProps } from '../../shared/types/components/Auth'
import { InputRef } from '../../shared/types/components/ui/InputType'
import { checkPasswordMatch } from '../../shared/utils'
import { RootStoreContext } from '../../store'

export const SignUp: React.FC<AuthFormComponentProps> = ({ onSwitch }) => {
    const {
        authStore: { signUpMutation },
    } = useContext(RootStoreContext)
    const { isLoading } = signUpMutation.getInstance().getCurrentResult()
    const passwordRef = useRef<InputRef>(null)
    const confirmPasswordRef = useRef<InputRef>(null)
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
            <fieldset disabled={isLoading} className="fieldset">
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
                    ref={passwordRef}
                    required
                    minLength={8}
                    name="password"
                    label="Create password"
                    type={'password'}
                    placeholder={'At least 8 characters'}
                    errorText="Please check again"
                    icon={<LockIcon />}
                />
                <Input
                    required
                    ref={confirmPasswordRef}
                    onChange={(e) =>
                        checkPasswordMatch(e, passwordRef, confirmPasswordRef)
                    }
                    label="Confirm password"
                    type={'password'}
                    placeholder={'At least 8 characters'}
                    errorText="Passwords do not match"
                    icon={<LockIcon />}
                />
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
