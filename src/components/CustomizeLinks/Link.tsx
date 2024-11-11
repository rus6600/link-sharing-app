import React, { useContext } from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

import { CustomSelect, IconEnum, TextField, Typography } from '../ui'
import {
    LinkType,
    PlatformLinkRegexpEnum,
    PlatformPlaceholderEnum,
    PlatformUnionType,
} from '@/shared/types/Entities'
import { RootStoreContext } from '@/store'
import { LinksIcon } from '../Icons'

const SelectLabel = ({ platform }: { platform: PlatformUnionType }) => (
    <div className={'link-content'}>
        {IconEnum[platform]}
        <Typography>{platform}</Typography>
    </div>
)

export const Link: React.FC<
    LinkType & { orderId: number; isLoading: boolean }
> = ({ id, orderId, platform, isLoading }) => {
    const {
        userStore: { onSelectChange, selectOptions, removeUserLink, userQuery },
    } = useContext(RootStoreContext)
    const { attributes, listeners, setNodeRef, transform, transition } =
        useSortable({ id })
    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    }

    const options = selectOptions.map((option) => ({
        value: option,
        label: <SelectLabel platform={option} />,
    }))

    const value = userQuery?.data?.data?.links?.filter(
        (link) => link.id === id
    )[0]
    const selectValue =
        value && value.platform
            ? {
                  value: value.platform,
                  label: <SelectLabel platform={value.platform} />,
              }
            : null
    const textFieldValue = value!.url!
    return (
        <fieldset
            id={id}
            ref={setNodeRef}
            disabled={isLoading}
            style={style}
            className={'link-wrapper'}
        >
            <div className={'link-wrapper__title'}>
                <div
                    {...listeners}
                    {...attributes}
                    className={'link-wrapper__title_grab'}
                ></div>
                <Typography fontWeight={'700'} color={'grey-600'}>
                    Link #{++orderId}
                </Typography>
                <Typography
                    className={'link-wrapper__title_btn'}
                    onClick={() => removeUserLink(id)}
                    color={'grey-600'}
                >
                    Remove
                </Typography>
            </div>
            <label htmlFor={`${id}__select`}>
                <Typography
                    textAlign={'left'}
                    fontSize={'sm'}
                    color={'black'}
                    fontWeight={'400'}
                >
                    Platform
                </Typography>
                <CustomSelect
                    isDisabled={isLoading}
                    id={`${id}__select`}
                    value={selectValue}
                    options={options}
                    onChange={(newValue) => onSelectChange(id, newValue)}
                />
            </label>
            <label htmlFor={`${id}__input`}>
                <Typography
                    textAlign={'left'}
                    fontSize={'sm'}
                    color={'black'}
                    fontWeight={'400'}
                >
                    Link
                </Typography>
                <TextField
                    name={`${id}__input`}
                    id={`${id}__input`}
                    icon={<LinksIcon />}
                    placeholder={PlatformPlaceholderEnum[platform || 'default']}
                    defaultValue={textFieldValue}
                    pattern={PlatformLinkRegexpEnum[platform || 'default']}
                />
            </label>
        </fieldset>
    )
}
