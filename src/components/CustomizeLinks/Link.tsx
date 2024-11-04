import { CustomSelect, IconEnum, TextField, Typography } from '../ui'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { LinkType, PlatformUnionType } from '../../shared/types/Entities'
import React, { useContext } from 'react'
import { RootStoreContext } from '../../store'
import { useDebounce } from '../../shared/utils'

const SelectLabel = ({ platform }: { platform: PlatformUnionType }) => (
    <div className={'link-content'}>
        {IconEnum[platform]}
        <Typography>{platform}</Typography>
    </div>
)

export const Link: React.FC<LinkType & { orderId: number }> = ({
    id,
    orderId,
    platform,
}) => {
    const {
        userStore: {
            removeLink,
            onSelectChange,
            selectOptions,
            onInputChange,
            userLinks,
        },
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

    const onChange = useDebounce<React.ChangeEvent<HTMLInputElement>>((e) => {
        onInputChange(id, e.target.value)
    }, 500)

    const value = userLinks?.data?.data?.filter((link) => link.id === id)[0]
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
                    onClick={() => removeLink(id)}
                    color={'grey-600'}
                >
                    Remove
                </Typography>
            </div>
            <Typography
                textAlign={'left'}
                fontSize={'sm'}
                color={'black'}
                fontWeight={'400'}
            >
                Platform
            </Typography>
            <CustomSelect
                value={selectValue}
                options={options}
                onChange={(newValue) => onSelectChange(id, newValue)}
            />
            <Typography
                textAlign={'left'}
                fontSize={'sm'}
                color={'black'}
                fontWeight={'400'}
            >
                Link
            </Typography>
            <TextField
                defaultValue={textFieldValue}
                platform={platform || 'frontendmentor'}
                onChange={onChange}
            />
        </fieldset>
    )
}
