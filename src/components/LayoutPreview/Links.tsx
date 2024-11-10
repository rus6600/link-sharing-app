import React, { useContext } from 'react'
import { observer } from 'mobx-react-lite'

import { RootStoreContext } from '../../store'
import { Button } from '../ui'
import {
    FacebookIcon,
    FrontEndMentorIcon,
    GitHubIcon,
    LinkedInIcon,
    YoutubeIcon,
} from '../Icons'
import { ArrowRightIcon } from '../Icons/ArrowRightIcon'
import { platformUnion } from '../../shared/types/components/ui/Select'
import { pageEnum, PlatformUnionType } from '../../shared/types/Entities'

export const Links = observer(() => {
    const {
        userStore: { userQuery },
        uiStore,
    } = useContext(RootStoreContext)

    const IconEnum: Record<platformUnion, React.ReactNode> = {
        linkedin: <LinkedInIcon color={'white'} />,
        youtube: <YoutubeIcon color={'white'} />,
        facebook: <FacebookIcon color={'white'} />,
        frontendmentor: <FrontEndMentorIcon color={'white'} />,
        github: <GitHubIcon color={'white'} />,
    } as const
    return (
        <div className="layout-preview__phone_content_links">
            {Array.from({
                length:
                    uiStore.currentPage === pageEnum.links
                        ? 5
                        : userQuery.data?.data.links?.length || 0,
            }).map((_, i) => {
                const platform = userQuery?.data?.data?.links?.[i]?.platform
                const id = userQuery?.data?.data?.links?.[i]?.id
                return (
                    <Button
                        key={id}
                        variant={'icon'}
                        icon={IconEnum[platform as PlatformUnionType]}
                        endIcon={<ArrowRightIcon />}
                        className={`layout-preview__phone_content_link ${platform ? `layout-preview__phone_content_link_${platform}` : 'skeleton'}`}
                    >
                        {platform}
                    </Button>
                )
            })}
        </div>
    )
})
