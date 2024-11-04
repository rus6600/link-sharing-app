import React, { useContext } from 'react'
import { RootStoreContext } from '../../store'
import { observer } from 'mobx-react-lite'
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
import { PlatformUnionType } from '../../shared/types/Entities'

export const Links = observer(() => {
    const {
        userStore: {
            userLinks: { data },
        },
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
            {Array.from({ length: 5 }).map((_, i) => {
                const platform = data?.data?.[i]?.platform
                return (
                    <Button
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
