import React, { useId } from 'react'
import '@style/ui/_input.scss'

import { InputType } from '../../shared/types/components/ui/InputType'

export const Input: React.FC<InputType> = ({
    icon,
    label,
    errorText,
    ...rest
}) => {
    const id = useId()
    return (
        <div className="input-wrapper">
            <label className="input-label" htmlFor={id}>
                {label}
            </label>
            <div id={id} className={'input-container'}>
                {icon}
                <input className="input" {...rest} />
                <span className="input-errortext">{errorText}</span>
            </div>
        </div>
    )
}
