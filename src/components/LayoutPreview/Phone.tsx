import { PhoneInner } from './PhoneInner'
import { PhoneOuter } from './PhoneOuter'

export const Phone: React.FC<{ children?: React.ReactNode }> = ({
    children,
}) => {
    return (
        <div className="layout-preview__phone">
            <PhoneInner></PhoneInner>
            <PhoneOuter></PhoneOuter>
            {children}
        </div>
    )
}
