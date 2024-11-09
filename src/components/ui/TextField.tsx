import React from 'react'

import '../../../styles/components/ui/_textfield.scss'

interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
    icon?: React.ReactElement
}

export const TextField: React.FC<TextFieldProps> = ({
    onChange,
    defaultValue,
    icon,
    ...rest
}) => {
    if (icon) {
        return (
            <div className="text-field">
                {icon}
                <input
                    required
                    defaultValue={defaultValue}
                    onChange={onChange}
                    type={'text'}
                    {...rest}
                />
            </div>
        )
    }

    return (
        <input
            className="text-field"
            required
            defaultValue={defaultValue}
            onChange={onChange}
            type={'text'}
            {...rest}
        ></input>
    )
}
