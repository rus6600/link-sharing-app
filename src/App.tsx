import { observer } from 'mobx-react-lite'

import '../styles/styles.scss'
import { Edit, Header } from './components'
import { LayoutPreview } from './components/LayoutPreview'
import { Container } from './components/ui'

export const App = observer(() => {
    return (
        <Container>
            <Header></Header>
            <LayoutPreview />
            <Edit />
        </Container>
    )
})
