import '../styles/styles.scss'
import { Header } from './components'
import { Phone } from './components/Phone'
import { counterStore, PostStoreContext } from './store'

function App() {
    return (
        <PostStoreContext.Provider value={counterStore}>
            <main className="container">
                <Header></Header>
                <Phone />
            </main>
        </PostStoreContext.Provider>
    )
}

export default App
