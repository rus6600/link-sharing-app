import { useContext } from 'react'
import { observer } from 'mobx-react-lite'

import '../styles/styles.scss'
import { Header } from './components'
import { LayoutPreview } from './components/LayoutPreview'
import { CustomizeLinks } from './components/CustomizeLinks'
import { Container } from './components/ui'
import { Auth } from './components/Auth'
import { RootStoreContext } from './store'

export const App = observer(() => {
    const { authStore } = useContext(RootStoreContext)

    if (!authStore.isUserAuthenticated) {
        return <Auth />
    }

    return (
        <Container>
            <Header></Header>
            <LayoutPreview />
            <CustomizeLinks />
        </Container>
    )
})
