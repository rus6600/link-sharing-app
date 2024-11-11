import '@styles/components/ui/_button.scss'

import { ButtonPropsType, ButtonVariantEnum, ButtonLinkType } from '@/shared'

export const Button = ({
    variant,
    children,
    borderColor,
    icon,
    endIcon,
    className,
    ...rest
}: ButtonPropsType) => {
    const baseButton = (
        <button
            className={`${className} button button-${variant} ${borderColor ? `borderColor-${borderColor}` : ''}`}
            {...rest}
        >
            {children}
        </button>
    )
    if (variant === ButtonVariantEnum.link) {
        const { linkProps } = rest as ButtonLinkType
        return <a {...linkProps}>{baseButton}</a>
    }

    if (icon) {
        return (
            <button
                className={`${className} button button-icon button-${variant} ${borderColor ? `borderColor-${borderColor}` : ''}`}
                {...rest}
            >
                {icon}
                {children}
                {endIcon}
            </button>
        )
    }

    return baseButton
}
