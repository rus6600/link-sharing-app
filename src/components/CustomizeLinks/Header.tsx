import { useContext } from 'react'
import { observer } from 'mobx-react-lite'

import { Button, Typography } from '../ui'
import { RootStoreContext } from '../../store'

export const Header = observer(() => {
    const { userStore } = useContext(RootStoreContext)
    return (
        <div className={'customize-links__header'}>
            <Typography
                variant={'h1'}
                fontSize={'lg'}
                fontWeight={'700'}
                textAlign={'left'}
            >
                Customize your links
            </Typography>
            <Typography textAlign="left" color={'grey-600'}>
                Add/edit/remove links below and then share all your profiles
                with the world!
            </Typography>
            <Button variant={'outlined'} onClick={userStore.addNewLink}>
                + Add new link
            </Button>
        </div>
    )
})
