import { ReactNode } from 'react'
import '@styles/components/ui/_container.scss'

export const Container = ({
    children,
    isPreview,
}: {
    children?: ReactNode
    isPreview?: boolean
}) => {
    return (
        <main className={`container ${isPreview ? 'container__preview' : ''}`}>
            {children}
        </main>
    )
}
