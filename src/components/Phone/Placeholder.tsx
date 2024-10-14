import { FC } from 'react'
import { PlaceholderType } from '../../shared/types/components/Phone'

export const Placeholder: FC<PlaceholderType> = ({ small }) => {
    return (
        <div
            className={`phone__placeholder ${small ? 'phone__placeholder_small' : ''} skeleton`}
        ></div>
    )
}
