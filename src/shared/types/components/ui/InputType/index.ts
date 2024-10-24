import { ReactNode, InputHTMLAttributes } from 'react'

export type InputType = {
    icon: ReactNode
    label: string
    errorText: string
} & InputHTMLAttributes<HTMLInputElement>
