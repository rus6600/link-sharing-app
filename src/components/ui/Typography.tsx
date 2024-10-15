import { TypographyProps } from '../../shared'
import { createElement } from 'react'
import '@style/ui/_typography.scss'

export const Typography = ({
    variant = 'p',
    children,
    fontSize = 'md',
    color = 'black',
}: TypographyProps) => {
    const className = `typography ${color ? `typography-clr-${color}` : ''} ${fontSize ? `typography-fz-${fontSize}` : ''}`
    return createElement(variant, { className }, children)
}
