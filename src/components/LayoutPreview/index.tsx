import { observer } from 'mobx-react-lite'

import { Phone } from './Phone'
import { Content } from './Content'
import { Edit } from '../Edit'
import '@styles/components/_layout-preview.scss'

export const LayoutPreview = observer(
    ({ isPreview }: { isPreview?: boolean }) => {
        return (
            <>
                {isPreview ? (
                    <section
                        className={`layout-preview ${isPreview ? 'layout-preview__show' : ''}`}
                    >
                        <Content />
                    </section>
                ) : (
                    <>
                        <section className="layout-preview">
                            <Phone>
                                <Content />
                            </Phone>
                        </section>
                        <Edit />
                    </>
                )}
            </>
        )
    }
)
