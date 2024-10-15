import { ReactNode } from 'react'
import '@style/ui/_container.scss'

export const Container = ({ children }: { children?: ReactNode }) => {
    return <div className="container">{children}</div>
}
