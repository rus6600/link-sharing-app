import '../styles/styles.scss'
import { Header } from './components'
import { LayoutPreview } from './components/LayoutPreview'
import { CustomizeLinks } from './components/CustomizeLinks'
import { Container } from './components/ui'
import { Auth } from './components/Auth'

function App() {
    return (
        <>
            <Auth />
        </>
        // <Container>
        //     <Header></Header>
        //     <LayoutPreview />
        //     <CustomizeLinks />
        // </Container>
    )
}

export default App
