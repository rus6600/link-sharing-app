import React, { useContext } from 'react'
import { Link } from './Link'
import { DndContext } from '@dnd-kit/core'
import { SortableContext } from '@dnd-kit/sortable'
import {
    restrictToParentElement,
    restrictToVerticalAxis,
} from '@dnd-kit/modifiers'
import { observer } from 'mobx-react-lite'
import { RootStoreContext } from '../../store'
import { GetStarted } from '../Icons'
import { Button, Typography } from '../ui'

export const Links = observer(() => {
    const {
        userStore: {
            handleDragEnd,
            saveLinks,
            userLinks: { data, isLoading },
        },
    } = useContext(RootStoreContext)

    if (isLoading) return <div>burr</div>
    if (!data?.data?.length) {
        return (
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
        )
    }
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        saveLinks()
    }

    return (
        <form onSubmit={handleSubmit} className={'customize-links__list'}>
            <DndContext
                modifiers={[restrictToParentElement, restrictToVerticalAxis]}
                onDragEnd={handleDragEnd}
            >
                <SortableContext items={data.data}>
                    {data.data.map((item, id) => (
                        <Link key={item.id} orderId={id} {...item} />
                    ))}
                </SortableContext>
            </DndContext>
            <Button type={'submit'} variant={'primary'}>
                Save
            </Button>
        </form>
    )
})
