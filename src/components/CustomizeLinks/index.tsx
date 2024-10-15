import '@style/_customize-links.scss'
import { Button, Typography } from '../ui'
import { GetStarted } from '../Icons'

export const CustomizeLinks = () => {
    return (
        <section className={'customize-links'}>
            <h1>Customize your links</h1>
            <p>
                Add/edit/remove links below and then share all your profiles
                with the world!
            </p>
            <Button variant={'outlined'}>+ Add new link</Button>
            <GetStarted />
            <Typography variant={'h1'} color={'grey-600'} fontSize="lg">
                asd
            </Typography>
        </section>
    )
}
