import React, { useMemo, useRef } from 'react'
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

export const getKeys = Object.keys as <T extends object>(
    obj: T
) => Array<keyof T>

export const useDebounce = <T>(cb: (args: T) => void, delay: number) => {
    const timer = useRef<ReturnType<typeof setTimeout>>()
    return useMemo(
        () => (args: T) => {
            clearTimeout(timer.current)
            timer.current = setTimeout(() => {
                cb(args)
            }, delay)
        },
        [delay, cb]
    )
}

export const fileToDataString = (file: File) => {
    return new Promise<string>((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onerror = (error) => reject(error)
        reader.onload = () => resolve(reader.result as string)
    })
}
