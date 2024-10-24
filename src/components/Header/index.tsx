import { LinksIcon, UserIcon } from '../Icons'
import '@style/_header.scss'
import { Logo } from './Logo'
import { Button } from '../ui'

export const Header = () => {
    return (
        <header className="header">
            <Logo />
            <div className="header__switch">
                <Button
                    variant="reverted"
                    icon={<LinksIcon fill={'#633cff'} />}
                >
                    Links
                </Button>
                <Button
                    variant="transparent"
                    icon={<UserIcon fill="#737373" />}
                >
                    Profile Details
                </Button>
            </div>
            <Button variant="outlined">Preview</Button>
        </header>
    )
}
