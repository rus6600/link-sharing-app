import '../styles/styles.scss'
import { Header } from './components'
import { Phone } from './components/Phone'
import { counterStore, PostStoreContext } from './store'
import { CustomizeLinks } from './components/CustomizeLinks'
import { Container } from './components/ui'

function App() {
    return (
        <PostStoreContext.Provider value={counterStore}>
            <Container>
                <Header></Header>
                <Phone />
                <CustomizeLinks />
            </Container>
        </PostStoreContext.Provider>
    )
}

export default App
