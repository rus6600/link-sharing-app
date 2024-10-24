import { observer } from 'mobx-react-lite'

import '../styles/styles.scss'
import { Header } from './components'
import { LayoutPreview } from './components/LayoutPreview'
import { CustomizeLinks } from './components/CustomizeLinks'
import { Container } from './components/ui'

export const App = observer(() => {
    return (
        <Container>
            <Header></Header>
            <LayoutPreview />
            <CustomizeLinks />
        </Container>
    )
})
