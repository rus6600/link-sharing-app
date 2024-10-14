import '@style/ui/_button.scss'
import {
    ButtonPropsType,
    ButtonVariantEnum,
    ButtonLinkType,
} from '../../shared'

export const Button = ({ variant, title, icon, ...rest }: ButtonPropsType) => {
    const baseButton = (
        <button className={`button button-${variant}`} {...rest}>
            {title}
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
                {title}
            </button>
        )
    }

    return baseButton
}
