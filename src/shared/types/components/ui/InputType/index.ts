import { ReactNode, InputHTMLAttributes } from 'react'

export type InputRef = HTMLInputElement

export type InputType = {
    icon?: ReactNode
    label?: string
    errorText?: string
    flexDirection?: 'column' | 'row'
} & InputHTMLAttributes<HTMLInputElement>
