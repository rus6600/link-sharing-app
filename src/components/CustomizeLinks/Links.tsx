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
import { PlatformUnionType } from '../../shared/types/Entities'

export const Links = observer(() => {
    const {
        userStore: { handleDragEnd, userQuery, submitData, userDataMutation },
    } = useContext(RootStoreContext)
    if (userQuery?.isLoading) return <div>burr</div>
    if (!userQuery?.data?.data?.links?.length) {
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
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formProps = Object.fromEntries(new FormData(e.currentTarget))
        const links = userQuery.data?.data?.links?.map(({ id }) => {
            return {
                id,
                url: formProps[`${id}__input`] as string,
                platform: formProps[`${id}__select`] as PlatformUnionType,
            }
        })
        submitData({ links })
    }
    return (
        <>
            <form
                id={'linksform'}
                onSubmit={handleSubmit}
                className={'customize-links__list'}
            >
                <DndContext
                    modifiers={[
                        restrictToParentElement,
                        restrictToVerticalAxis,
                    ]}
                    onDragEnd={handleDragEnd}
                >
                    <SortableContext items={userQuery.data.data.links}>
                        {userQuery.data.data.links.map((item, id) => (
                            <Link
                                key={item.id}
                                orderId={id}
                                isLoading={userDataMutation.status().isLoading}
                                {...item}
                            />
                        ))}
                    </SortableContext>
                </DndContext>
            </form>
            <div className={'customize-links__btn_container'}>
                <Button
                    disabled={userDataMutation.status().isLoading}
                    form={'linksform'}
                    type={'submit'}
                    variant={'primary'}
                >
                    Save
                </Button>
            </div>
        </>
    )
})
