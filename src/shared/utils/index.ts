import React from 'react'
import { InputRef } from '../types/components/ui/InputType'

export const checkPasswordMatch = (
    e: React.ChangeEvent<HTMLInputElement>,
    passwordRef: React.RefObject<InputRef>,
    confirmPasswordRef: React.RefObject<InputRef>
) => {
    if (passwordRef?.current?.value !== e.target.value) {
        confirmPasswordRef?.current?.setCustomValidity('passwords do not match')
    } else {
        confirmPasswordRef?.current?.setCustomValidity('')
    }
}
