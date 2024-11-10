import { useContext } from 'react'
import { observer } from 'mobx-react-lite'

import { Links } from './Links'
import { RootStoreContext } from '../../store'
import { Typography } from '../ui'

export const Content = observer(() => {
    const {
        userStore: { userQuery },
    } = useContext(RootStoreContext)

    const img = userQuery?.data?.data?.profileImage
    const fullName =
        (userQuery?.data?.data?.lastName || userQuery?.data?.data?.firstName) &&
        `${userQuery?.data?.data?.firstName} ${userQuery?.data?.data?.lastName}`
    const contactEmail = userQuery?.data?.data?.contactEmail
    return (
        <div className="layout-preview__phone_content">
            <div
                className={`layout-preview__phone_content_avatar ${img ? '' : 'skeleton'} `}
            >
                <img src={img} alt="" />
            </div>
            <Typography
                className={`${!(!userQuery?.data?.data?.firstName && !userQuery?.data?.data?.lastName) ? '' : 'skeleton'}`}
                fontWeight={'600'}
            >
                {fullName}
            </Typography>
            <Typography
                className={`small ${contactEmail ? '' : 'skeleton'}`}
                color={'grey-600'}
                fontSize={'sm'}
            >
                {contactEmail}
            </Typography>
            <Links></Links>
        </div>
    )
})
