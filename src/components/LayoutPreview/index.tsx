import '@style/_phone.scss'

import { observer } from 'mobx-react-lite'
import { PostStoreContext } from '../../store'
import { useContext } from 'react'
import { Phone } from './Phone'

export const LayoutPreview = observer(() => {
    const store = useContext(PostStoreContext)

    return (
        <section className="layout-preview">
            <Phone></Phone>
        </section>
    )
})