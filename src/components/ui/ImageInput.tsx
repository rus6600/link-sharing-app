import '@styles/components/ui/_imageInput.scss'

import { UploadIcon } from '../Icons'
import React, { ChangeEventHandler } from 'react'

type ImageInputProps = {
    imgSrc?: string
    onChange: ChangeEventHandler<HTMLInputElement>
}

export const ImageInput: React.FC<ImageInputProps> = ({ imgSrc, onChange }) => {
    return (
        <label className="image-input">
            {imgSrc && <img src={imgSrc} alt="input image background" />}
            <input
                type="file"
                name="profileImage"
                accept="image/*"
                size={10}
                onChange={onChange}
            />
            <UploadIcon />
            <span>+Upload Image</span>
        </label>
    )
}
