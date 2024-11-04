import { makeAutoObservable } from 'mobx'
import { MobxMutation } from '../shared/lib/mobxMutation'
import { AxiosError, AxiosResponse } from 'axios'
import { addLinks, getUserLinks, queryClient } from '../shared/lib/api'
import { MobxQuery } from '../shared/lib/mobxQuery'
import {
    LinkType,
    PlatformEnum,
    PlatformUnionType,
    UserType,
} from '../shared/types/Entities'
import { DragEndEvent } from '@dnd-kit/core'
import { SingleValue } from 'react-select'
import { arrayMove } from '@dnd-kit/sortable'
import { getKeys } from '../shared/utils'
import { OptionType } from '../components/ui'

export class UserStore {
    rootStore
    constructor(rootStore: unknown) {
        this.rootStore = rootStore
        makeAutoObservable(this, {})
    }
    linksMutation = new MobxMutation<
        AxiosResponse,
        AxiosError<{ message: string }>,
        UserType['links'],
        Record<number, string>
    >(
        () => ({
            mutationFn: addLinks,
            mutationKey: ['mutateUserLinks'],
            onSuccess: async ({ data }) => {
                console.log(data)
                await queryClient.invalidateQueries({
                    queryKey: ['queryUserLinks'],
                })
            },
        }),
        queryClient
    )
    linksQuery = new MobxQuery<
        AxiosResponse<LinkType[] | null>,
        AxiosError<{ message: string }>,
        AxiosResponse<LinkType[] | null>,
        Record<number, string>
    >(
        () => ({
            queryKey: ['queryUserLinks'],
            queryFn: getUserLinks,
        }),
        queryClient
    )

    async getLinks() {
        return this.linksQuery.query()
    }

    setLinks = async (newLinks: UserType['links']) => {
        return this.linksMutation.mutate(newLinks)
    }

    updateLinks = async (data: LinkType[]) => {
        this.linksQuery
            .update()
            .setQueryData<
                AxiosResponse<LinkType[]>
            >(['queryUserLinks'], (prev) => {
                if (prev?.data) {
                    return { ...prev, data }
                }
            })
    }

    removeLink = async (id: string) => {
        const filteredLinks = this.linksQuery
            .query()
            .data?.data?.filter((link) => link.id !== id)
        if (filteredLinks) {
            await this.updateLinks(filteredLinks)
        }
    }

    saveLinks = async () => {
        const data = this.linksQuery.query().data?.data
        if (data) {
            return this.linksMutation.mutate(data)
        }
    }

    get userLinks() {
        return this.linksQuery.query()
    }

    addTemplateLink = () => {
        this.linksQuery
            .update()
            .setQueryData<
                AxiosResponse<LinkType[]>
            >(['queryUserLinks'], (prev) => {
                if (prev && prev.data.length < 5) {
                    return {
                        ...prev,
                        data: [
                            ...prev.data,
                            {
                                id: crypto.randomUUID(),
                                url: null,
                                platform: null,
                            },
                        ],
                    }
                }
            })
    }

    onSelectChange = (id: string, newValue: SingleValue<OptionType>) => {
        this.linksQuery
            .update()
            .setQueryData<
                AxiosResponse<LinkType[]>
            >(['queryUserLinks'], (prev) => {
                if (prev?.data && newValue) {
                    const data = prev.data.reduce((acc, cur) => {
                        if (cur.id === id) {
                            return [
                                ...acc,
                                { ...cur, platform: newValue.value },
                            ]
                        }
                        return [...acc, cur]
                    }, [] as LinkType[])
                    return { ...prev, data }
                }
            })
    }

    onInputChange = (id: string, url: string) => {
        this.linksQuery
            .update()
            .setQueryData<
                AxiosResponse<LinkType[]>
            >(['queryUserLinks'], (prev) => {
                if (prev?.data) {
                    const data = prev.data.reduce((acc, cur) => {
                        if (cur.id === id) {
                            return [...acc, { ...cur, url }]
                        }
                        return [...acc, cur]
                    }, [] as LinkType[])
                    return { ...prev, data }
                }
            })
    }

    get selectOptions() {
        const selectedValues = new Set(
            this.linksQuery.query().data?.data?.map(({ platform }) => platform)
        )

        return getKeys(PlatformEnum).reduce<PlatformUnionType[] | []>(
            (acc, cur) => {
                if (!selectedValues.has(cur)) {
                    return [...acc, cur]
                }
                return acc
            },
            []
        )
    }

    handleDragEnd = ({ active, over }: DragEndEvent) => {
        const data = this.linksQuery.query().data?.data
        if (data && over && active.id !== over.id) {
            const oldIndex = data.findIndex((item) => item.id === active.id)
            const newIndex = data.findIndex((item) => item.id === over.id)
            const newData = arrayMove(data, oldIndex, newIndex)
            console.log(newData)
            this.linksQuery
                .update()
                .setQueryData<
                    AxiosResponse<LinkType[]>
                >(['queryUserLinks'], (prev) => {
                    if (prev?.data) {
                        return { ...prev, data: newData }
                    }
                })
        }
    }
}
