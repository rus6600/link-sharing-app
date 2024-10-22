import '../styles/styles.scss'
import { Header } from './components'
import { LayoutPreview } from './components/LayoutPreview'
import { counterStore, PostStoreContext } from './store'
import { CustomizeLinks } from './components/CustomizeLinks'
import { Container } from './components/ui'

function App() {
    return (
        <PostStoreContext.Provider value={counterStore}>
            <Container>
                <Header></Header>
                <LayoutPreview />
                <CustomizeLinks />
            </Container>
        </PostStoreContext.Provider>
    )
}

export default App
