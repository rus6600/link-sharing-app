import { ReactNode } from 'react'
import '../../../styles/components/ui/_container.scss'

export const Container = ({ children }: { children?: ReactNode }) => {
    return <main className="container">{children}</main>
}
