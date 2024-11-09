import { LinksIcon, UserIcon } from '../Icons'
import '../../../styles/components/_header.scss'
import { Logo } from './Logo'
import { Button } from '../ui'
import { useContext } from 'react'
import { RootStoreContext } from '../../store'
import { observer } from 'mobx-react-lite'

export const Header = observer(() => {
    const {
        userStore: { toggleShowEdit, profileDetails },
    } = useContext(RootStoreContext)
    return (
        <header className="header">
            <Logo />
            <div className="header__switch">
                <Button
                    onClick={toggleShowEdit}
                    variant={!profileDetails ? 'reverted' : 'transparent'}
                    icon={<LinksIcon fill={'#633cff'} />}
                >
                    Links
                </Button>
                <Button
                    onClick={toggleShowEdit}
                    variant={profileDetails ? 'reverted' : 'transparent'}
                    icon={<UserIcon fill="#737373" />}
                >
                    Profile Details
                </Button>
            </div>
            <Button variant="outlined">Preview</Button>
        </header>
    )
})
