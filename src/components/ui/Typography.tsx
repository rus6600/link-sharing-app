import { TypographyProps } from '../../shared'
import { createElement } from 'react'
import '@style/ui/_typography.scss'

export const Typography = ({
    variant = 'p',
    children,
    fontSize = 'md',
    textAlign = 'center',
    fontWeight,
    color = 'black',
}: TypographyProps) => {
    const className = `typography ${textAlign ? `typography-align-${textAlign}` : ''} ${color ? `typography-clr-${color}` : ''} ${fontSize ? `typography-fz-${fontSize}` : ''} ${fontWeight ? `typography-fw-${fontWeight}` : ''}`
    return createElement(variant, { className }, children)
}
