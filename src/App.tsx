import { useContext } from 'react'
import { observer } from 'mobx-react-lite'

import '../styles/styles.scss'
import { Header } from './components'
import { LayoutPreview } from './components/LayoutPreview'
import { Container } from './components/ui'
import { RootStoreContext } from './store'
import { pageEnum } from './shared/types/Entities'

export const App = observer(() => {
    const {
        uiStore: { page },
    } = useContext(RootStoreContext)
    const isPreview = page === pageEnum.preview
    return (
        <Container isPreview={isPreview}>
            <Header />
            <LayoutPreview isPreview={isPreview} />
        </Container>
    )
})
