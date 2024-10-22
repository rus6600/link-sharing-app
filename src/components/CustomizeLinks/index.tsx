import '@style/_customize-links.scss'
import { Button, Typography } from '../ui'
import { GetStarted } from '../Icons'

export const CustomizeLinks = () => {
    return (
        <section className={'customize-links'}>
            <Typography
                variant={'h1'}
                fontSize={'lg'}
                fontWeight={'700'}
                textAlign={'left'}
            >
                Customize your links
            </Typography>
            <Typography textAlign="left">
                Add/edit/remove links below and then share all your profiles
                with the world!
            </Typography>
            <Button variant={'outlined'}>+ Add new link</Button>
            <div className="customize-links__getstarted">
                <GetStarted />
                <Typography variant={'h2'} fontSize="lg">
                    Let’s get you started
                </Typography>
                <Typography textAlign="center" color={'grey-600'}>
                    Use the “Add new link” button to get started. Once you have
                    more than one link, you can reorder and edit them. We’re
                    here to help you share your profiles with everyone!
                </Typography>
            </div>
        </section>
    )
}
