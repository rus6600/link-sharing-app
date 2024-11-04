import '@style/_layout-preview.scss'

import { Phone } from './Phone'
import { Content } from './Content'

export const LayoutPreview = () => {
    return (
        <section className="layout-preview">
            <Phone>
                <Content />
            </Phone>
        </section>
    )
}
