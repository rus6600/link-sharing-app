import '@style/_phone.scss'
import { Avatar } from './Avatar'
import { Placeholder } from './Placeholder'
import { Link } from './Link'

export const Phone = () => {
    return (
        <div className="phone">
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
