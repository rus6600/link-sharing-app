import { forwardRef, useId } from 'react'
import '../../../styles/components/ui/_input.scss'

import { InputRef, InputType } from '../../shared/types/components/ui/InputType'

export const Input = forwardRef<InputRef, InputType>(
    ({ icon, label, errorText, flexDirection, ...rest }, ref) => {
        const id = useId()
        return (
            <div
                className={`input-wrapper ${flexDirection ? `input-wrapper__${flexDirection}` : ''}`}
            >
                <label className="input-label" htmlFor={id}>
                    {label}
                </label>
                <div id={id} className={'input-container'}>
                    {icon}
                    <input ref={ref} className="input" {...rest} />
                    <span className="input-errortext">{errorText}</span>
                </div>
            </div>
        )
    }
)
