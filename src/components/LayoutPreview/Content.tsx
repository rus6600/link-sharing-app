import { Links } from './Links'
import { useContext } from 'react'
import { RootStoreContext } from '../../store'
import { observer } from 'mobx-react-lite'
import { Typography } from '../ui'

export const Content = observer(() => {
    const {
        userStore: { userQuery },
    } = useContext(RootStoreContext)

    const img = userQuery?.data?.data?.profileImage
    const fullName = `${userQuery?.data?.data?.firstName} ${userQuery?.data?.data?.lastName}`
    return (
        <div className="layout-preview__phone_content">
            <div
                className={`layout-preview__phone_content_avatar ${img ? '' : 'skeleton'} `}
            >
                <img src={img} alt="" />
            </div>
            <div
                className={`layout-preview__phone_content_placeholder ${fullName ? '' : 'skeleton'}`}
            >
                <Typography>{fullName}</Typography>
            </div>
            <div
                className={`layout-preview__phone_content_placeholder_small skeleton`}
            ></div>
            <Links></Links>
        </div>
    )
})
