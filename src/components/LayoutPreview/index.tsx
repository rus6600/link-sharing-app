import '@style/_phone.scss'

import { observer } from 'mobx-react-lite'
import { Phone } from './Phone'

export const LayoutPreview = observer(() => {
    return (
        <section className="layout-preview">
            <Phone></Phone>
        </section>
    )
})
