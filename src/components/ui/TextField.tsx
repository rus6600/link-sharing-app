import '@style/ui/_textfield.scss'
import { LinksIcon } from '../Icons'
import React from 'react'
import {
    PlatformLinkRegexpEnum,
    PlatformUnionType,
} from '../../shared/types/Entities'

export const TextField: React.FC<{
    platform: PlatformUnionType
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    defaultValue?: string
}> = ({ platform, onChange, defaultValue }) => {
    return (
        <div className="text-field">
            <LinksIcon />
            <input
                required
                defaultValue={defaultValue}
                pattern={PlatformLinkRegexpEnum[platform]}
                onChange={onChange}
                type={'text'}
            ></input>
        </div>
    )
}
