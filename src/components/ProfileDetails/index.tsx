import React, { ChangeEvent, ChangeEventHandler, useContext } from 'react'
import '../../../styles/components/_profile-details.scss'

import { Button, ImageInput, Input, Typography } from '../ui'
import { RootStoreContext } from '../../store'
import { fileToDataString } from '../../shared/utils'
import { observer } from 'mobx-react-lite'
import { queryClient } from '../../shared/lib/api.ts'

export const ProfileDetails: React.FC = observer(() => {
    const {
        userStore: { userQuery, submitData, setUserData },
    } = useContext(RootStoreContext)

    const handleFileChange: ChangeEventHandler<HTMLInputElement> = async (
        event
    ) => {
        const file = event.target.files as FileList
        const profileImage = await fileToDataString(file?.[0])
        setUserData({ profileImage })
    }

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setUserData({ [event.target.name]: event.target.value })
    }
    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (userQuery?.data?.data) {
            submitData(userQuery.data.data)
        }
    }
    return (
        <form onSubmit={onSubmit} className={'profile-details'}>
            <Typography fontWeight={'600'} textAlign={'left'} fontSize={'lg'}>
                Profile Details
            </Typography>
            <Typography color={'grey-600'} textAlign={'left'}>
                Add your details to create a personal touch to your profile.
            </Typography>
            <fieldset className={'profile-details__img'}>
                <Typography color={'grey-600'} textAlign={'left'}>
                    Profile picture
                </Typography>
                <ImageInput
                    imgSrc={userQuery?.data?.data.profileImage}
                    onChange={handleFileChange}
                />
                <Typography color={'grey-600'} textAlign={'left'}>
                    Image must be below 1024x1024px. Use PNG or JPG format.
                </Typography>
            </fieldset>
            <fieldset className={'profile-details__inputs'}>
                <Input
                    required
                    name={'firstName'}
                    label={'First name*'}
                    value={userQuery?.data?.data.firstName}
                    onChange={handleChange}
                    flexDirection={'row'}
                    placeholder="e.g. John"
                    errorText={'Can’t be empty'}
                ></Input>
                <Input
                    required
                    name={'lastName'}
                    label={'Last name*'}
                    value={userQuery?.data?.data.lastName}
                    onChange={handleChange}
                    flexDirection={'row'}
                    placeholder="e.g. Appleseed"
                    errorText={'Can’t be empty'}
                ></Input>
                <Input
                    required
                    name={'contactEmail'}
                    label={'Email*'}
                    value={userQuery?.data?.data.contactEmail}
                    onChange={handleChange}
                    flexDirection={'row'}
                    type="email"
                    placeholder="e.g. email@example.com"
                    errorText={'Please check again'}
                ></Input>
            </fieldset>
            <Button variant={'primary'} type={'submit'}>
                Save
            </Button>
        </form>
    )
})
