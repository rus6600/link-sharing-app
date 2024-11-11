import { useContext } from 'react'
import { observer } from 'mobx-react-lite'

import { LinksIcon, UserIcon } from '../Icons'
import { Logo } from './Logo'
import { Button } from '../ui'
import { RootStoreContext } from '@/store'
import { pageEnum } from '@/shared/types/Entities'
import '@styles/components/_header.scss'

export const Header = observer(() => {
    const {
        uiStore: { currentPage, setCurrentPage },
    } = useContext(RootStoreContext)
    return (
        <header className="header">
            {currentPage === pageEnum.preview ? (
                <>
                    <Button
                        variant={'outlined'}
                        onClick={() => setCurrentPage(pageEnum.links)}
                    >
                        Back to Editor
                    </Button>
                    <Button variant={'primary'}>Share Link</Button>
                </>
            ) : (
                <>
                    <Logo />
                    <div className="header__switch">
                        <Button
                            onClick={() => setCurrentPage(pageEnum.links)}
                            variant={
                                currentPage === pageEnum.links
                                    ? 'reverted'
                                    : 'transparent'
                            }
                            icon={<LinksIcon fill={'#633cff'} />}
                        >
                            Links
                        </Button>
                        <Button
                            onClick={() =>
                                setCurrentPage(pageEnum.profileDetails)
                            }
                            variant={
                                currentPage === pageEnum.profileDetails
                                    ? 'reverted'
                                    : 'transparent'
                            }
                            icon={<UserIcon fill="#737373" />}
                        >
                            Profile Details
                        </Button>
                    </div>
                    <Button
                        onClick={() => setCurrentPage(pageEnum.preview)}
                        variant="outlined"
                    >
                        Preview
                    </Button>
                </>
            )}
        </header>
    )
})
