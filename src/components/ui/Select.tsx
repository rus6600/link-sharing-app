import '@style/ui/_select.scss'
import React from 'react'
import {
    ArrowIcon,
    FacebookIcon,
    FrontEndMentorIcon,
    GitHubIcon,
    LinkedInIcon,
    YoutubeIcon,
} from '../Icons'

import { platformUnion } from '../../shared/types/components/ui/Select'

import Select, { Props, GroupBase } from 'react-select'
import { PlatformUnionType } from '../../shared/types/Entities'

export const IconEnum: Record<platformUnion, React.ReactNode> = {
    linkedin: <LinkedInIcon />,
    youtube: <YoutubeIcon />,
    facebook: <FacebookIcon />,
    frontendmentor: <FrontEndMentorIcon />,
    github: <GitHubIcon />,
} as const

export type OptionType = {
    value: PlatformUnionType
    label: React.JSX.Element
}

export const CustomSelect = <
    Option,
    IsMulti extends boolean = false,
    Group extends GroupBase<Option> = GroupBase<Option>,
>({
    options,
    onChange,
    value,
}: Props<Option, IsMulti, Group>) => {
    return (
        <Select
            isDisabled={false}
            menuPortalTarget={document.body}
            options={options}
            value={value}
            onChange={onChange}
            components={{
                DropdownIndicator: () => <ArrowIcon />,
                IndicatorSeparator: () => false,
            }}
            styles={{
                valueContainer: (baseStyles) => ({
                    ...baseStyles,
                    border: 'none',
                    padding: '6px 14px',
                }),
                control: (baseStyles) => ({
                    ...baseStyles,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    borderRadius: '8px',
                    border: '1px solid #D9D9D9',
                    '&:hover': {
                        boxShadow: '0px 0px 32px 0px rgba(99, 60, 255, 0.25)',
                    },
                }),
                indicatorsContainer: (baseStyles) => ({
                    ...baseStyles,
                    padding: '12px 16px',
                }),
                menuPortal: (base) => ({ ...base, zIndex: 9999, padding: 0 }),
                option: (baseStyles, state) => ({
                    ...baseStyles,
                    borderBottom: '1px solid #D9D9D9',
                    display: 'flex',
                    alignItems: 'center',
                    padding: '12px 16px',
                    gap: '12px',

                    backgroundColor: 'white',
                    ...(state.isFocused && { background: 'white' }),
                }),
                menu: (provided) => ({
                    ...provided,
                }),
            }}
        />
    )
}
