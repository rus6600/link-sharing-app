import { ComponentProps, ReactElement, ReactNode } from 'react'

type ButtonVariantUnion =
    | 'primary'
    | 'icon'
    | 'link'
    | 'reverted'
    | 'transparent'
    | 'outlined'
    | 'disabled'

export const ButtonVariantEnum: Record<ButtonVariantUnion, ButtonVariantUnion> =
    {
        primary: 'primary',
        icon: 'icon',
        link: 'link',
        reverted: 'reverted',
        transparent: 'transparent',
        outlined: 'outlined',
        disabled: 'disabled',
    } as const

export type ButtonLinkType = {
    variant: Extract<ButtonVariantUnion, 'link'>
    linkProps: ComponentProps<'a'>
}

export type BaseButtonType = {
    variant: Exclude<ButtonVariantUnion, 'link'>
}

export type ButtonPropsType = ComponentProps<'button'> & {
    icon?: ReactNode
    endIcon?: ReactElement
    borderColor?: `grey-${number}`
    children?: ReactNode
} & (ButtonLinkType | BaseButtonType)
