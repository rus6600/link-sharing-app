import '@style/_phone.scss'
import { Avatar } from './Avatar'
import { Placeholder } from './Placeholder'
import { Link } from './Link'
import { observer } from 'mobx-react-lite'
import { counterStore, PostStoreContext } from '../../store'
import { useContext, useEffect } from 'react'

export const Phone = observer(() => {
    const store = useContext(PostStoreContext)

    return (
        <>
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
        </>
    )
})
