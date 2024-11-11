import { createElement } from 'react'

import { TypographyProps } from '@/shared'
import '@styles/components/ui/_typography.scss'

export const Typography = ({
    variant = 'p',
    children,
    fontSize = 'md',
    textAlign = 'center',
    fontWeight = '400',
    color = 'black',
    marginBlock,
    onClick,
    className,
}: TypographyProps) => {
    const dynamicClassName = `${className ? className : ''} typography ${textAlign ? `typography-align-${textAlign}` : ''} ${color ? `typography-clr-${color}` : ''} ${fontSize ? `typography-fz-${fontSize}` : ''} ${marginBlock ? `typography-m-${marginBlock}` : ''} ${fontWeight ? `typography-fw-${fontWeight}` : ''}`
    return createElement(
        variant,
        { className: dynamicClassName, onClick },
        children
    )
}
