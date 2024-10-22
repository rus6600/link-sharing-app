import { Avatar } from './Avatar'
import { Placeholder } from './Placeholder'
import { Link } from './Link'

export const Phone: React.FC = () => {
    return (
        <div className="phone">
            <div className="phone_upper" />
            <div className="phone_lower" />
            <Avatar />
            <Placeholder />
            <Placeholder small />
            <Link></Link>
            <Link></Link>
            <Link></Link>
            <Link></Link>
            <Link></Link>
        </div>
    )
}
