import { CustomizeLinks } from '../CustomizeLinks'
import { useContext } from 'react'
import { RootStoreContext } from '../../store'
import { ProfileDetails } from '../ProfileDetails'
import { observer } from 'mobx-react-lite'

export const Edit: React.FC = observer(() => {
    const {
        userStore: { profileDetails },
    } = useContext(RootStoreContext)

    return (
        <section className={'edit'}>
            {profileDetails ? (
                <ProfileDetails />
            ) : (
                <CustomizeLinks></CustomizeLinks>
            )}
        </section>
    )
})
