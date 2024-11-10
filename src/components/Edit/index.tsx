import { useContext } from 'react'
import { observer } from 'mobx-react-lite'

import { CustomizeLinks } from '../CustomizeLinks'
import { RootStoreContext } from '../../store'
import { ProfileDetails } from '../ProfileDetails'
import { pageEnum } from '../../shared/types/Entities'

export const Edit = observer(() => {
    const {
        uiStore: { currentPage },
    } = useContext(RootStoreContext)

    return (
        <section className={'edit'}>
            {currentPage === pageEnum.profileDetails ? (
                <ProfileDetails />
            ) : (
                <CustomizeLinks />
            )}
        </section>
    )
})
