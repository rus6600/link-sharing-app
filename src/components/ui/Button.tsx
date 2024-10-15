import '@style/ui/_button.scss'
import {
    ButtonPropsType,
    ButtonVariantEnum,
    ButtonLinkType,
} from '../../shared'

export const Button = ({
    variant,
    children,
    icon,
    ...rest
}: ButtonPropsType) => {
    const baseButton = (
        <button className={`button button-${variant}`} {...rest}>
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
                className={`button button-icon button-${variant}`}
                {...rest}
            >
                {icon}
                {children}
            </button>
        )
    }

    return baseButton
}
