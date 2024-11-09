import { observer } from 'mobx-react-lite'

import '../../../styles/components/_customize-links.scss'
import { Links } from './Links'
import { Header } from './Header'

export const CustomizeLinks = observer(() => {
    return (
        <div className={'customize-links'}>
            <Header />
            <Links />
        </div>
    )
})
